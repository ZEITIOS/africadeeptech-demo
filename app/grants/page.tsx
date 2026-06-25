"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { insforge } from "@/lib/insforge";
import { SectionHeader, StatBlock } from "@/components/UI";
import RoleGuard from "@/components/evaluation/RoleGuard";
import type { Grant, Milestone, Submission } from "@/lib/types";

interface GrantWithDetails extends Grant {
  team_name?: string;
  milestones: Milestone[];
}

export default function GrantsPage() {
  const [grants, setGrants] = useState<GrantWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [grantRes, milestoneRes, subRes] = await Promise.all([
          insforge.database
            .from("adt_grants")
            .select("*")
            .order("created_at", { ascending: false }),
          insforge.database.from("adt_milestones").select("*"),
          insforge.database.from("adt_submissions").select("id, team_name"),
        ]);

        if (grantRes.error) throw grantRes.error;
        if (milestoneRes.error) throw milestoneRes.error;
        if (subRes.error) throw subRes.error;

        const allGrants = (grantRes.data ?? []) as Grant[];
        const allMilestones = (milestoneRes.data ?? []) as Milestone[];
        const allSubs = (subRes.data ?? []) as Pick<Submission, "id" | "team_name">[];

        const subMap = new Map(allSubs.map((s) => [s.id, s.team_name]));
        const msMap = new Map<string, Milestone[]>();
        for (const ms of allMilestones) {
          const existing = msMap.get(ms.grant_id) ?? [];
          existing.push(ms);
          msMap.set(ms.grant_id, existing);
        }

        const joined: GrantWithDetails[] = allGrants.map((g) => ({
          ...g,
          team_name: subMap.get(g.submission_id) ?? undefined,
          milestones: (msMap.get(g.id) ?? []).sort((a, b) => a.order_num - b.order_num),
        }));

        setGrants(joined);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to load grants";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const activeCount = grants.filter((g) => g.status === "active").length;
  const totalDisbursed = grants.reduce((sum, g) => {
    const approved = g.milestones
      .filter((m) => m.status === "approved")
      .reduce((s, m) => s + m.amount, 0);
    return sum + approved;
  }, 0);
  const allMilestones = grants.flatMap((g) => g.milestones);
  const approvedCount = allMilestones.filter((m) => m.status === "approved").length;
  const pendingReviewCount = allMilestones.filter(
    (m) => m.status === "submitted" || m.status === "under_review"
  ).length;

  return (
    <RoleGuard allowedRoles={["admin", "reviewer"]}>
    <div className="px-8 py-10 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="slide-in">
        <SectionHeader
          eyebrow="Grants"
          title="Milestone-Based Grants"
          description="Track grant disbursements tied to verified milestone completion. Each milestone requires evidence submission and AI-assisted review before funds are released."
        />
      </div>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-4 gap-4 slide-in">
        <StatBlock label="Active" value={String(activeCount)} sub="grants in progress" />
        <StatBlock
          label="Disbursed"
          value={`$${totalDisbursed.toLocaleString()}`}
          sub="total released"
        />
        <StatBlock label="Approved" value={String(approvedCount)} sub="milestones completed" />
        <StatBlock label="Pending" value={String(pendingReviewCount)} sub="awaiting review" />
      </div>

      {/* Grant Cards */}
      <div className="mt-10 space-y-6">
        {loading && (
          <div className="border border-rule p-16 text-center">
            <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted pulse-dot">
              Loading grants...
            </div>
          </div>
        )}

        {error && (
          <div className="border border-rust/30 bg-rustSoft p-6 text-center">
            <p className="text-[13px] text-rustDeep">{error}</p>
          </div>
        )}

        {!loading &&
          !error &&
          grants.map((grant) => {
            const approved = grant.milestones.filter((m) => m.status === "approved").length;
            const submitted = grant.milestones.filter(
              (m) => m.status === "submitted" || m.status === "under_review"
            ).length;
            const total = grant.milestones.length;
            const progressPct = total > 0 ? (approved / total) * 100 : 0;

            return (
              <Link
                key={grant.id}
                href={`/grants/${grant.id}`}
                className="block border border-rule bg-paper hover:bg-paperDark/30 transition-colors"
              >
                <div className="p-6">
                  {/* Top row: team info + amount */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-display text-[22px] tracking-tightest text-ink leading-tight">
                        {grant.team_name || grant.participant_name || "Unnamed Team"}
                      </div>
                      {grant.participant_name && grant.team_name && (
                        <div className="text-[12px] text-inkMuted mt-0.5">
                          {grant.participant_name}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-display text-[28px] tracking-tightest text-ink num leading-none">
                        {grant.currency === "USD" ? "$" : grant.currency}{" "}
                        {grant.total_amount.toLocaleString()}
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mt-1">
                        Total Grant
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-[11px] text-inkMuted mb-1.5">
                      <span>
                        {approved} of {total} milestones approved
                      </span>
                      <span className="font-mono num">{Math.round(progressPct)}%</span>
                    </div>
                    <div className="h-1.5 bg-ruleSoft rounded-full overflow-hidden">
                      <div
                        className="h-full bg-leaf transition-all rounded-full"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Milestone timeline dots */}
                  <div className="flex items-center gap-2 mt-4">
                    {grant.milestones.map((ms, i) => (
                      <div key={ms.id} className="flex items-center gap-2">
                        {i > 0 && <div className="w-6 h-px bg-rule" />}
                        <div className="flex items-center gap-1.5" title={`${ms.title}: ${ms.status}`}>
                          {ms.status === "approved" && (
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
                          )}
                          {(ms.status === "submitted" || ms.status === "under_review") && (
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
                          )}
                          {(ms.status === "pending" ||
                            ms.status === "revision_requested" ||
                            ms.status === "rejected") &&
                            ms.status === "pending" && (
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-rule bg-paper" />
                            )}
                          {ms.status === "rejected" && (
                            <div className="w-3.5 h-3.5 rounded-full bg-rustSoft border-2 border-rust/40" />
                          )}
                          {ms.status === "revision_requested" && (
                            <div className="w-3.5 h-3.5 rounded-full bg-goldSoft border-2 border-gold/40" />
                          )}
                          <span className="text-[10px] font-mono text-inkMuted">
                            M{ms.order_num}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}

        {!loading && !error && grants.length === 0 && (
          <div className="border border-dashed border-rule p-16 text-center">
            <div className="font-display text-[28px] text-ink tracking-tightest">
              No grants yet.
            </div>
            <p className="text-[13px] text-inkMuted mt-2 max-w-md mx-auto">
              Grants are created when submissions advance through the evaluation and interview pipeline.
            </p>
          </div>
        )}
      </div>

      <footer className="mt-20 pt-6 border-t border-rule flex justify-between text-[11px] font-mono text-inkMuted uppercase tracking-widest">
        <span>Africa DeepTech Challenge</span>
        <span>Grant Tracker</span>
      </footer>
    </div>
    </RoleGuard>
  );
}
