"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { SubmissionWithEvaluation, EvaluationStatus } from "@/lib/types";
import RecommendationBadge from "./RecommendationBadge";

const statusStyles: Record<EvaluationStatus, { bg: string; text: string; dot: string; pulse?: boolean }> = {
  pending: { bg: "bg-paperDark", text: "text-inkMuted", dot: "bg-inkMuted" },
  evaluating: { bg: "bg-goldSoft", text: "text-gold", dot: "bg-gold", pulse: true },
  evaluated: { bg: "bg-tealSoft", text: "text-teal", dot: "bg-teal" },
  error: { bg: "bg-rustSoft", text: "text-rustDeep", dot: "bg-rust" },
};

type SortKey = "score" | "date";
type SortDir = "asc" | "desc";

export default function SubmissionTable({
  submissions,
}: {
  submissions: SubmissionWithEvaluation[];
}) {
  const router = useRouter();
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const sorted = useMemo(() => {
    const copy = [...submissions];
    copy.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "score") {
        const sa = a.evaluation?.overall_score ?? -1;
        const sb = b.evaluation?.overall_score ?? -1;
        cmp = sa - sb;
      } else {
        cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [submissions, sortKey, sortDir]);

  const sortIndicator = (key: SortKey) =>
    sortKey === key ? (sortDir === "asc" ? " \u2191" : " \u2193") : "";

  return (
    <div className="border border-rule">
      {/* Table header */}
      <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-paperDark/50 border-b border-rule text-[10px] font-mono uppercase tracking-widest text-inkMuted">
        <div className="col-span-2">Team</div>
        <div className="col-span-2">Participant</div>
        <div className="col-span-1">Country</div>
        <div className="col-span-2 text-center">Status</div>
        <div
          className="col-span-2 text-center cursor-pointer hover:text-ink transition-colors"
          onClick={() => toggleSort("score")}
        >
          Score{sortIndicator("score")}
        </div>
        <div className="col-span-2 text-center">Recommendation</div>
        <div
          className="col-span-1 text-right cursor-pointer hover:text-ink transition-colors"
          onClick={() => toggleSort("date")}
        >
          Date{sortIndicator("date")}
        </div>
      </div>

      {/* Rows */}
      {sorted.length === 0 && (
        <div className="px-5 py-12 text-center">
          <p className="text-[14px] text-inkMuted">No submissions found.</p>
        </div>
      )}
      {sorted.map((sub) => {
        const st = statusStyles[sub.status];
        return (
          <div
            key={sub.id}
            onClick={() => router.push(`/evaluate/${sub.id}`)}
            className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-rule last:border-0 items-center cursor-pointer hover:bg-paperDark/30 transition-colors"
          >
            <div className="col-span-2 font-mono text-[13px] text-ink truncate">
              {sub.team_name || "\u2014"}
            </div>
            <div className="col-span-2 text-[13px] text-inkSoft truncate">
              {sub.participant_name}
            </div>
            <div className="col-span-1 text-[12px] text-inkSoft">
              {sub.country || "\u2014"}
            </div>
            <div className="col-span-2 text-center">
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-sm ${st.bg} ${st.text}`}
              >
                <span className={`h-1 w-1 rounded-full ${st.dot} ${st.pulse ? "pulse-dot" : ""}`} />
                {sub.status}
              </span>
            </div>
            <div className="col-span-2 text-center font-mono text-[14px] num">
              {sub.evaluation ? (
                <span className="text-ink">{sub.evaluation.overall_score}</span>
              ) : (
                <span className="text-inkMuted">&mdash;</span>
              )}
            </div>
            <div className="col-span-2 text-center">
              {sub.evaluation?.recommendation ? (
                <RecommendationBadge recommendation={sub.evaluation.recommendation} />
              ) : (
                <span className="text-[11px] text-inkMuted">&mdash;</span>
              )}
            </div>
            <div className="col-span-1 text-right font-mono text-[11px] text-inkMuted num">
              {new Date(sub.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
