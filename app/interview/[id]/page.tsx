"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { insforge } from "@/lib/insforge";
import InterviewQuestionCard from "@/components/evaluation/InterviewQuestionCard";
import VideoRecorder from "@/components/evaluation/VideoRecorder";
import RedFlagAlert from "@/components/evaluation/RedFlagAlert";
import { SkillBar } from "@/components/UI";
import RoleGuard from "@/components/evaluation/RoleGuard";
import type { InterviewSession, InterviewAnswer, AnswerEvaluation } from "@/lib/types";

export default function InterviewRecordingPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;

  const [session, setSession] = useState<InterviewSession | null>(null);
  const [answers, setAnswers] = useState<InterviewAnswer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [completing, setCompleting] = useState(false);

  // Load session + existing answers
  useEffect(() => {
    async function load() {
      try {
        const [sessRes, ansRes] = await Promise.all([
          insforge.database
            .from("adt_interview_sessions")
            .select("*")
            .eq("id", sessionId)
            .single(),
          insforge.database
            .from("adt_interview_answers")
            .select("*")
            .eq("session_id", sessionId)
            .order("created_at", { ascending: true }),
        ]);

        if (sessRes.error) throw sessRes.error;

        const sess = sessRes.data as InterviewSession;
        const existingAnswers = (ansRes.data ?? []) as InterviewAnswer[];

        // Redirect if already completed
        if (sess.status === "completed" || sess.status === "reviewed") {
          router.replace(`/interview/${sessionId}/report`);
          return;
        }

        // Update to in_progress if pending
        if (sess.status === "pending") {
          await insforge.database
            .from("adt_interview_sessions")
            .update({ status: "in_progress" })
            .eq("id", sessionId);
          sess.status = "in_progress";
        }

        setSession(sess);
        setAnswers(existingAnswers);

        // Resume from next unanswered question
        const answeredQuestionIds = new Set(existingAnswers.map((a) => a.question_id));
        const nextIndex = sess.questions.findIndex((q) => !answeredQuestionIds.has(q.id));
        setCurrentIndex(nextIndex >= 0 ? nextIndex : existingAnswers.length);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load session");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [sessionId, router]);

  // Handle recording completion
  const handleRecordingComplete = useCallback(
    async (blob: Blob) => {
      if (!session) return;

      const question = session.questions[currentIndex];
      if (!question) return;

      setProcessing(true);

      try {
        // Step 1: Upload video
        setProcessingStep("Uploading video...");
        const fileName = `${sessionId}/${question.id}-${Date.now()}.webm`;
        const { data: uploadData, error: uploadError } = await insforge.storage
          .from("interview-videos")
          .upload(fileName, blob);

        if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

        const videoKey = uploadData?.key ?? fileName;
        const videoUrl = insforge.storage
          .from("interview-videos")
          .getPublicUrl(videoKey);

        // Step 2: Transcribe
        setProcessingStep("Transcribing audio...");
        const formData = new FormData();
        formData.append("audio", blob, "recording.webm");
        const transcribeRes = await fetch("/api/transcribe", {
          method: "POST",
          body: formData,
        });

        let transcript = "";
        if (transcribeRes.ok) {
          const transcribeData = await transcribeRes.json();
          transcript = transcribeData.transcript ?? "";
        }

        // Step 3: Save answer
        setProcessingStep("Saving answer...");
        const { data: answerData, error: answerError } = await insforge.database
          .from("adt_interview_answers")
          .insert({
            session_id: sessionId,
            question_id: question.id,
            video_url: videoUrl,
            video_key: videoKey,
            transcript,
          })
          .select()
          .single();

        if (answerError) throw new Error(`Save failed: ${answerError.message}`);

        // Step 4: Evaluate answer
        setProcessingStep("Evaluating response...");
        const evalRes = await fetch("/api/interview/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            questionId: question.id,
            transcript,
          }),
        });

        let evaluation: AnswerEvaluation | undefined;
        if (evalRes.ok) {
          const evalData = await evalRes.json();
          evaluation = evalData.evaluation;

          // Update the answer with evaluation
          await insforge.database
            .from("adt_interview_answers")
            .update({ evaluation })
            .eq("id", answerData.id);
        }

        const newAnswer: InterviewAnswer = {
          ...(answerData as InterviewAnswer),
          transcript,
          evaluation,
        };

        setAnswers((prev) => [...prev, newAnswer]);

        // Advance to next question
        if (currentIndex < session.questions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Processing failed");
      } finally {
        setProcessing(false);
        setProcessingStep("");
      }
    },
    [session, currentIndex, sessionId]
  );

  // Complete the interview
  const handleComplete = useCallback(async () => {
    if (!session) return;

    setCompleting(true);
    try {
      const res = await fetch("/api/interview/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      });

      if (!res.ok) throw new Error("Failed to generate report");

      router.push(`/interview/${sessionId}/report`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to complete interview");
      setCompleting(false);
    }
  }, [session, sessionId, router]);

  if (loading) {
    return (
      <div className="px-8 py-10 max-w-[1400px] mx-auto">
        <div className="border border-rule p-16 text-center">
          <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted pulse-dot">
            Loading interview session...
          </div>
        </div>
      </div>
    );
  }

  if (error && !session) {
    return (
      <div className="px-8 py-10 max-w-[1400px] mx-auto">
        <div className="border border-rust/30 bg-rustSoft p-6 text-center">
          <p className="text-[13px] text-rustDeep">{error}</p>
        </div>
        <Link
          href="/interview"
          className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-inkMuted hover:text-ink transition-colors mt-6"
        >
          &larr; Back to interviews
        </Link>
      </div>
    );
  }

  if (!session) return null;

  const questions = session.questions ?? [];
  const allAnswered = answers.length >= questions.length;
  const currentQuestion = questions[currentIndex];

  // Build a map of answers by question_id for display
  const answerMap = new Map(answers.map((a) => [a.question_id, a]));

  return (
    <RoleGuard allowedRoles={["participant", "admin"]}>
    <div className="px-8 py-10 max-w-[1400px] mx-auto">
      {/* Back link */}
      <Link
        href="/interview"
        className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-inkMuted hover:text-ink transition-colors mb-8"
      >
        &larr; Back to interviews
      </Link>

      {/* Header */}
      <div className="slide-in flex items-start justify-between mb-8">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-rust mb-3">
            Interview Session
          </div>
          <h2 className="font-display text-[38px] leading-[1.05] tracking-tightest text-ink">
            {session.participant_name || "Interview"}
          </h2>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-1">
            Progress
          </div>
          <div className="font-display text-[28px] leading-none tracking-tightest text-ink num">
            {Math.min(answers.length + 1, questions.length)}{" "}
            <span className="text-inkMuted text-[18px]">of</span> {questions.length}
          </div>
          {/* Progress bar */}
          <div className="mt-2 w-40 h-1.5 bg-ruleSoft rounded-full overflow-hidden">
            <div
              className="h-full bg-rust rounded-full transition-all duration-500"
              style={{
                width: `${questions.length > 0 ? (answers.length / questions.length) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 border border-rust/30 bg-rustSoft p-4">
          <p className="text-[13px] text-rustDeep">{error}</p>
        </div>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left panel: question list */}
        <div className="col-span-4 space-y-3 slide-in">
          {questions.map((q, i) => (
            <div
              key={q.id}
              onClick={() => {
                // Only allow clicking to answered questions or the current one
                if (i <= answers.length) setCurrentIndex(i);
              }}
              className={i <= answers.length ? "cursor-pointer" : "cursor-default"}
            >
              <InterviewQuestionCard
                question={q}
                index={i}
                total={questions.length}
                isActive={i === currentIndex}
              />
              {/* Answered indicator */}
              {answerMap.has(q.id) && (
                <div className="flex items-center gap-1.5 mt-1 ml-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                  <span className="text-[10px] font-mono text-leaf uppercase tracking-widest">
                    Answered
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right panel: recorder + results */}
        <div className="col-span-8 space-y-6 slide-in">
          {/* Video recorder for current question */}
          {!allAnswered && currentQuestion && !answerMap.has(currentQuestion.id) && (
            <>
              <div className="mb-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-1">
                  Now Recording
                </div>
                <p className="font-display italic text-[20px] leading-snug tracking-tightest text-ink">
                  {currentQuestion.question}
                </p>
              </div>

              {processing ? (
                <div className="border border-rule bg-paper p-16 text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold">
                      Processing
                    </span>
                  </div>
                  <p className="text-[13px] text-inkSoft">{processingStep}</p>
                </div>
              ) : (
                <VideoRecorder
                  key={currentQuestion.id}
                  onRecordingComplete={handleRecordingComplete}
                  maxDuration={currentQuestion.max_duration_seconds}
                />
              )}
            </>
          )}

          {/* Show answer for current question if it exists */}
          {currentQuestion && answerMap.has(currentQuestion.id) && (
            <AnswerDisplay answer={answerMap.get(currentQuestion.id)!} />
          )}

          {/* All answered — complete button */}
          {allAnswered && (
            <div className="border border-dashed border-rule p-12 text-center slide-in">
              <div className="font-display text-[28px] text-ink tracking-tightest">
                All questions answered.
              </div>
              <p className="text-[13px] text-inkMuted mt-2 max-w-md mx-auto">
                Generate the interview report to complete the due diligence session.
              </p>
              <button
                onClick={handleComplete}
                disabled={completing}
                className="mt-6 px-8 py-3 bg-rust text-white text-[12px] font-mono uppercase tracking-widest hover:bg-rustDeep transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
              >
                {completing ? "Generating Report..." : "Complete Interview"}
              </button>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-20 pt-6 border-t border-rule flex justify-between text-[11px] font-mono text-inkMuted uppercase tracking-widest">
        <span>Africa DeepTech Challenge</span>
        <span>Interview Recording</span>
      </footer>
    </div>
    </RoleGuard>
  );
}

/** Displays a single answer with transcript and evaluation scores */
function AnswerDisplay({ answer }: { answer: InterviewAnswer }) {
  return (
    <div className="space-y-4">
      {/* Transcript */}
      {answer.transcript && (
        <div className="border border-rule bg-paper p-5">
          <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-3">
            Transcript
          </div>
          <p className="text-[13px] text-inkSoft leading-relaxed whitespace-pre-wrap">
            {answer.transcript}
          </p>
        </div>
      )}

      {/* Evaluation scores */}
      {answer.evaluation && (
        <div className="border border-rule bg-paper p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted">
              Answer Evaluation
            </div>
            <span className="font-display text-[24px] leading-none tracking-tightest text-ink num">
              {answer.evaluation.overall_score}
              <span className="text-[14px] text-inkMuted">/100</span>
            </span>
          </div>

          <div className="space-y-3">
            <SkillBar skill="Technical Accuracy" score={answer.evaluation.technical_accuracy} />
            <SkillBar
              skill="Depth of Understanding"
              score={answer.evaluation.depth_of_understanding}
            />
            <SkillBar skill="Authenticity" score={answer.evaluation.authenticity} />
            <SkillBar
              skill="Communication Quality"
              score={answer.evaluation.communication_quality}
            />
          </div>

          {answer.evaluation.reasoning && (
            <p className="text-[13px] text-inkSoft leading-relaxed pt-3 border-t border-ruleSoft">
              {answer.evaluation.reasoning}
            </p>
          )}

          {answer.evaluation.red_flags.length > 0 && (
            <RedFlagAlert flags={answer.evaluation.red_flags} />
          )}
        </div>
      )}

      {/* Video playback */}
      {answer.video_url && (
        <div className="border border-rule bg-paper overflow-hidden">
          <video
            src={answer.video_url}
            controls
            playsInline
            className="w-full aspect-video object-cover"
          />
        </div>
      )}
    </div>
  );
}
