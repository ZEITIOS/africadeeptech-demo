import { COHORTS, TALENTS } from "@/lib/data";
import { VerticalPill, SectionHeader } from "@/components/UI";

export default function Wokkahthons() {
  const live = COHORTS.find((c) => c.status === "Live");
  const past = COHORTS.filter((c) => c.status === "Closed");

  // Generate a faux daily-agent build histogram for the live cohort
  const days = Array.from({ length: 20 }, (_, i) => {
    const dayNum = i + 1;
    const planned = 1;
    const actual = dayNum <= 14 ? (Math.random() > 0.15 ? 1 : 0) : 0;
    return { day: dayNum, planned, actual };
  });

  return (
    <div className="px-8 py-10 max-w-[1400px] mx-auto">
      <SectionHeader
        eyebrow="Pipeline · Wokkahthons"
        title="Assessment in motion."
        description="Wokkahthons are 4-week, high-intensity cohorts where operators ship one agent per day across a rotating industry focus. Performance here sets pool tier."
      />

      {/* Live cohort hero */}
      {live && (
        <section className="mt-12 border border-ink bg-paper">
          <div className="grid grid-cols-12">
            <div className="col-span-8 p-8 border-r border-rule">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-leaf pulse-dot" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-leaf">
                  Live · Week 3 of 4
                </span>
              </div>
              <div className="font-mono text-[11px] text-inkMuted mb-2">{live.id}</div>
              <h2 className="font-display text-[40px] leading-[1.05] tracking-tightest text-ink">
                {live.name}
              </h2>
              <div className="mt-2 font-mono text-[12px] text-inkMuted">{live.window}</div>

              {/* Daily build histogram */}
              <div className="mt-8">
                <div className="flex justify-between items-baseline mb-3">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted">
                    Daily agent builds (target: 1/day)
                  </div>
                  <div className="font-mono text-[11px] text-inkMuted num">
                    Day {14} / 20
                  </div>
                </div>
                <div className="flex gap-1 items-end h-20">
                  {days.map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className={`w-full ${
                          d.actual
                            ? "bg-ink"
                            : d.day <= 14
                            ? "bg-rust/30"
                            : "bg-ruleSoft"
                        }`}
                        style={{ height: d.actual ? "100%" : "20%" }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-1 mt-1">
                  {days.map((d) => (
                    <div
                      key={d.day}
                      className="flex-1 text-center font-mono text-[9px] text-inkMuted"
                    >
                      {d.day}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-rule flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 bg-ink" />
                  <span className="text-[11px] text-inkSoft">Shipped</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 bg-rust/30" />
                  <span className="text-[11px] text-inkSoft">Missed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 bg-ruleSoft" />
                  <span className="text-[11px] text-inkSoft">Upcoming</span>
                </div>
              </div>
            </div>

            <div className="col-span-4 p-8 bg-paperDark/30">
              <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted">
                Enrolled
              </div>
              <div className="font-display text-[48px] leading-none tracking-tightest text-ink num mt-2">
                {live.enrolled}
              </div>
              <div className="text-[11px] text-inkMuted mt-1">
                <span className="font-mono num">{live.active}</span> still active (
                {Math.round((live.active / live.enrolled) * 100)}%)
              </div>

              <div className="mt-8 pt-6 border-t border-rule">
                <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-2">
                  Vertical focus
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {live.verticalFocus.map((v) => (
                    <VerticalPill key={v} v={v} />
                  ))}
                </div>
              </div>

              {live.partner && (
                <div className="mt-6 pt-6 border-t border-rule">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-2">
                    Partner
                  </div>
                  <div className="font-display text-[18px] tracking-tight text-ink">
                    {live.partner}
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-rule">
                <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-2">
                  Attrition curve
                </div>
                <div className="space-y-2">
                  {[
                    { week: "W1", pct: 100 },
                    { week: "W2", pct: 88 },
                    { week: "W3", pct: 76 },
                    { week: "W4", pct: 0, future: true },
                  ].map((w) => (
                    <div key={w.week} className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-inkMuted w-6">{w.week}</span>
                      <div className="flex-1 h-1.5 bg-paper">
                        {!w.future && (
                          <div className="h-full bg-ink" style={{ width: `${w.pct}%` }} />
                        )}
                      </div>
                      <span className="font-mono text-[11px] text-inkSoft num w-8 text-right">
                        {w.future ? "—" : `${w.pct}%`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Past cohorts */}
      <section className="mt-16">
        <SectionHeader eyebrow="History" title="Past cohorts." />
        <div className="mt-8 border border-rule">
          <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-paperDark/50 border-b border-rule text-[10px] font-mono uppercase tracking-widest text-inkMuted">
            <div className="col-span-2">Cohort</div>
            <div className="col-span-3">Window</div>
            <div className="col-span-3">Focus</div>
            <div className="col-span-1 text-center">Enrolled</div>
            <div className="col-span-1 text-center">Built</div>
            <div className="col-span-2 text-right">→ Operator+</div>
          </div>
          {past.map((c) => (
            <div
              key={c.id}
              className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-rule last:border-0 items-center"
            >
              <div className="col-span-2 font-mono text-[12px] text-ink">{c.id}</div>
              <div className="col-span-3 text-[12px] text-inkSoft">{c.window}</div>
              <div className="col-span-3 flex flex-wrap gap-1">
                {c.verticalFocus.map((v) => (
                  <VerticalPill key={v} v={v} />
                ))}
              </div>
              <div className="col-span-1 text-center font-mono text-[13px] text-ink num">
                {c.enrolled}
              </div>
              <div className="col-span-1 text-center font-mono text-[13px] text-ink num">
                {c.agentsActual}/{c.agentsTarget}
              </div>
              <div className="col-span-2 text-right">
                <span className="font-mono text-[13px] text-rust num">{c.advancement}%</span>
                <span className="text-[11px] text-inkMuted ml-2">advanced</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-16 pt-10 border-t border-rule grid grid-cols-4 gap-6">
        {[
          {
            n: "01",
            title: "Intake",
            text: "Open application with coding + industry prompt. Screened for baseline.",
          },
          {
            n: "02",
            title: "Wokkahthon",
            text: "4 weeks, 1 agent per day, rotating industry scenarios. Intensive.",
          },
          {
            n: "03",
            title: "Assessment",
            text: "Code review, completion, industry fit. Verdict: Advance · Pool · Reassign.",
          },
          {
            n: "04",
            title: "Placement",
            text: "Advanced operators routed to problem statements via Discover.",
          },
        ].map((step) => (
          <div key={step.n}>
            <div className="font-mono text-[10px] uppercase tracking-widest text-rust">
              {step.n}
            </div>
            <div className="font-display text-[22px] tracking-tight text-ink mt-2">
              {step.title}
            </div>
            <p className="text-[13px] text-inkSoft mt-2 leading-relaxed">{step.text}</p>
          </div>
        ))}
      </section>

      <footer className="mt-20 pt-6 border-t border-rule flex justify-between text-[11px] font-mono text-inkMuted uppercase tracking-widest">
        <span>Wokkah · {TALENTS.length} operators across {COHORTS.length} cohorts</span>
        <span>Simulated Environment · Demo Data</span>
      </footer>
    </div>
  );
}
