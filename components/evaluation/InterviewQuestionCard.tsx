"use client";

import type { InterviewQuestion } from "@/lib/types";

const categoryStyles: Record<InterviewQuestion["category"], { bg: string; text: string; border: string }> = {
  technical: { bg: "bg-tealSoft", text: "text-teal", border: "border-teal/20" },
  process: { bg: "bg-goldSoft", text: "text-gold", border: "border-gold/20" },
  authenticity: { bg: "bg-rustSoft", text: "text-rustDeep", border: "border-rust/20" },
  behavioral: { bg: "bg-paperDark", text: "text-ink", border: "border-rule" },
};

export default function InterviewQuestionCard({
  question,
  index,
  total,
  isActive,
}: {
  question: InterviewQuestion;
  index: number;
  total: number;
  isActive: boolean;
}) {
  const cat = categoryStyles[question.category];

  return (
    <div
      className={`border bg-paper p-5 transition-all ${
        isActive
          ? "border-l-4 border-l-rust border-t-rule border-r-rule border-b-rule shadow-sm"
          : "border-rule opacity-70 hover:opacity-100"
      }`}
    >
      {/* Top row: question number + category badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-inkMuted">
          Question {index + 1} of {total}
        </span>
        <span
          className={`inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest border rounded-sm ${cat.bg} ${cat.text} ${cat.border}`}
        >
          {question.category}
        </span>
      </div>

      {/* Question text */}
      <p className="font-display italic text-[16px] leading-snug tracking-tightest text-ink">
        {question.question}
      </p>

      {/* Context */}
      {question.context && (
        <p className="mt-2 text-[12px] text-inkMuted leading-relaxed">
          {question.context}
        </p>
      )}

      {/* Duration indicator */}
      <div className="mt-3 flex items-center gap-1.5">
        <svg
          className="w-3 h-3 text-inkMuted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="text-[11px] font-mono text-inkMuted">
          {question.max_duration_seconds}s max
        </span>
      </div>
    </div>
  );
}
