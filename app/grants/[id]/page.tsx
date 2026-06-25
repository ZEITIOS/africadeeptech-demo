"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { insforge } from "@/lib/insforge";
import { SectionHeader, SkillBar } from "@/components/UI";
import RoleGuard from "@/components/evaluation/RoleGuard";
import type { Grant, Milestone, MilestoneEvidence, Submission } from "@/lib/types";

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  approved: { label: "Approved", color: "text-leaf", bg: "bg-leafSoft", border: "border-leaf" },
  submitted: { label: "Under Review", color: "text-gold", bg: "bg-goldSoft", border: "border-gold" },
  under_review: { label: "Under Review", color: "text-gold", bg: "bg-goldSoft", border: "border-gold" },
  pending: { label: "Pending", color: "text-inkMuted", bg: "bg-paperDark", border: "border-rule" },
  revision_requested: { label: "Revision Requested", color: "text-gold", bg: "bg-goldSoft", border: "border-gold" },
  rejected: { label: "Rejected", color: "text-rustDeep", bg: "bg-rustSoft", border: "border-rust" },
};

export default function GrantDetailPage() {
  const params = useParams();
  const grantId = params.id as string;

  const [grant, setGrant] = useState<Grant | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [evidenceMap, setEvidenceMap] = useState<Map<string, MilestoneEvidence>>(new Map());
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const grantRes = await insforge.database
          .from("adt_grants")
          .select("*")
          .eq("id", grantId)
          .single();

        if (grantRes.error) throw grantRes.error;
        const g = grantRes.data as Grant;
        setGrant(g);

        const [msRes, subRes] = await Promise.all([
          insforge.database
            .from("adt_milestones")
            .select("*")
            .eq("grant_id", grantId)
            .order("order_num", { ascending: true }),
          insforge.database
            .from("adt_submissions")
            .select("*")
            .eq("id", g.submission_id)
            .single(),
        ]);

        if (msRes.error) throw msRes.error;
        const ms = (msRes.data ?? []) as Milestone[];
        setMilestones(ms);

        // Fetch evidence for each milestone
        if (ms.length > 0) {
          const milestoneIds = ms.map((m) => m.id);
          const evRes = await insforge.database
            .from("adt_milestone_evidence")
            .select("*")
            .in("milestone_id", milestoneIds);

          if (!evRes.error && evRes.data) {
            const map = new Map<string, MilestoneEvidence>();
            for (const ev of evRes.data as MilestoneEvidence[]) {
              map.set(ev.milestone_id, ev);
            }
            setEvidenceMap(map);
          }
        }

        if (!subRes.error && subRes.data) {
          setSubmission(subRes.data as Submission);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to load grant";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [grantId]);

  if (loading) {
    return (
      <div className="px-8 py-10 max-w-[1400px] mx-auto">
        <div className="border border-rule p-16 text-center">
          <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted pulse-dot">
            Loading grant...
          </div>
        </div>
      </div>
    );
  }

  if (error || !grant) {
    return (
      <div className="px-8 py-10 max-w-[1400px] mx-auto">
        <div className="border border-rust/30 bg-rustSoft p-6 text-center">
          <p className="text-[13px] text-rustDeep">{error || "Grant not found."}</p>
        </div>
        <Link
          href="/grants"
          className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-inkMuted hover:text-ink transition-colors mt-6"
        >
          &larr; Back to grants
        </Link>
      </div>
    );
  }

  const approvedAmount = milestones
    .filter((m) => m.status === "approved")
    .reduce((s, m) => s + m.amount, 0);
  const remainingAmount = grant.total_amount - approvedAmount;

  // Find first pending milestone (next to submit)
  const firstPendingIdx = milestones.findIndex((m) => m.status === "pending");

  return (
    <RoleGuard allowedRoles={["admin", "reviewer"]}>
    <div className="px-8 py-10 max-w-[1400px] mx-auto">
      {/* Back link */}
      <Link
        href="/grants"
        className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-inkMuted hover:text-ink transition-colors mb-8"
      >
        &larr; Back to grants
      </Link>

      {/* Page header */}
      <div className="slide-in">
        <SectionHeader
          eyebrow="Grant Detail"
          title={submission?.team_name || grant.participant_name || "Grant"}
          description={`Milestone-based grant tracking for ${grant.participant_name || "this team"}.`}
        />
      </div>

      {/* 01 - Grant Overview */}
      <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10 slide-in">
        <div className="col-span-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
            01 &middot; Grant Overview
          </div>
        </div>
        <div className="col-span-9">
          <div className="grid grid-cols-3 gap-6">
            <InfoField label="Participant" value={grant.participant_name || "\u2014"} />
            <InfoField label="Team" value={submission?.team_name || "\u2014"} />
            <InfoField
              label="Linked Submission"
              value={submission?.id ? submission.id.slice(0, 8) + "..." : "\u2014"}
              href={submission?.id ? `/evaluate/${submission.id}` : undefined}
            />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-6">
            <InfoField
              label="Total Amount"
              value={`${grant.currency === "USD" ? "$" : grant.currency} ${grant.total_amount.toLocaleString()}`}
            />
            <InfoField label="Status" value={grant.status} />
            <InfoField
              label="Created"
              value={new Date(grant.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            />
          </div>
        </div>
      </section>

      {/* 02 - Milestone Timeline */}
      <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10 slide-in">
        <div className="col-span-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
            02 &middot; Milestone Timeline
          </div>
          <p className="mt-3 text-[12px] text-inkMuted leading-relaxed">
            Each milestone must be completed in order. Evidence is submitted and reviewed before
            funds are released.
          </p>
        </div>
        <div className="col-span-9">
          <div className="relative">
            {milestones.map((ms, i) => {
              const evidence = evidenceMap.get(ms.id);
              const cfg = statusConfig[ms.status] ?? statusConfig.pending;
              const isNextPending = i === firstPendingIdx;
              const isLast = i === milestones.length - 1;

              return (
                <div key={ms.id} className="relative flex gap-6">
                  {/* Timeline spine */}
                  <div className="flex flex-col items-center shrink-0">
                    {/* Node */}
                    <div className="relative z-10">
                      {ms.status === "approved" && (
                        <div className="w-8 h-8 rounded-full bg-leafSoft border-2 border-leaf flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-leaf"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        </div>
                      )}
                      {(ms.status === "submitted" || ms.status === "under_review") && (
                        <div className="w-8 h-8 rounded-full bg-goldSoft border-2 border-gold flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-gold"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </div>
                      )}
                      {ms.status === "pending" && (
                        <div className="w-8 h-8 rounded-full border-2 border-rule bg-paper" />
                      )}
                      {ms.status === "rejected" && (
                        <div className="w-8 h-8 rounded-full bg-rustSoft border-2 border-rust flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-rustDeep"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      )}
                      {ms.status === "revision_requested" && (
                        <div className="w-8 h-8 rounded-full bg-goldSoft border-2 border-gold flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-gold"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    {/* Connecting line */}
                    {!isLast && (
                      <div className="w-px flex-1 bg-rule min-h-[24px]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pb-8 ${isLast ? "pb-0" : ""}`}>
                    {/* Header row */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-inkMuted">
                            M{ms.order_num}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest border rounded-sm ${cfg.bg} ${cfg.color} ${cfg.border}`}
                          >
                            {cfg.label}
                          </span>
                        </div>
                        <div className="font-display text-[18px] tracking-tightest text-ink leading-tight">
                          {ms.title}
                        </div>
                        {ms.description && (
                          <p className="text-[13px] text-inkSoft leading-relaxed mt-1 max-w-xl">
                            {ms.description}
                          </p>
                        )}
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <div className="font-mono text-[16px] text-ink num">
                          ${ms.amount.toLocaleString()}
                        </div>
                        {ms.deadline && (
                          <div className="text-[10px] font-mono text-inkMuted mt-0.5">
                            Due{" "}
                            {new Date(ms.deadline).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Evidence block */}
                    {evidence && (
                      <div className="mt-4 border border-rule bg-paperDark/30 p-4 space-y-3">
                        {evidence.narrative && (
                          <div>
                            <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-1">
                              Narrative
                            </div>
                            <p className="text-[13px] text-inkSoft leading-relaxed line-clamp-4">
                              {evidence.narrative}
                            </p>
                          </div>
                        )}

                        {evidence.ai_review && (
                          <div className="pt-3 border-t border-ruleSoft space-y-2">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-1">
                              AI Review
                            </div>
                            <SkillBar
                              skill="Completeness"
                              score={evidence.ai_review.completeness_score}
                            />
                            <p className="text-[12px] text-inkSoft leading-relaxed">
                              {evidence.ai_review.progress_assessment}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono uppercase tracking-widest text-inkMuted">
                                Recommendation:
                              </span>
                              <span
                                className={`text-[10px] font-mono uppercase tracking-widest ${
                                  evidence.ai_review.recommendation === "Approve"
                                    ? "text-leaf"
                                    : evidence.ai_review.recommendation === "Reject"
                                    ? "text-rustDeep"
                                    : "text-gold"
                                }`}
                              >
                                {evidence.ai_review.recommendation}
                              </span>
                            </div>
                            {evidence.ai_review.concerns.length > 0 && (
                              <ul className="space-y-1">
                                {evidence.ai_review.concerns.map((c, ci) => (
                                  <li
                                    key={ci}
                                    className="flex gap-2 text-[12px] text-inkSoft"
                                  >
                                    <span className="text-gold shrink-0">&bull;</span>
                                    <span>{c}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}

                        {evidence.reviewer_decision && (
                          <div className="pt-3 border-t border-ruleSoft">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-1">
                              Reviewer Decision
                            </div>
                            <p className="text-[13px] text-ink capitalize">
                              {evidence.reviewer_decision}
                            </p>
                            {evidence.reviewer_notes && (
                              <p className="text-[12px] text-inkSoft mt-1">
                                {evidence.reviewer_notes}
                              </p>
                            )}
                          </div>
                        )}

                        {evidence.files && evidence.files.length > 0 && (
                          <div className="pt-3 border-t border-ruleSoft">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-2">
                              Files
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {evidence.files.map((f, fi) => (
                                <a
                                  key={fi}
                                  href={f.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-rust hover:text-rustDeep border border-rule rounded-sm transition-colors"
                                >
                                  {f.name} &nearr;
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Submit evidence button for next pending */}
                    {isNextPending && (
                      <button
                        disabled
                        className="mt-4 px-5 py-2 border border-dashed border-rule text-[11px] font-mono uppercase tracking-widest text-inkMuted hover:border-ink hover:text-ink transition-colors rounded-sm cursor-not-allowed opacity-60"
                      >
                        Submit Evidence
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03 - Financial Summary */}
      <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10 slide-in">
        <div className="col-span-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
            03 &middot; Financial Summary
          </div>
        </div>
        <div className="col-span-9">
          <div className="border border-rule">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-paperDark/50 border-b border-rule text-[10px] font-mono uppercase tracking-widest text-inkMuted">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Milestone</div>
              <div className="col-span-2 text-right">Amount</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-3 text-right">Disbursement Date</div>
            </div>
            {/* Rows */}
            {milestones.map((ms) => {
              const evidence = evidenceMap.get(ms.id);
              const cfg = statusConfig[ms.status] ?? statusConfig.pending;
              return (
                <div
                  key={ms.id}
                  className="grid grid-cols-12 gap-4 px-5 py-3.5 border-b border-rule last:border-0 items-center"
                >
                  <div className="col-span-1 font-mono text-[11px] text-inkMuted">
                    M{ms.order_num}
                  </div>
                  <div className="col-span-4 text-[13px] text-ink truncate">{ms.title}</div>
                  <div className="col-span-2 text-right font-mono text-[13px] text-ink num">
                    ${ms.amount.toLocaleString()}
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest border rounded-sm ${cfg.bg} ${cfg.color} ${cfg.border}`}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <div className="col-span-3 text-right text-[12px] font-mono text-inkMuted">
                    {ms.status === "approved" && evidence?.reviewed_at
                      ? new Date(evidence.reviewed_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "\u2014"}
                  </div>
                </div>
              );
            })}
            {/* Totals */}
            <div className="grid grid-cols-12 gap-4 px-5 py-4 bg-paperDark/30 border-t border-rule">
              <div className="col-span-5 text-[11px] font-mono uppercase tracking-widest text-inkMuted">
                Total Approved
              </div>
              <div className="col-span-2 text-right font-mono text-[14px] text-leaf num font-semibold">
                ${approvedAmount.toLocaleString()}
              </div>
              <div className="col-span-5" />
            </div>
            <div className="grid grid-cols-12 gap-4 px-5 py-4 border-t border-ruleSoft">
              <div className="col-span-5 text-[11px] font-mono uppercase tracking-widest text-inkMuted">
                Remaining
              </div>
              <div className="col-span-2 text-right font-mono text-[14px] text-ink num">
                ${remainingAmount.toLocaleString()}
              </div>
              <div className="col-span-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10 slide-in">
        <div className="col-span-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
            04 &middot; Actions
          </div>
        </div>
        <div className="col-span-9 flex gap-4">
          {submission && (
            <Link
              href={`/evaluate/${submission.id}`}
              className="px-6 py-2.5 border border-ink text-ink text-[12px] font-mono uppercase tracking-widest hover:bg-paperDark transition-colors rounded-sm"
            >
              View Evaluation
            </Link>
          )}
          <Link
            href="/grants"
            className="px-6 py-2.5 border border-ink text-ink text-[12px] font-mono uppercase tracking-widest hover:bg-paperDark transition-colors rounded-sm"
          >
            Back to Dashboard
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 pt-6 border-t border-rule flex justify-between text-[11px] font-mono text-inkMuted uppercase tracking-widest">
        <span>
          Grant &middot;{" "}
          {new Date(grant.created_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
        <span>Africa DeepTech Challenge</span>
      </footer>
    </div>
    </RoleGuard>
  );
}

function InfoField({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-1">
        {label}
      </div>
      {href ? (
        <Link
          href={href}
          className="text-[12px] font-mono text-rust hover:text-rustDeep transition-colors"
        >
          {value} &nearr;
        </Link>
      ) : (
        <div className="text-[14px] text-ink capitalize">{value}</div>
      )}
    </div>
  );
}
