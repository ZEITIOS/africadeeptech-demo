"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { TALENTS, VERTICALS, TIERS } from "@/lib/data";
import { TierBadge, VerticalPill, AvailabilityDot, SectionHeader } from "@/components/UI";

export default function TalentPool() {
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState<string | null>(null);
  const [vertical, setVertical] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return TALENTS.filter((t) => {
      if (tier && t.tier !== tier) return false;
      if (vertical && !t.verticals.includes(vertical as any)) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = (
          t.name +
          t.city +
          t.country +
          t.headline +
          t.skills.map((s) => s.skill).join(" ")
        ).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [search, tier, vertical]);

  return (
    <div className="px-8 py-10 max-w-[1400px] mx-auto">
      <SectionHeader
        eyebrow="Talent Pool · Live Index"
        title="The full operator roster."
        description="Browse Wokkah's pool of assessed deep tech operators. Each record reflects wokkahthon performance, shipped projects and ongoing availability signals."
      />

      <div className="mt-10 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[260px]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-2">
            Search
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, city, skill, or project..."
            className="w-full border-b border-ink bg-transparent py-2 text-[15px] outline-none placeholder:text-inkMuted"
          />
        </div>

        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-2">
            Tier
          </div>
          <div className="flex gap-1.5">
            <FilterChip active={tier === null} onClick={() => setTier(null)}>
              All
            </FilterChip>
            {TIERS.map((t) => (
              <FilterChip key={t} active={tier === t} onClick={() => setTier(t)}>
                {t}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-2">
          Vertical
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <FilterChip active={vertical === null} onClick={() => setVertical(null)}>
            All
          </FilterChip>
          {VERTICALS.map((v) => (
            <FilterChip key={v} active={vertical === v} onClick={() => setVertical(v)}>
              {v}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-baseline justify-between">
        <div className="font-mono text-[11px] uppercase tracking-widest text-inkMuted">
          {filtered.length} of {TALENTS.length} shown
        </div>
        <div className="text-[11px] font-mono text-inkMuted">
          Sorted by Tier · Completion Rate
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {filtered
          .sort((a, b) => {
            const tierOrder = { Principal: 0, Operator: 1, Builder: 2, Apprentice: 3 };
            if (tierOrder[a.tier] !== tierOrder[b.tier]) {
              return tierOrder[a.tier] - tierOrder[b.tier];
            }
            return b.completionRate - a.completionRate;
          })
          .map((t) => (
            <Link
              key={t.id}
              href={`/talent/${t.id}`}
              className="group border border-rule bg-paper p-5 hover:border-ink transition-all slide-in"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[10px] text-inkMuted">{t.id}</span>
                    <TierBadge tier={t.tier} />
                  </div>
                  <div className="font-display text-[22px] tracking-tight text-ink leading-tight truncate">
                    {t.name}
                  </div>
                  <div className="text-[12px] text-inkMuted mt-1">
                    {t.flag} {t.city}, {t.country} · {t.yearsExp}y exp
                  </div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="font-display text-[28px] leading-none text-ink num">
                    {t.completionRate}
                  </div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-inkMuted mt-1">
                    % complete
                  </div>
                </div>
              </div>

              <div className="mt-3 text-[13px] text-inkSoft leading-snug line-clamp-2">
                {t.headline}
              </div>

              <div className="mt-4 flex flex-wrap gap-1">
                {t.verticals.map((v) => (
                  <VerticalPill key={v} v={v} />
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-rule flex items-center justify-between">
                <AvailabilityDot a={t.availability} />
                <div className="font-mono text-[11px] text-inkMuted">{t.rate}</div>
              </div>
            </Link>
          ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 p-16 border border-dashed border-rule text-center">
          <div className="font-display text-[24px] text-inkSoft italic">No operators match.</div>
          <div className="text-[12px] text-inkMuted mt-2">Loosen your filters or clear the search.</div>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-[11px] px-2.5 py-1 border rounded-sm transition-colors ${
        active
          ? "bg-ink text-paper border-ink"
          : "bg-transparent text-inkSoft border-rule hover:border-ink"
      }`}
    >
      {children}
    </button>
  );
}
