"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { insforge } from "@/lib/insforge";
import type { Submission, Evaluation, SubmissionWithEvaluation, EvaluationStatus } from "@/lib/types";
import { SectionHeader, StatBlock } from "@/components/UI";
import SubmissionTable from "@/components/evaluation/SubmissionTable";
import RoleGuard from "@/components/evaluation/RoleGuard";
import { useAuth } from "@/lib/hooks/useAuth";

const STATUS_FILTERS: { label: string; value: EvaluationStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Evaluating", value: "evaluating" },
  { label: "Evaluated", value: "evaluated" },
];

export default function EvaluatePage() {
  const [submissions, setSubmissions] = useState<SubmissionWithEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<EvaluationStatus | "all">("all");
  const { user } = useAuth();

  const isParticipant = user?.role === "participant";

  useEffect(() => {
    if (!user) return;

    async function load() {
      try {
        let subQuery = insforge.database
          .from("adt_submissions")
          .select("*")
          .order("created_at", { ascending: false });

        // Participants only see their own submissions
        if (isParticipant) {
          subQuery = subQuery.eq("user_id", user!.id);
        }

        const [subRes, evalRes] = await Promise.all([
          subQuery,
          insforge.database.from("adt_evaluations").select("*"),
        ]);

        if (subRes.error) throw subRes.error;
        if (evalRes.error) throw evalRes.error;

        const subs = (subRes.data ?? []) as Submission[];
        const evals = (evalRes.data ?? []) as Evaluation[];

        const evalMap = new Map<string, Evaluation>();
        for (const ev of evals) {
          evalMap.set(ev.submission_id, ev);
        }

        const joined: SubmissionWithEvaluation[] = subs.map((s) => ({
          ...s,
          evaluation: evalMap.get(s.id),
        }));

        setSubmissions(joined);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to load submissions";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user, isParticipant]);

  const filtered = useMemo(() => {
    if (statusFilter === "all") return submissions;
    return submissions.filter((s) => s.status === statusFilter);
  }, [submissions, statusFilter]);

  const totalCount = submissions.length;
  const evaluatedCount = submissions.filter((s) => s.status === "evaluated").length;
  const pendingCount = submissions.filter(
    (s) => s.status === "pending" || s.status === "evaluating"
  ).length;
  const advanceRate =
    evaluatedCount > 0
      ? Math.round(
          (submissions.filter((s) => s.evaluation?.recommendation === "Advance").length /
            evaluatedCount) *
            100
        )
      : 0;

  return (
    <RoleGuard allowedRoles={["admin", "reviewer", "participant"]}>
    <div className="px-8 py-10 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="slide-in flex items-start justify-between">
        <SectionHeader
          eyebrow={isParticipant ? "My Submissions" : "Evaluation"}
          title={isParticipant ? "Your Submissions" : "Challenge Submissions"}
          description={isParticipant
            ? "Track the status of your challenge submissions and view evaluation results."
            : "AI-powered evaluation of deep tech challenge submissions. Each submission is scored across weighted criteria with transparent reasoning."
          }
        />
        <Link
          href="/evaluate/submit"
          className="shrink-0 px-5 py-2.5 bg-rust text-white text-[12px] font-mono uppercase tracking-widest hover:bg-rustDeep transition-colors rounded-sm"
        >
          {isParticipant ? "Submit Entry" : "New Submission"}
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-4 gap-4 slide-in">
        <StatBlock label="Total" value={String(totalCount)} sub={isParticipant ? "your submissions" : "submissions received"} />
        <StatBlock label="Evaluated" value={String(evaluatedCount)} sub="AI evaluations complete" />
        <StatBlock label="Pending" value={String(pendingCount)} sub="awaiting evaluation" />
        <StatBlock
          label="Advance Rate"
          value={`${advanceRate}%`}
          sub="of evaluated submissions"
        />
      </div>

      {/* Filters */}
      <div className="mt-8 flex items-center gap-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mr-2">
          Status
        </span>
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={`text-[11px] px-2.5 py-1 border rounded-sm transition-colors ${
              statusFilter === f.value
                ? "bg-ink text-paper border-ink"
                : "bg-transparent text-inkSoft border-rule hover:border-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="mt-6">
        {loading && (
          <div className="border border-rule p-16 text-center">
            <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted pulse-dot">
              Loading submissions...
            </div>
          </div>
        )}

        {error && (
          <div className="border border-rust/30 bg-rustSoft p-6 text-center">
            <p className="text-[13px] text-rustDeep">{error}</p>
          </div>
        )}

        {!loading && !error && <SubmissionTable submissions={filtered} />}
      </div>

      <footer className="mt-20 pt-6 border-t border-rule flex justify-between text-[11px] font-mono text-inkMuted uppercase tracking-widest">
        <span>Africa DeepTech Challenge</span>
        <span>AI Evaluation Agent</span>
      </footer>
    </div>
    </RoleGuard>
  );
}
