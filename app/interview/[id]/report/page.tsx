"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { insforge } from "@/lib/insforge";
import { SectionHeader, SkillBar } from "@/components/UI";
import RecommendationBadge from "@/components/evaluation/RecommendationBadge";
import RedFlagAlert from "@/components/evaluation/RedFlagAlert";
import RoleGuard from "@/components/evaluation/RoleGuard";
import type {
  InterviewSession,
  InterviewAnswer,
  InterviewRecommendation,
} from "@/lib/types";

const categoryStyles: Record<string, { bg: string; text: string; border: string }> = {
  technical: { bg: "bg-tealSoft", text: "text-teal", border: "border-teal/20" },
  process: { bg: "bg-goldSoft", text: "text-gold", border: "border-gold/20" },
  authenticity: { bg: "bg-rustSoft", text: "text-rustDeep", border: "border-rust/20" },
  behavioral: { bg: "bg-paperDark", text: "text-ink", border: "border-rule" },
};

const recMap: Record<InterviewRecommendation, "Advance" | "Review" | "Reject"> = {
  "Advance to Panel": "Advance",
  "Needs Follow-up": "Review",
  Reject: "Reject",
};

export default function InterviewReportPage() {
  const params = useParams();
  const sessionId = params.id as string;

  const [session, setSession] = useState<InterviewSession | null>(null);
  const [answers, setAnswers] = useState<InterviewAnswer[]>([]);
  const [grant, setGrant] = useState<{ id: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

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
        setSession(sess);
        setAnswers((ansRes.data ?? []) as InterviewAnswer[]);

        // Check if a grant exists for this submission
        if (sess.submission_id) {
          const grantRes = await insforge.database
            .from("adt_grants")
            .select("id")
            .eq("submission_id", sess.submission_id)
            .limit(1)
            .single();
          if (!grantRes.error && grantRes.data) {
            setGrant(grantRes.data as { id: string });
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load report");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [sessionId]);

  const handleGenerateReport = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/interview/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      });

      if (!res.ok) throw new Error("Failed to generate report");

      const data = await res.json();
      setSession((prev) =>
        prev ? { ...prev, overall_report: data.report, status: "completed" } : prev
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Report generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const toggleQuestion = (qId: string) => {
    setExpandedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="px-8 py-10 max-w-[1400px] mx-auto">
        <div className="border border-rule p-16 text-center">
          <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted pulse-dot">
            Loading report...
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

  const report = session.overall_report;
  const questions = session.questions ?? [];
  const answerMap = new Map(answers.map((a) => [a.question_id, a]));

  return (
    <RoleGuard allowedRoles={["admin", "reviewer"]}>
    <div className="px-8 py-10 max-w-[1400px] mx-auto">
      {/* Back link */}
      <Link
        href="/interview"
        className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-inkMuted hover:text-ink transition-colors mb-8"
      >
        &larr; Back to interviews
      </Link>

      {/* Page header */}
      <div className="slide-in">
        <SectionHeader
          eyebrow="Interview Report"
          title={session.participant_name || "Interview Report"}
          description="Comprehensive AI-generated due diligence interview report with per-question analysis and overall assessment."
        />
      </div>

      {/* No report yet — generate button */}
      {!report && (
        <section className="mt-14 pt-10 border-t border-rule">
          <div className="border border-dashed border-rule p-16 text-center">
            <div className="font-display text-[28px] text-ink tracking-tightest">
              No report generated yet.
            </div>
            <p className="text-[13px] text-inkMuted mt-2 max-w-md mx-auto">
              Generate the interview report to analyze all responses and produce an overall assessment.
            </p>
            {error && (
              <div className="mt-4 py-2 px-4 border border-rust/30 bg-rustSoft text-[13px] text-rustDeep inline-block">
                {error}
              </div>
            )}
            <button
              onClick={handleGenerateReport}
              disabled={generating}
              className="mt-6 px-8 py-3 bg-rust text-white text-[12px] font-mono uppercase tracking-widest hover:bg-rustDeep transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
            >
              {generating ? "Generating..." : "Generate Report"}
            </button>
          </div>
        </section>
      )}

      {/* Full report */}
      {report && (
        <>
          {/* 01 - Interview Overview */}
          <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10 slide-in">
            <div className="col-span-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
                01 &middot; Interview Overview
              </div>
            </div>
            <div className="col-span-9">
              <div className="grid grid-cols-3 gap-6">
                <InfoField label="Participant" value={session.participant_name || "\u2014"} />
                <InfoField
                  label="Date"
                  value={new Date(session.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                />
                <InfoField
                  label="Questions"
                  value={`${answers.length} of ${questions.length} answered`}
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-6">
                <InfoField label="Status" value={session.status.replace("_", " ")} />
                {session.submission_id && (
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-1">
                      Submission
                    </div>
                    <Link
                      href={`/evaluate/${session.submission_id}`}
                      className="text-[12px] font-mono text-rust hover:text-rustDeep transition-colors"
                    >
                      View evaluation &nearr;
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 02 - Per-Question Analysis */}
          <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10 slide-in">
            <div className="col-span-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
                02 &middot; Per-Question Analysis
              </div>
              <p className="mt-3 text-[12px] text-inkMuted leading-relaxed">
                Each question is scored across four dimensions: technical accuracy, depth of
                understanding, authenticity, and communication quality.
              </p>
            </div>
            <div className="col-span-9 space-y-4">
              {questions.map((q, i) => {
                const answer = answerMap.get(q.id);
                const isExpanded = expandedQuestions.has(q.id);
                const cat = categoryStyles[q.category] ?? categoryStyles.behavioral;

                return (
                  <div key={q.id} className="border border-rule bg-paper">
                    {/* Expandable header */}
                    <button
                      onClick={() => toggleQuestion(q.id)}
                      className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 hover:bg-paperDark/30 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[10px] font-mono text-inkMuted uppercase tracking-widest">
                            Q{i + 1}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest border rounded-sm ${cat.bg} ${cat.text} ${cat.border}`}
                          >
                            {q.category}
                          </span>
                        </div>
                        <p className="font-display italic text-[15px] leading-snug tracking-tightest text-ink">
                          {q.question}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {answer?.evaluation && (
                          <span className="font-mono text-[16px] num text-ink">
                            {answer.evaluation.overall_score}
                          </span>
                        )}
                        {!answer && (
                          <span className="text-[10px] font-mono text-inkMuted">Unanswered</span>
                        )}
                        <svg
                          className={`w-4 h-4 text-inkMuted transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path d="m19 9-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {/* Expanded content */}
                    {isExpanded && answer && (
                      <div className="px-5 pb-5 border-t border-ruleSoft space-y-4 pt-4">
                        {/* Transcript excerpt */}
                        {answer.transcript && (
                          <div>
                            <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-2">
                              Transcript
                            </div>
                            <p className="text-[13px] text-inkSoft leading-relaxed line-clamp-6">
                              {answer.transcript}
                            </p>
                          </div>
                        )}

                        {/* Score bars */}
                        {answer.evaluation && (
                          <div className="space-y-3">
                            <SkillBar
                              skill="Technical Accuracy"
                              score={answer.evaluation.technical_accuracy}
                            />
                            <SkillBar
                              skill="Depth of Understanding"
                              score={answer.evaluation.depth_of_understanding}
                            />
                            <SkillBar
                              skill="Authenticity"
                              score={answer.evaluation.authenticity}
                            />
                            <SkillBar
                              skill="Communication Quality"
                              score={answer.evaluation.communication_quality}
                            />
                          </div>
                        )}

                        {/* Reasoning */}
                        {answer.evaluation?.reasoning && (
                          <p className="text-[13px] text-inkSoft leading-relaxed pt-3 border-t border-ruleSoft">
                            {answer.evaluation.reasoning}
                          </p>
                        )}

                        {/* Red flags */}
                        {answer.evaluation?.red_flags &&
                          answer.evaluation.red_flags.length > 0 && (
                            <RedFlagAlert flags={answer.evaluation.red_flags} />
                          )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* 03 - Overall Assessment */}
          <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10 slide-in">
            <div className="col-span-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
                03 &middot; Overall Assessment
              </div>
            </div>
            <div className="col-span-9">
              {/* Recommendation + score */}
              <div className="flex items-center gap-4 mb-6">
                <RecommendationBadge recommendation={recMap[report.recommendation]} />
                <span className="font-display text-[48px] leading-none tracking-tightest text-ink num">
                  {report.overall_score}
                  <span className="text-[24px] text-inkMuted">/100</span>
                </span>
              </div>

              {/* Summary */}
              <p className="text-[15px] text-inkSoft leading-relaxed max-w-2xl mb-8">
                {report.summary}
              </p>

              {/* Strengths */}
              {report.strength_areas.length > 0 && (
                <div className="mb-6">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-leaf mb-3">
                    Strength Areas
                  </div>
                  <ul className="space-y-2">
                    {report.strength_areas.map((s, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-[13px] text-inkSoft leading-relaxed"
                      >
                        <span className="text-leaf shrink-0">+</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Concerns */}
              {report.concern_areas.length > 0 && (
                <div className="mb-6">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-gold mb-3">
                    Concern Areas
                  </div>
                  <ul className="space-y-2">
                    {report.concern_areas.map((c, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-[13px] text-inkSoft leading-relaxed"
                      >
                        <span className="text-gold shrink-0">&bull;</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Red flags at report level */}
              {report.red_flags.length > 0 && <RedFlagAlert flags={report.red_flags} />}
            </div>
          </section>

          {/* 04 - Follow-up Recommendations */}
          {report.follow_up_questions.length > 0 && (
            <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10 slide-in">
              <div className="col-span-3">
                <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
                  04 &middot; Follow-up Recommendations
                </div>
                <p className="mt-3 text-[12px] text-inkMuted leading-relaxed">
                  Suggested questions for the human panel to explore areas that need deeper
                  investigation.
                </p>
              </div>
              <div className="col-span-9">
                <div className="border border-rule bg-paper p-5">
                  <ol className="space-y-3">
                    {report.follow_up_questions.map((q, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-[11px] font-mono text-rust shrink-0 pt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-[13px] text-inkSoft leading-relaxed">{q}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>
          )}

          {/* Actions */}
          <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10 slide-in">
            <div className="col-span-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
                {report.follow_up_questions.length > 0 ? "05" : "04"} &middot; Actions
              </div>
            </div>
            <div className="col-span-9 flex flex-wrap gap-4">
              {session.submission_id && (
                <Link
                  href={`/evaluate/${session.submission_id}`}
                  className="px-6 py-2.5 bg-ink text-paper text-[12px] font-mono uppercase tracking-widest hover:bg-rust transition-colors rounded-sm"
                >
                  View Evaluation &rarr;
                </Link>
              )}
              {grant && (
                <Link
                  href={`/grants/${grant.id}`}
                  className="px-6 py-2.5 bg-leaf text-white text-[12px] font-mono uppercase tracking-widest hover:bg-leaf/80 transition-colors rounded-sm"
                >
                  View Grant &rarr;
                </Link>
              )}
              <Link
                href={`/interview/${sessionId}`}
                className="px-6 py-2.5 border border-ink text-ink text-[12px] font-mono uppercase tracking-widest hover:bg-paperDark transition-colors rounded-sm"
              >
                View Recording Session
              </Link>
              <Link
                href="/interview"
                className="px-6 py-2.5 border border-ink text-ink text-[12px] font-mono uppercase tracking-widest hover:bg-paperDark transition-colors rounded-sm"
              >
                Back to Dashboard
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-20 pt-6 border-t border-rule flex justify-between text-[11px] font-mono text-inkMuted uppercase tracking-widest">
            <span>
              Interview Report &middot;{" "}
              {new Date(session.completed_at ?? session.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>Africa DeepTech Challenge</span>
          </footer>
        </>
      )}

      {/* Footer for no-report state */}
      {!report && (
        <footer className="mt-20 pt-6 border-t border-rule flex justify-between text-[11px] font-mono text-inkMuted uppercase tracking-widest">
          <span>Africa DeepTech Challenge</span>
          <span>Awaiting Report</span>
        </footer>
      )}
    </div>
    </RoleGuard>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-1">
        {label}
      </div>
      <div className="text-[14px] text-ink capitalize">{value}</div>
    </div>
  );
}
