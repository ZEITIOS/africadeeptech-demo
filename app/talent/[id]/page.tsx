import { notFound } from "next/navigation";
import Link from "next/link";
import { getTalent, TALENTS } from "@/lib/data";
import { TierBadge, VerticalPill, AvailabilityDot, SkillBar } from "@/components/UI";

export function generateStaticParams() {
  return TALENTS.map((t) => ({ id: t.id }));
}

export default function TalentProfile({ params }: { params: { id: string } }) {
  const t = getTalent(params.id);
  if (!t) return notFound();

  // Skill radar geometry
  const skillsForRadar = t.skills.slice(0, 6);
  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 24;
  const angleStep = (2 * Math.PI) / skillsForRadar.length;

  const polygonPoints = skillsForRadar
    .map((s, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const r = (s.score / 100) * radius;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(" ");

  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div className="px-8 py-10 max-w-[1400px] mx-auto">
      {/* Back link */}
      <Link
        href="/talent"
        className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-inkMuted hover:text-ink transition-colors mb-8"
      >
        ← Back to pool
      </Link>

      {/* Header */}
      <section className="slide-in grid grid-cols-12 gap-10">
        <div className="col-span-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-[11px] text-inkMuted">{t.id}</span>
            <TierBadge tier={t.tier} />
            <AvailabilityDot a={t.availability} />
          </div>
          <h1 className="font-display text-[56px] leading-[0.95] tracking-tightest text-ink">
            {t.name}
          </h1>
          <p className="mt-4 text-[18px] text-inkSoft leading-relaxed max-w-2xl">{t.headline}</p>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-[13px] text-inkSoft">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-inkMuted block mb-1">
                Location
              </span>
              {t.flag} {t.city}, {t.country}
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-inkMuted block mb-1">
                Experience
              </span>
              {t.yearsExp} years
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-inkMuted block mb-1">
                Rate band
              </span>
              <span className="font-mono">{t.rate}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-inkMuted block mb-1">
                Availability
              </span>
              {t.availabilityDetail}
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-inkMuted block mb-1">
                Languages
              </span>
              {t.spokenLanguages.join(" · ")}
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-inkMuted block mb-1">
                GitHub
              </span>
              <span className="font-mono">@{t.githubHandle}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {t.verticals.map((v) => (
              <VerticalPill key={v} v={v} />
            ))}
          </div>
        </div>

        {/* Metrics stack */}
        <div className="col-span-4 border border-rule bg-paperDark/40">
          <div className="p-5 border-b border-rule">
            <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted">
              Completion rate
            </div>
            <div className="mt-2 font-display text-[56px] leading-none tracking-tightest text-ink num">
              {t.completionRate}
              <span className="text-[28px] text-inkMuted">%</span>
            </div>
            <div className="text-[11px] text-inkMuted mt-1">across all assigned work</div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-rule border-b border-rule">
            <div className="p-5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted">
                Agents built
              </div>
              <div className="mt-1 font-display text-[28px] text-ink num">{t.agentsBuilt}</div>
            </div>
            <div className="p-5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted">
                Hours logged
              </div>
              <div className="mt-1 font-display text-[28px] text-ink num">{t.hoursLogged}</div>
            </div>
          </div>
          <div className="p-5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-2">
              Joined Wokkah
            </div>
            <div className="font-mono text-[13px] text-ink">{t.joined}</div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10">
        <div className="col-span-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-rust">01 · Bio</div>
        </div>
        <div className="col-span-9">
          <p className="font-display text-[22px] leading-[1.4] tracking-tight text-ink italic font-light max-w-2xl">
            "{t.bio}"
          </p>
        </div>
      </section>

      {/* Skills + Radar */}
      <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10">
        <div className="col-span-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
            02 · Assessed skills
          </div>
          <p className="mt-3 text-[12px] text-inkMuted leading-relaxed">
            Scored via wokkahthon projects, code review, and industry-tagged output. Updated each cohort.
          </p>
        </div>
        <div className="col-span-5 space-y-4">
          {t.skills.map((s) => (
            <SkillBar key={s.skill} skill={s.skill} score={s.score} />
          ))}
        </div>
        <div className="col-span-4 flex items-center justify-center">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Grid rings */}
            {gridLevels.map((lvl) => (
              <polygon
                key={lvl}
                points={skillsForRadar
                  .map((_, i) => {
                    const angle = i * angleStep - Math.PI / 2;
                    const r = lvl * radius;
                    const x = cx + r * Math.cos(angle);
                    const y = cy + r * Math.sin(angle);
                    return `${x},${y}`;
                  })
                  .join(" ")}
                fill="none"
                stroke="#E4DED0"
                strokeWidth="1"
              />
            ))}
            {/* Axes */}
            {skillsForRadar.map((_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const x = cx + radius * Math.cos(angle);
              const y = cy + radius * Math.sin(angle);
              return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#ECE7DA" strokeWidth="1" />;
            })}
            {/* Skill polygon */}
            <polygon
              points={polygonPoints}
              fill="#B04A1D"
              fillOpacity="0.15"
              stroke="#B04A1D"
              strokeWidth="1.5"
            />
            {/* Dots */}
            {skillsForRadar.map((s, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const r = (s.score / 100) * radius;
              const x = cx + r * Math.cos(angle);
              const y = cy + r * Math.sin(angle);
              return <circle key={i} cx={x} cy={y} r="3" fill="#B04A1D" />;
            })}
          </svg>
        </div>
      </section>

      {/* Wokkahthons */}
      <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10">
        <div className="col-span-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
            03 · Wokkahthon history
          </div>
          <p className="mt-3 text-[12px] text-inkMuted leading-relaxed">
            Each cohort: agents built, completion rate, industry focus, and advancement verdict.
          </p>
        </div>
        <div className="col-span-9">
          <div className="border border-rule">
            <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-paperDark/50 border-b border-rule text-[10px] font-mono uppercase tracking-widest text-inkMuted">
              <div className="col-span-3">Cohort</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-3">Industry</div>
              <div className="col-span-1 text-center">Agents</div>
              <div className="col-span-1 text-center">Complete</div>
              <div className="col-span-2 text-right">Verdict</div>
            </div>
            {t.wokkahthons.map((w) => (
              <div
                key={w.cohort}
                className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-rule last:border-0 items-center"
              >
                <div className="col-span-3 font-mono text-[12px] text-ink">{w.cohort}</div>
                <div className="col-span-2 text-[13px] text-inkSoft">{w.date}</div>
                <div className="col-span-3 text-[13px] text-inkSoft">{w.industry}</div>
                <div className="col-span-1 text-center font-mono text-[13px] text-ink num">
                  {w.agentsBuilt}
                </div>
                <div className="col-span-1 text-center font-mono text-[13px] text-ink num">
                  {w.completionRate}%
                </div>
                <div className="col-span-2 text-right">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-sm ${
                      w.verdict === "Advanced"
                        ? "bg-leafSoft text-leaf"
                        : w.verdict === "Pool"
                        ? "bg-goldSoft text-gold"
                        : "bg-rustSoft text-rustDeep"
                    }`}
                  >
                    {w.verdict}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mt-14 pt-10 border-t border-rule grid grid-cols-12 gap-10">
        <div className="col-span-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
            04 · Shipped projects
          </div>
          <p className="mt-3 text-[12px] text-inkMuted leading-relaxed">
            Production deployments and validated prototypes. Evidence, not claims.
          </p>
        </div>
        <div className="col-span-9 space-y-4">
          {t.projects.map((p, i) => (
            <div key={i} className="border border-rule p-6 bg-paper">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-inkMuted mb-2">
                    {String(i + 1).padStart(2, "0")} · {p.role}
                  </div>
                  <div className="font-display text-[24px] tracking-tight text-ink leading-tight">
                    {p.title}
                  </div>
                  <p className="mt-3 text-[14px] text-inkSoft leading-relaxed">{p.outcome}</p>
                </div>
                <VerticalPill v={p.vertical} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA row */}
      <section className="mt-16 pt-10 border-t border-rule flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-rust mb-2">
            Engagement
          </div>
          <div className="font-display text-[28px] tracking-tight text-ink">
            Wokkah routes the work · you get the outcome.
          </div>
          <p className="text-[13px] text-inkSoft mt-2 max-w-xl">
            Engagements are contracted with Wokkah, not the individual. Completion guarantees
            available on project-scoped work.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 border border-ink text-ink text-[12px] font-mono uppercase tracking-widest hover:bg-paperDark transition-colors">
            Request intro
          </button>
          <button className="px-5 py-2.5 bg-ink text-paper text-[12px] font-mono uppercase tracking-widest hover:bg-rust transition-colors">
            Scope engagement →
          </button>
        </div>
      </section>

      <footer className="mt-20 pt-6 border-t border-rule flex justify-between text-[11px] font-mono text-inkMuted uppercase tracking-widest">
        <span>Wokkah · Talent Intelligence v0.3</span>
        <span>Simulated Environment · Demo Data</span>
      </footer>
    </div>
  );
}
