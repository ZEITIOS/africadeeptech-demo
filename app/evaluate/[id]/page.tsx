"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { insforge } from "@/lib/insforge";
import { useStreamingEvaluation } from "@/lib/hooks/useStreaming";
import { SectionHeader } from "@/components/UI";
import ScoreCard from "@/components/evaluation/ScoreCard";
import RecommendationBadge from "@/components/evaluation/RecommendationBadge";
import RoleGuard from "@/components/evaluation/RoleGuard";
import type { Submission, Evaluation, InterviewSession, Grant } from "@/lib/types";

export default function EvaluationReportPage() {
  const params = useParams();
  const router = useRouter();
  const submissionId = params.id as string;

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [interview, setInterview] = useState<InterviewSession | null>(null);
  const [grant, setGrant] = useState<Grant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatingInterview, setGeneratingInterview] = useState(false);

  const streaming = useStreamingEvaluation();

  // Use streaming result if available
  const activeEvaluation = streaming.evaluation ?? evaluation;

  useEffect(() => {
    async function load() {
      try {
        const [subRes, evalRes, intRes, grantRes] = await Promise.all([
          insforge.database.from("adt_submissions").select("*").eq("id", submissionId).single(),
          insforge.database
            .from("adt_evaluations")
            .select("*")
            .eq("submission_id", submissionId)
            .single(),
          insforge.database
            .from("adt_interview_sessions")
            .select("*")
            .eq("submission_id", submissionId)
            .limit(1)
            .single(),
          insforge.database
            .from("adt_grants")
            .select("*")
            .eq("submission_id", submissionId)
            .limit(1)
            .single(),
        ]);

        if (subRes.error) throw subRes.error;
        setSubmission(subRes.data as Submission);

        if (!evalRes.error && evalRes.data) {
          setEvaluation(evalRes.data as Evaluation);
        }
        if (!intRes.error && intRes.data) {
          setInterview(intRes.data as InterviewSession);
        }
        if (!grantRes.error && grantRes.data) {
          setGrant(grantRes.data as Grant);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to load submission";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [submissionId]);

  const handleGenerateInterview = async () => {
    setGeneratingInterview(true);
    try {
      const res = await fetch("/api/interview/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId }),
      });
      if (!res.ok) throw new Error("Failed to generate interview");
      const data = await res.json();
      router.push(`/interview/${data.session_id || data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Interview generation failed");
      setGeneratingInterview(false);
    }
  };

  if (loading) {
    return (
      <div className="px-8 py-10 max-w-[1400px] mx-auto">
        <div className="border border-rule p-16 text-center">
          <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted pulse-dot">
            Loading submission...
          </div>
        </div>
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="px-8 py-10 max-w-[1400px] mx-auto">
        <div className="border border-rust/30 bg-rustSoft p-6 text-center">
          <p className="text-[13px] text-rustDeep">{error || "Submission not found."}</p>
        </div>
        <Link
          href="/evaluate"
          className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-inkMuted hover:text-ink transition-colors mt-6"
        >
          &larr; Back to submissions
        </Link>
      </div>
    );
  }

  return (
    <RoleGuard allowedRoles={["admin", "reviewer", "participant"]}>
    <div className="px-8 py-10 max-w-[1400px] mx-auto">
      {/* Back link */}
      <Link
        href="/evaluate"
        className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-inkMuted hover:text-ink transition-colors mb-8"
      >
        &larr; Back to submissions
      </Link>

      {/* Page header */}
      <div className="slide-in">
        <SectionHeader
          eyebrow="Evaluation Report"
          title={submission.team_name || submission.participant_name}
          description={submission.description}
        />
      </div>

      {/* No evaluation yet - show submission details + trigger button */}
      {!activeEvaluation && !streaming.isStreaming && (
        <>
          {/* 01 - Submission Overview */}
          <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10 slide-in">
            <div className="col-span-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
                01 &middot; Submission Overview
              </div>
            </div>
            <div className="col-span-9">
              <div className="grid grid-cols-3 gap-6">
                <InfoField label="Participant" value={submission.participant_name} />
                <InfoField label="Team" value={submission.team_name || "\u2014"} />
                <InfoField label="Country" value={submission.country || "\u2014"} />
              </div>

              {submission.claimed_technologies?.length > 0 && (
                <div className="mt-6">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-2">
                    Technologies
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {submission.claimed_technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="inline-block px-2 py-0.5 text-[11px] bg-paperDark text-inkSoft border border-rule rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-4">
                {submission.repo_url && (
                  <ExternalLink href={submission.repo_url} label="Repository" />
                )}
                {submission.documentation_url && (
                  <ExternalLink href={submission.documentation_url} label="Documentation" />
                )}
                {submission.video_pitch_url && (
                  <ExternalLink href={submission.video_pitch_url} label="Video Pitch" />
                )}
              </div>
            </div>
          </section>

          {/* Run evaluation CTA */}
          <section className="mt-14 pt-10 border-t border-rule">
            <div className="border border-dashed border-rule p-16 text-center">
              <div className="font-display text-[28px] text-ink tracking-tightest">
                No evaluation yet.
              </div>
              <p className="text-[13px] text-inkMuted mt-2 max-w-md mx-auto">
                Run the AI evaluation agent to analyze this submission across all criteria.
              </p>
              {streaming.error && (
                <div className="mt-4 py-2 px-4 border border-rust/30 bg-rustSoft text-[13px] text-rustDeep inline-block">
                  {streaming.error}
                </div>
              )}
              <button
                onClick={() => streaming.evaluate(submissionId)}
                disabled={streaming.isStreaming}
                className="mt-6 px-8 py-3 bg-rust text-white text-[12px] font-mono uppercase tracking-widest hover:bg-rustDeep transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
              >
                Run AI Evaluation
              </button>
            </div>
          </section>
        </>
      )}

      {/* Streaming in progress */}
      {streaming.isStreaming && (
        <section className="mt-14 pt-10 border-t border-rule slide-in">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-gold pulse-dot" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-gold">
              Evaluating...
            </span>
          </div>
          <div className="border border-rule bg-paperDark/30 p-6">
            <pre className="font-mono text-[12px] text-inkSoft whitespace-pre-wrap leading-relaxed max-h-[400px] overflow-y-auto">
              {streaming.content || "Starting evaluation agent..."}
            </pre>
          </div>
        </section>
      )}

      {/* Full evaluation report */}
      {activeEvaluation && (
        <>
          {/* 01 - Submission Overview */}
          <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10 slide-in">
            <div className="col-span-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
                01 &middot; Submission Overview
              </div>
            </div>
            <div className="col-span-9">
              <div className="grid grid-cols-3 gap-6">
                <InfoField label="Participant" value={submission.participant_name} />
                <InfoField label="Team" value={submission.team_name || "\u2014"} />
                <InfoField label="Country" value={submission.country || "\u2014"} />
              </div>

              {submission.claimed_technologies?.length > 0 && (
                <div className="mt-6">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-2">
                    Technologies
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {submission.claimed_technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="inline-block px-2 py-0.5 text-[11px] bg-paperDark text-inkSoft border border-rule rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-4">
                {submission.repo_url && (
                  <ExternalLink href={submission.repo_url} label="Repository" />
                )}
                {submission.documentation_url && (
                  <ExternalLink href={submission.documentation_url} label="Documentation" />
                )}
                {submission.video_pitch_url && (
                  <ExternalLink href={submission.video_pitch_url} label="Video Pitch" />
                )}
              </div>
            </div>
          </section>

          {/* 02 - Criteria Scores */}
          <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10 slide-in">
            <div className="col-span-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
                02 &middot; Criteria Scores
              </div>
              <p className="mt-3 text-[12px] text-inkMuted leading-relaxed">
                Each criterion is weighted and scored independently by the AI evaluation agent.
              </p>
              <div className="mt-6 border border-rule bg-paperDark/40 p-4">
                <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-2">
                  Overall Score
                </div>
                <div className="font-display text-[48px] leading-none tracking-tightest text-ink num">
                  {activeEvaluation.overall_score}
                </div>
              </div>
            </div>
            <div className="col-span-9 space-y-4">
              {activeEvaluation.criteria_scores.map((criterion, i) => (
                <ScoreCard key={i} criterion={criterion} animate={!!streaming.evaluation} />
              ))}
            </div>
          </section>

          {/* 03 - Code Analysis */}
          {activeEvaluation.code_analysis && (
            <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10 slide-in">
              <div className="col-span-3">
                <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
                  03 &middot; Code Analysis
                </div>
                <p className="mt-3 text-[12px] text-inkMuted leading-relaxed">
                  Automated analysis of repository code quality, architecture, and technology stack.
                </p>
              </div>
              <div className="col-span-9">
                <div className="border border-rule bg-paper p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-2">
                        Languages
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeEvaluation.code_analysis.languages.map((lang, i) => (
                          <span
                            key={i}
                            className="inline-block px-2 py-0.5 text-[11px] bg-tealSoft text-teal border border-teal/20 rounded-sm font-mono"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-2">
                        Quality
                      </div>
                      <p className="text-[13px] text-ink">{activeEvaluation.code_analysis.quality}</p>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-rule">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-2">
                      Architecture Notes
                    </div>
                    <p className="text-[13px] text-inkSoft leading-relaxed">
                      {activeEvaluation.code_analysis.architecture_notes}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 04 - Overall Assessment */}
          <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10 slide-in">
            <div className="col-span-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
                {activeEvaluation.code_analysis ? "04" : "03"} &middot; Overall Assessment
              </div>
            </div>
            <div className="col-span-9">
              <div className="flex items-center gap-4 mb-6">
                <RecommendationBadge recommendation={activeEvaluation.recommendation} />
                <span className="font-display text-[28px] tracking-tightest text-ink num">
                  {activeEvaluation.overall_score}/100
                </span>
              </div>
              <p className="text-[15px] text-inkSoft leading-relaxed max-w-2xl">
                {activeEvaluation.summary}
              </p>
              {activeEvaluation.duration_ms && (
                <div className="mt-4 text-[11px] font-mono text-inkMuted">
                  Evaluated in {(activeEvaluation.duration_ms / 1000).toFixed(1)}s
                </div>
              )}
            </div>
          </section>

          {/* 05 - Actions */}
          <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10 slide-in">
            <div className="col-span-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
                {activeEvaluation.code_analysis ? "05" : "04"} &middot; Actions
              </div>
            </div>
            <div className="col-span-9 flex flex-wrap gap-4">
              {/* Interview: generate or view */}
              {activeEvaluation.recommendation !== "Reject" && !interview && (
                <button
                  onClick={handleGenerateInterview}
                  disabled={generatingInterview}
                  className="px-6 py-2.5 bg-ink text-paper text-[12px] font-mono uppercase tracking-widest hover:bg-rust transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
                >
                  {generatingInterview ? "Generating..." : "Generate Interview"}
                </button>
              )}
              {interview && (
                <Link
                  href={`/interview/${interview.id}`}
                  className="px-6 py-2.5 bg-ink text-paper text-[12px] font-mono uppercase tracking-widest hover:bg-rust transition-colors rounded-sm"
                >
                  View Interview &rarr;
                </Link>
              )}
              {/* Grant link */}
              {grant && (
                <Link
                  href={`/grants/${grant.id}`}
                  className="px-6 py-2.5 bg-leaf text-white text-[12px] font-mono uppercase tracking-widest hover:bg-leaf/80 transition-colors rounded-sm"
                >
                  View Grant &rarr;
                </Link>
              )}
              <Link
                href="/evaluate"
                className="px-6 py-2.5 border border-ink text-ink text-[12px] font-mono uppercase tracking-widest hover:bg-paperDark transition-colors rounded-sm"
              >
                Back to Dashboard
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-20 pt-6 border-t border-rule flex justify-between text-[11px] font-mono text-inkMuted uppercase tracking-widest">
            <span>
              Evaluation by AI Agent &middot;{" "}
              {new Date(activeEvaluation.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>Africa DeepTech Challenge</span>
          </footer>
        </>
      )}

      {/* Footer for non-evaluated state */}
      {!activeEvaluation && !streaming.isStreaming && (
        <footer className="mt-20 pt-6 border-t border-rule flex justify-between text-[11px] font-mono text-inkMuted uppercase tracking-widest">
          <span>Africa DeepTech Challenge</span>
          <span>Awaiting Evaluation</span>
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
      <div className="text-[14px] text-ink">{value}</div>
    </div>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-[12px] font-mono text-rust hover:text-rustDeep transition-colors"
    >
      {label} &nearr;
    </a>
  );
}
