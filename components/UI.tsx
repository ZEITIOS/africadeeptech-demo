import { Tier, Vertical, Availability } from "@/lib/types";

export function TierBadge({ tier }: { tier: Tier }) {
  const styles: Record<Tier, string> = {
    Apprentice: "bg-paperDark text-inkSoft border-rule",
    Builder: "bg-goldSoft text-gold border-gold/30",
    Operator: "bg-tealSoft text-teal border-teal/30",
    Principal: "bg-rustSoft text-rustDeep border-rust/40",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest border rounded-sm ${styles[tier]}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {tier}
    </span>
  );
}

export function VerticalPill({ v }: { v: Vertical }) {
  return (
    <span className="inline-block px-2 py-0.5 text-[11px] bg-paperDark text-inkSoft border border-rule rounded-sm">
      {v}
    </span>
  );
}

export function AvailabilityDot({ a }: { a: Availability }) {
  const map: Record<Availability, { color: string; label: string }> = {
    Available: { color: "bg-leaf", label: "Available" },
    Partial: { color: "bg-gold", label: "Partial" },
    Engaged: { color: "bg-inkMuted", label: "Engaged" },
    "On Leave": { color: "bg-rule", label: "On Leave" },
  };
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] text-inkSoft">
      <span className={`h-1.5 w-1.5 rounded-full ${map[a].color}`} />
      {map[a].label}
    </span>
  );
}

export function SkillBar({ skill, score }: { skill: string; score: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-[12px] text-ink">{skill}</span>
        <span className="text-[11px] font-mono text-inkMuted num">{score}</span>
      </div>
      <div className="h-1 bg-ruleSoft rounded-full overflow-hidden">
        <div
          className="h-full bg-ink"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : ""}>
      {eyebrow && (
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-rust mb-3">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-[38px] leading-[1.05] tracking-tightest text-ink">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[15px] text-inkSoft max-w-2xl">{description}</p>
      )}
    </div>
  );
}

export function StatBlock({
  label,
  value,
  delta,
  sub,
}: {
  label: string;
  value: string;
  delta?: string;
  sub?: string;
}) {
  return (
    <div className="border border-rule bg-paper/60 p-5">
      <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted">{label}</div>
      <div className="mt-3 font-display text-[40px] leading-none tracking-tightest text-ink num">
        {value}
      </div>
      <div className="mt-3 flex items-center gap-3 text-[11px]">
        {delta && <span className="font-mono text-leaf">{delta}</span>}
        {sub && <span className="text-inkMuted">{sub}</span>}
      </div>
    </div>
  );
}
