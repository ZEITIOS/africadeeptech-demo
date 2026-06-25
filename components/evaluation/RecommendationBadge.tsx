import type { Recommendation } from "@/lib/types";

const styles: Record<Recommendation, string> = {
  Advance: "bg-leafSoft text-leaf border-leaf",
  Review: "bg-goldSoft text-gold border-gold",
  Reject: "bg-rustSoft text-rustDeep border-rust",
};

export default function RecommendationBadge({
  recommendation,
}: {
  recommendation: Recommendation;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest border rounded-full ${styles[recommendation]}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {recommendation}
    </span>
  );
}
