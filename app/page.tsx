import Link from "next/link";
import { TALENTS, COHORTS, VERTICALS } from "@/lib/data";
import { StatBlock, TierBadge, VerticalPill, AvailabilityDot, SectionHeader } from "@/components/UI";
import AIAgentsSection from "@/components/AIAgentsSection";

export default function Home() {
  const total = TALENTS.length;
  const available = TALENTS.filter((t) => t.availability === "Available").length;
  const principal = TALENTS.filter((t) => t.tier === "Principal" || t.tier === "Operator").length;
  const liveCohort = COHORTS.find((c) => c.status === "Live");

  // Vertical coverage counts
  const coverage = VERTICALS.map((v) => ({
    v,
    count: TALENTS.filter((t) => t.verticals.includes(v)).length,
  }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const maxCoverage = Math.max(...coverage.map((c) => c.count));

  return (
    <div className="px-8 py-10 max-w-[1400px] mx-auto">
      {/* Hero */}
      <section className="slide-in">
        <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-rust mb-4">
          Mar 24 · Intelligence Briefing
        </div>
        <h1 className="font-display text-[64px] leading-[0.95] tracking-tightest text-ink max-w-3xl">
          Deep tech talent,{" "}
          <span className="italic font-light text-rust">mapped across</span> the continent.
        </h1>
        <p className="mt-5 text-[16px] text-inkSoft max-w-2xl leading-relaxed">
          Wokkah operates a continuously-assessed pool of African deep tech engineers, evaluated
          through intensive wokkahthons, industry-tagged, and indexed against live problem
          statements.
        </p>
      </section>

      {/* Stats */}
      <section className="mt-12 grid grid-cols-4 gap-0 border-t border-l border-rule">
        <div className="border-r border-b border-rule">
          <StatBlock label="Pool Size" value={String(total)} delta="+3 this cohort" sub="verified operators" />
        </div>
        <div className="border-r border-b border-rule">
          <StatBlock label="Available" value={String(available)} delta="ready to place" sub={`of ${total} total`} />
        </div>
        <div className="border-r border-b border-rule">
          <StatBlock label="Operator+ Tier" value={String(principal)} delta="Principal & Operator" sub="highest assessed band" />
        </div>
        <div className="border-b border-rule">
          <StatBlock label="Verticals" value={String(VERTICALS.length)} sub="covered across pool" />
        </div>
      </section>

      {/* Two column */}
      <section className="mt-14 grid grid-cols-3 gap-10">
        {/* Left: Vertical coverage */}
        <div className="col-span-2">
          <SectionHeader
            eyebrow="01 · Coverage"
            title="Where the depth lies."
            description="Pool distribution across deep tech verticals. Coverage reflects primary and secondary specializations, weighted by operator tier."
          />
          <div className="mt-8 border-t border-rule">
            {coverage.map((c, i) => (
              <div
                key={c.v}
                className="grid grid-cols-12 gap-4 items-center py-4 border-b border-rule"
              >
                <div className="col-span-1 font-mono text-[11px] text-inkMuted num">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-4 font-display text-[18px] tracking-tight text-ink">
                  {c.v}
                </div>
                <div className="col-span-6">
                  <div className="h-2 bg-ruleSoft">
                    <div
                      className="h-full bg-ink"
                      style={{ width: `${(c.count / maxCoverage) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="col-span-1 text-right font-mono text-[14px] text-ink num">
                  {c.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live cohort */}
        <div>
          <SectionHeader eyebrow="02 · Live" title="Current cohort." />
          {liveCohort && (
            <div className="mt-8 border border-rule bg-paperDark/40 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-leaf pulse-dot" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-leaf">
                  In Progress · Week 3/4
                </span>
              </div>
              <div className="font-display text-[24px] tracking-tight text-ink leading-tight">
                {liveCohort.name}
              </div>
              <div className="text-[12px] font-mono text-inkMuted mt-1">{liveCohort.window}</div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-[11px] text-inkMuted mb-1">
                    <span>Agents built (target 20)</span>
                    <span className="font-mono num">
                      {liveCohort.agentsActual}/{liveCohort.agentsTarget}
                    </span>
                  </div>
                  <div className="h-1.5 bg-paper">
                    <div
                      className="h-full bg-rust"
                      style={{ width: `${(liveCohort.agentsActual / liveCohort.agentsTarget) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] text-inkMuted mb-1">
                    <span>Active participants</span>
                    <span className="font-mono num">
                      {liveCohort.active}/{liveCohort.enrolled}
                    </span>
                  </div>
                  <div className="h-1.5 bg-paper">
                    <div
                      className="h-full bg-teal"
                      style={{ width: `${(liveCohort.active / liveCohort.enrolled) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-rule">
                <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-2">
                  Vertical focus
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {liveCohort.verticalFocus.map((v) => (
                    <VerticalPill key={v} v={v} />
                  ))}
                </div>
                {liveCohort.partner && (
                  <div className="mt-4 text-[12px] text-inkSoft">
                    Partner · <span className="text-ink">{liveCohort.partner}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recently advanced */}
      <section className="mt-16">
        <div className="flex items-end justify-between">
          <SectionHeader
            eyebrow="03 · Pipeline"
            title="Recently advanced."
            description="Operators who cleared the last wokkahthon and are available for placement."
          />
          <Link
            href="/talent"
            className="text-[12px] font-mono uppercase tracking-widest text-rust hover:text-ink"
          >
            View full pool →
          </Link>
        </div>

        <div className="mt-8 border border-rule">
          <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-paperDark/50 border-b border-rule text-[10px] font-mono uppercase tracking-widest text-inkMuted">
            <div className="col-span-1">ID</div>
            <div className="col-span-3">Name · Location</div>
            <div className="col-span-4">Specialization</div>
            <div className="col-span-1 text-center">Tier</div>
            <div className="col-span-1 text-center">Agents</div>
            <div className="col-span-1 text-center">Complete</div>
            <div className="col-span-1 text-right">Status</div>
          </div>
          {TALENTS.slice(0, 6).map((t) => (
            <Link
              key={t.id}
              href={`/talent/${t.id}`}
              className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-rule last:border-0 items-center hover:bg-paperDark/30 transition-colors"
            >
              <div className="col-span-1 font-mono text-[11px] text-inkMuted">{t.id}</div>
              <div className="col-span-3">
                <div className="text-[14px] text-ink">{t.name}</div>
                <div className="text-[11px] text-inkMuted mt-0.5">
                  {t.flag} {t.city}, {t.country}
                </div>
              </div>
              <div className="col-span-4 text-[13px] text-inkSoft truncate">{t.headline}</div>
              <div className="col-span-1 flex justify-center">
                <TierBadge tier={t.tier} />
              </div>
              <div className="col-span-1 text-center font-mono text-[13px] text-ink num">
                {t.agentsBuilt}
              </div>
              <div className="col-span-1 text-center font-mono text-[13px] text-ink num">
                {t.completionRate}%
              </div>
              <div className="col-span-1 flex justify-end">
                <AvailabilityDot a={t.availability} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AI Agents */}
      <AIAgentsSection />

      {/* Footer strip */}
      <footer className="mt-24 pt-8 border-t border-rule flex justify-between text-[11px] font-mono text-inkMuted uppercase tracking-widest">
        <span>Wokkah · Talent Intelligence v0.3</span>
        <span>Simulated Environment · Demo Data</span>
      </footer>
    </div>
  );
}
