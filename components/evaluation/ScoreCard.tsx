"use client";
import { useState } from "react";
import type { EvaluationCriterionScore } from "@/lib/types";

function scoreColor(score: number): string {
  if (score < 50) return "bg-rust";
  if (score <= 70) return "bg-gold";
  return "bg-leaf";
}

function scoreTextColor(score: number): string {
  if (score < 50) return "text-rust";
  if (score <= 70) return "text-gold";
  return "text-leaf";
}

export default function ScoreCard({
  criterion,
  animate = false,
}: {
  criterion: EvaluationCriterionScore;
  animate?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-rule bg-paper p-5">
      {/* Header: name + weight + score */}
      <div className="flex items-baseline justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-[14px] text-ink font-medium">{criterion.name}</span>
          <span className="text-[10px] font-mono text-inkMuted uppercase tracking-widest">
            w:{criterion.weight}
          </span>
        </div>
        <span className={`text-[18px] font-mono num font-semibold ${scoreTextColor(criterion.score)}`}>
          {criterion.score}
        </span>
      </div>

      {/* Score bar */}
      <div className="h-1.5 bg-ruleSoft rounded-full overflow-hidden mb-4">
        <div
          className={`h-full rounded-full ${scoreColor(criterion.score)} ${
            animate ? "transition-all duration-1000 ease-out" : ""
          }`}
          style={{ width: `${criterion.score}%` }}
        />
      </div>

      {/* Reasoning */}
      <p className="text-[13px] text-inkSoft leading-relaxed">{criterion.reasoning}</p>

      {/* Expandable strengths/weaknesses */}
      {(criterion.strengths.length > 0 || criterion.weaknesses.length > 0) && (
        <div className="mt-3 pt-3 border-t border-ruleSoft">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[11px] font-mono uppercase tracking-widest text-inkMuted hover:text-ink transition-colors"
          >
            {expanded ? "Hide details" : "Show details"} {expanded ? "\u2191" : "\u2193"}
          </button>

          {expanded && (
            <div className="mt-3 grid grid-cols-2 gap-4">
              {criterion.strengths.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-leaf mb-2">
                    Strengths
                  </div>
                  <ul className="space-y-1">
                    {criterion.strengths.map((s, i) => (
                      <li key={i} className="text-[12px] text-inkSoft flex gap-2">
                        <span className="text-leaf shrink-0">+</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {criterion.weaknesses.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-rust mb-2">
                    Weaknesses
                  </div>
                  <ul className="space-y-1">
                    {criterion.weaknesses.map((w, i) => (
                      <li key={i} className="text-[12px] text-inkSoft flex gap-2">
                        <span className="text-rust shrink-0">&minus;</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
