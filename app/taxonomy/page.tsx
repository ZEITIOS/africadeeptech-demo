import Link from "next/link";
import { TALENTS, VERTICALS } from "@/lib/data";
import { SectionHeader, TierBadge } from "@/components/UI";

export default function Taxonomy() {
  // Build skill -> talents map
  const skillMap = new Map<string, { talents: typeof TALENTS; avg: number }>();
  for (const t of TALENTS) {
    for (const s of t.skills) {
      if (!skillMap.has(s.skill)) {
        skillMap.set(s.skill, { talents: [], avg: 0 });
      }
      const entry = skillMap.get(s.skill)!;
      entry.talents.push(t);
    }
  }
  for (const [skill, entry] of skillMap) {
    const scores = entry.talents.flatMap((t) =>
      t.skills.filter((s) => s.skill === skill).map((s) => s.score)
    );
    entry.avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }

  const skillsByVertical: Record<string, { skill: string; count: number; avg: number }[]> = {};
  VERTICALS.forEach((v) => {
    const verticalTalents = TALENTS.filter((t) => t.verticals.includes(v));
    const skillCounts = new Map<string, { count: number; total: number }>();
    for (const t of verticalTalents) {
      for (const s of t.skills) {
        const existing = skillCounts.get(s.skill) || { count: 0, total: 0 };
        skillCounts.set(s.skill, {
          count: existing.count + 1,
          total: existing.total + s.score,
        });
      }
    }
    skillsByVertical[v] = Array.from(skillCounts.entries())
      .map(([skill, { count, total }]) => ({
        skill,
        count,
        avg: Math.round(total / count),
      }))
      .sort((a, b) => b.count - a.count || b.avg - a.avg);
  });

  const populated = VERTICALS.filter((v) => skillsByVertical[v].length > 0);

  return (
    <div className="px-8 py-10 max-w-[1400px] mx-auto">
      <SectionHeader
        eyebrow="Pipeline · Taxonomy"
        title="The skill graph."
        description="Every operator is tagged against a structured skill taxonomy — what they can do, how deep, and in which verticals. This is what Discover queries against."
      />

      {/* Legend */}
      <div className="mt-10 flex gap-6 items-center text-[11px] text-inkMuted font-mono uppercase tracking-widest">
        <span>Legend:</span>
        <span className="flex items-center gap-2">
          <span className="font-display text-[13px] text-ink num normal-case">N</span>
          <span>talents</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-16 h-1 bg-ink" />
          <span>avg score</span>
        </span>
      </div>

      {/* Per vertical blocks */}
      <div className="mt-10 grid grid-cols-2 gap-10">
        {populated.map((v, idx) => {
          const verticalTalents = TALENTS.filter((t) => t.verticals.includes(v));
          const skills = skillsByVertical[v];
          return (
            <div key={v} className="slide-in" style={{ animationDelay: `${idx * 50}ms` }}>
              <div className="flex items-baseline justify-between border-b border-ink pb-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-rust">
                    {String(idx + 1).padStart(2, "0")} · Vertical
                  </div>
                  <h3 className="font-display text-[28px] tracking-tightest text-ink leading-tight mt-1">
                    {v}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="font-display text-[32px] leading-none text-ink num">
                    {verticalTalents.length}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mt-1">
                    operators
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-4 space-y-2.5">
                {skills.slice(0, 6).map((s) => (
                  <div key={s.skill} className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-6 text-[13px] text-ink truncate">{s.skill}</div>
                    <div className="col-span-1 font-mono text-[11px] text-inkMuted text-right num">
                      {s.count}
                    </div>
                    <div className="col-span-4">
                      <div className="h-1 bg-ruleSoft">
                        <div className="h-full bg-ink" style={{ width: `${s.avg}%` }} />
                      </div>
                    </div>
                    <div className="col-span-1 font-mono text-[11px] text-ink text-right num">
                      {s.avg}
                    </div>
                  </div>
                ))}
              </div>

              {/* Operator tier composition */}
              <div className="mt-4 pt-3 border-t border-rule flex gap-3 items-center">
                {(["Principal", "Operator", "Builder", "Apprentice"] as const).map((tier) => {
                  const count = verticalTalents.filter((t) => t.tier === tier).length;
                  if (count === 0) return null;
                  return (
                    <div key={tier} className="flex items-center gap-1.5">
                      <TierBadge tier={tier} />
                      <span className="font-mono text-[11px] text-inkMuted num">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Representative operators section */}
      <section className="mt-20 pt-10 border-t border-rule">
        <SectionHeader
          eyebrow="Representative operators"
          title="Top signal per vertical."
          description="The highest-tier, highest-completion operator currently indexed in each vertical."
        />
        <div className="mt-8 grid grid-cols-3 gap-4">
          {populated.slice(0, 9).map((v) => {
            const rep = TALENTS.filter((t) => t.verticals.includes(v))
              .sort((a, b) => {
                const tierOrder = { Principal: 0, Operator: 1, Builder: 2, Apprentice: 3 };
                if (tierOrder[a.tier] !== tierOrder[b.tier]) {
                  return tierOrder[a.tier] - tierOrder[b.tier];
                }
                return b.completionRate - a.completionRate;
              })[0];
            if (!rep) return null;
            return (
              <Link
                key={v}
                href={`/talent/${rep.id}`}
                className="border border-rule p-5 bg-paper hover:border-ink transition-colors"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-rust mb-2">
                  {v}
                </div>
                <div className="font-display text-[20px] tracking-tight text-ink leading-tight">
                  {rep.name}
                </div>
                <div className="text-[11px] text-inkMuted mt-1">
                  {rep.flag} {rep.city}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <TierBadge tier={rep.tier} />
                  <span className="font-mono text-[11px] text-inkSoft num">
                    {rep.completionRate}%
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="mt-20 pt-6 border-t border-rule flex justify-between text-[11px] font-mono text-inkMuted uppercase tracking-widest">
        <span>Wokkah · {skillMap.size} distinct skills indexed</span>
        <span>Simulated Environment · Demo Data</span>
      </footer>
    </div>
  );
}
