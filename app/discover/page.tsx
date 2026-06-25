"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { matchTalents, TIERS, AVAILABILITIES, VERTICALS } from "@/lib/data";
import { TierBadge, VerticalPill, AvailabilityDot, SectionHeader } from "@/components/UI";

const PRESETS = [
  {
    label: "Border surveillance drone",
    text: "We need to deploy a small UAV swarm for border surveillance with onboard object detection. Target: real-time person and vehicle classification on low-power hardware, operating in poor connectivity.",
  },
  {
    label: "Mini-grid optimization",
    text: "Build a forecasting and dispatch model for a rural mini-grid running solar + diesel + battery. Must reduce diesel consumption while keeping lights-on reliability above 99%. SCADA integration required.",
  },
  {
    label: "Sickle-cell screening",
    text: "We want a clinical ML tool that screens sickle-cell variants from genomic data collected across 4 East African referral hospitals. Needs proper data governance and validated variant calling.",
  },
  {
    label: "Offline crop disease app",
    text: "Build an Android app that classifies crop diseases on-device for rural farmers with no internet. Model must be under 5MB, work on entry-level handsets, and support 6 local languages.",
  },
  {
    label: "Chip design partner",
    text: "We're taping out a low-power edge AI accelerator in a 130nm open process. Need a Verilog / DSP engineer with ASIC-flow experience and timing-closure chops.",
  },
];

export default function Discover() {
  const [query, setQuery] = useState("");
  const [activeTiers, setActiveTiers] = useState<string[]>([]);
  const [activeAvail, setActiveAvail] = useState<string[]>([]);
  const [activeVerts, setActiveVerts] = useState<string[]>([]);
  const [searched, setSearched] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return matchTalents(query, {
      tier: activeTiers,
      availability: activeAvail,
      verticals: activeVerts,
    }).slice(0, 8);
  }, [query, activeTiers, activeAvail, activeVerts]);

  function toggle(list: string[], set: (v: string[]) => void, val: string) {
    set(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);
  }

  function run() {
    setSearched(true);
  }

  function usePreset(text: string) {
    setQuery(text);
    setSearched(true);
  }

  return (
    <div className="px-8 py-10 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="slide-in">
        <SectionHeader
          eyebrow="Discover · AI-assisted matching"
          title={"Describe the problem.\nWe'll route the talent."}
          description="Wokkah parses problem statements against the full pool — assessed skills, shipped projects, wokkahthon industry tags and availability — and returns ranked matches with the reasoning made legible."
        />
      </div>

      {/* Search box */}
      <div className="mt-12 border border-ink bg-paper">
        <div className="px-6 pt-5 flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-inkMuted">
            Problem statement
          </span>
          <span className="text-[10px] font-mono text-inkMuted num">
            {query.length}/600
          </span>
        </div>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value.slice(0, 600))}
          placeholder="e.g. We're building a drone-based border surveillance system and need on-device person detection in low-bandwidth environments..."
          className="w-full px-6 pt-3 pb-6 bg-transparent resize-none outline-none text-[17px] leading-relaxed text-ink placeholder:text-inkMuted font-sans"
          rows={4}
        />
        <div className="border-t border-rule px-6 py-3 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => usePreset(p.text)}
                className="text-[11px] px-2.5 py-1 border border-rule text-inkSoft hover:border-ink hover:text-ink transition-colors rounded-sm"
              >
                {p.label}
              </button>
            ))}
          </div>
          <button
            onClick={run}
            disabled={!query.trim()}
            className="ml-4 px-5 py-2 bg-ink text-paper text-[12px] font-mono uppercase tracking-widest hover:bg-rust transition-colors disabled:opacity-40 disabled:cursor-not-allowed rounded-sm"
          >
            Match Talent →
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex gap-8 flex-wrap">
        <FilterGroup
          label="Tier"
          options={TIERS as unknown as string[]}
          active={activeTiers}
          onToggle={(v) => toggle(activeTiers, setActiveTiers, v)}
        />
        <FilterGroup
          label="Availability"
          options={AVAILABILITIES as unknown as string[]}
          active={activeAvail}
          onToggle={(v) => toggle(activeAvail, setActiveAvail, v)}
        />
        <FilterGroup
          label="Vertical"
          options={VERTICALS}
          active={activeVerts}
          onToggle={(v) => toggle(activeVerts, setActiveVerts, v)}
        />
      </div>

      {/* Results */}
      <div className="mt-12">
        {searched && query.trim() && (
          <>
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
                  {results.length > 0 ? `${results.length} matches ranked` : "No strong matches"}
                </div>
                <div className="font-display text-[28px] tracking-tight text-ink mt-1">
                  Ranked by fit, assessment, and availability
                </div>
              </div>
              <div className="text-[11px] font-mono text-inkMuted">
                Matched in {(Math.random() * 0.4 + 0.2).toFixed(2)}s
              </div>
            </div>

            {results.length === 0 && (
              <div className="border border-rule p-12 text-center bg-paperDark/30">
                <p className="font-display text-[22px] text-inkSoft">
                  No ranked matches above threshold.
                </p>
                <p className="text-[13px] text-inkMuted mt-2">
                  Try loosening tier or availability filters, or rephrase the problem with more technical context.
                </p>
              </div>
            )}

            <div className="space-y-3">
              {results.map((r, i) => (
                <MatchRow key={r.talent.id} rank={i + 1} result={r} />
              ))}
            </div>
          </>
        )}

        {!searched && (
          <div className="border border-dashed border-rule p-16 text-center">
            <div className="font-display text-[32px] text-ink tracking-tightest italic font-light">
              Start with a problem.
            </div>
            <div className="mt-3 text-[13px] text-inkMuted max-w-md mx-auto">
              Paste a problem statement above — or pick one of the preset scenarios — to see
              Wokkah's matching pass.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  options,
  active,
  onToggle,
}: {
  label: string;
  options: string[];
  active: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-2">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const isActive = active.includes(o);
          return (
            <button
              key={o}
              onClick={() => onToggle(o)}
              className={`text-[11px] px-2.5 py-1 border rounded-sm transition-colors ${
                isActive
                  ? "bg-ink text-paper border-ink"
                  : "bg-transparent text-inkSoft border-rule hover:border-ink"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MatchRow({ rank, result }: { rank: number; result: ReturnType<typeof matchTalents>[number] }) {
  const { talent, score, reasons } = result;
  return (
    <Link
      href={`/talent/${talent.id}`}
      className="group block border border-rule bg-paper hover:border-ink transition-all slide-in"
    >
      <div className="grid grid-cols-12 gap-6 p-6 items-center">
        {/* Rank + score */}
        <div className="col-span-1">
          <div className="font-mono text-[11px] text-inkMuted">#{String(rank).padStart(2, "0")}</div>
          <div className="mt-2 font-display text-[32px] leading-none tracking-tightest text-ink num">
            {score}
          </div>
          <div className="text-[9px] font-mono uppercase tracking-widest text-inkMuted mt-1">
            fit score
          </div>
        </div>

        {/* Identity */}
        <div className="col-span-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-inkMuted">{talent.id}</span>
            <TierBadge tier={talent.tier} />
          </div>
          <div className="font-display text-[22px] tracking-tight text-ink leading-tight">
            {talent.name}
          </div>
          <div className="text-[12px] text-inkMuted mt-1">
            {talent.flag} {talent.city}, {talent.country}
          </div>
          <div className="mt-2">
            <AvailabilityDot a={talent.availability} />
          </div>
        </div>

        {/* Reasoning */}
        <div className="col-span-6">
          <div className="text-[10px] font-mono uppercase tracking-widest text-rust mb-2">
            Why this match
          </div>
          <ul className="space-y-1">
            {reasons.length > 0 ? reasons.map((r, i) => (
              <li key={i} className="text-[13px] text-inkSoft flex gap-2">
                <span className="text-rust">→</span>
                <span>{r}</span>
              </li>
            )) : (
              <li className="text-[13px] text-inkMuted italic">
                General tier match · no specific technical signals detected
              </li>
            )}
          </ul>
          <div className="mt-3 flex flex-wrap gap-1">
            {talent.verticals.slice(0, 3).map((v) => (
              <VerticalPill key={v} v={v} />
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="col-span-2 text-right">
          <div className="text-[11px] font-mono text-inkMuted uppercase tracking-widest">Rate</div>
          <div className="font-mono text-[13px] text-ink mt-1">{talent.rate}</div>
          <div className="mt-4 text-[11px] font-mono text-inkMuted uppercase tracking-widest">
            Completion
          </div>
          <div className="font-mono text-[13px] text-ink mt-1 num">{talent.completionRate}%</div>
          <div className="mt-4 text-[11px] text-rust font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            View profile →
          </div>
        </div>
      </div>
    </Link>
  );
}
