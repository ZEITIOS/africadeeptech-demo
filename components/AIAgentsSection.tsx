"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { insforge } from "@/lib/insforge";
import { SectionHeader } from "@/components/UI";

export default function AIAgentsSection() {
  const [evaluatedCount, setEvaluatedCount] = useState(0);
  const [interviewCount, setInterviewCount] = useState(0);
  const [activeGrants, setActiveGrants] = useState(0);
  const [totalDisbursed, setTotalDisbursed] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [evalRes, intRes, grantRes, msRes] = await Promise.all([
          insforge.database.from("adt_evaluations").select("id", { count: "exact", head: true }),
          insforge.database
            .from("adt_interview_sessions")
            .select("id", { count: "exact", head: true })
            .eq("status", "completed"),
          insforge.database.from("adt_grants").select("*"),
          insforge.database
            .from("adt_milestones")
            .select("grant_id, amount, status")
            .eq("status", "approved"),
        ]);

        setEvaluatedCount(evalRes.count ?? 0);
        setInterviewCount(intRes.count ?? 0);

        const grants = (grantRes.data ?? []) as { id: string; status: string }[];
        setActiveGrants(grants.filter((g) => g.status === "active").length);

        const approvedMs = (msRes.data ?? []) as { amount: number }[];
        setTotalDisbursed(approvedMs.reduce((s, m) => s + m.amount, 0));
      } catch {
        // Silently fail — this is supplementary data
      } finally {
        setLoaded(true);
      }
    }

    load();
  }, []);

  if (!loaded) return null;

  return (
    <section className="mt-16">
      <SectionHeader
        eyebrow="04 · AI Agents"
        title="Intelligence pipeline."
        description="Automated evaluation, due diligence interviews, and milestone-based grant tracking powered by AI agents."
      />

      <div className="mt-8 grid grid-cols-3 gap-6">
        {/* Submission Evaluation */}
        <div className="border border-rule bg-paper/60 p-6 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-rust mb-3">
              Submission Evaluation
            </div>
            <div className="font-display text-[40px] leading-none tracking-tightest text-ink num">
              {evaluatedCount}
            </div>
            <div className="mt-2 text-[11px] text-inkMuted">submissions evaluated by AI</div>
          </div>
          <Link
            href="/evaluate"
            className="mt-6 inline-flex text-[12px] font-mono uppercase tracking-widest text-rust hover:text-ink transition-colors"
          >
            View Submissions &rarr;
          </Link>
        </div>

        {/* Due Diligence Interviews */}
        <div className="border border-rule bg-paper/60 p-6 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-teal mb-3">
              Due Diligence Interviews
            </div>
            <div className="font-display text-[40px] leading-none tracking-tightest text-ink num">
              {interviewCount}
            </div>
            <div className="mt-2 text-[11px] text-inkMuted">interviews completed</div>
          </div>
          <Link
            href="/interview"
            className="mt-6 inline-flex text-[12px] font-mono uppercase tracking-widest text-rust hover:text-ink transition-colors"
          >
            View Interviews &rarr;
          </Link>
        </div>

        {/* Grant Tracker */}
        <div className="border border-rule bg-paper/60 p-6 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-leaf mb-3">
              Grant Tracker
            </div>
            <div className="font-display text-[40px] leading-none tracking-tightest text-ink num">
              {activeGrants}
            </div>
            <div className="mt-2 text-[11px] text-inkMuted">
              active grants &middot; ${totalDisbursed.toLocaleString()} disbursed
            </div>
          </div>
          <Link
            href="/grants"
            className="mt-6 inline-flex text-[12px] font-mono uppercase tracking-widest text-rust hover:text-ink transition-colors"
          >
            View Grants &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
