"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { insforge } from "@/lib/insforge";
import { SectionHeader, StatBlock } from "@/components/UI";
import RecommendationBadge from "@/components/evaluation/RecommendationBadge";
import RoleGuard from "@/components/evaluation/RoleGuard";
import { useAuth } from "@/lib/hooks/useAuth";
import type {
  InterviewSession,
  InterviewStatus,
  InterviewRecommendation,
  Submission,
} from "@/lib/types";

type SessionRow = InterviewSession & {
  team_name?: string;
  answered_count: number;
};

const statusStyles: Record<InterviewStatus, string> = {
  pending: "bg-paperDark text-inkMuted border-rule",
  in_progress: "bg-goldSoft text-gold border-gold/30 animate-pulse",
  completed: "bg-tealSoft text-teal border-teal/30",
  reviewed: "bg-leafSoft text-leaf border-leaf/30",
};

const recMap: Record<InterviewRecommendation, "Advance" | "Review" | "Reject"> = {
  "Advance to Panel": "Advance",
  "Needs Follow-up": "Review",
  Reject: "Reject",
};

export default function InterviewDashboard() {
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  const isParticipant = user?.role === "participant";

  useEffect(() => {
    if (!user) return;

    async function load() {
      try {
        // Participants only see their own sessions
        let sessQuery = insforge.database
          .from("adt_interview_sessions")
          .select("*")
          .order("created_at", { ascending: false });

        if (isParticipant) {
          sessQuery = sessQuery.eq("user_id", user!.id);
        }

        const [sessRes, subRes, ansRes] = await Promise.all([
          sessQuery,
          insforge.database.from("adt_submissions").select("id, team_name"),
          insforge.database.from("adt_interview_answers").select("id, session_id"),
        ]);

        if (sessRes.error) throw sessRes.error;
        if (subRes.error) throw subRes.error;

        const subs = (subRes.data ?? []) as Pick<Submission, "id" | "team_name">[];
        const subMap = new Map(subs.map((s) => [s.id, s.team_name]));

        const answers = (ansRes.data ?? []) as { id: string; session_id: string }[];
        const answerCountMap = new Map<string, number>();
        for (const a of answers) {
          answerCountMap.set(a.session_id, (answerCountMap.get(a.session_id) ?? 0) + 1);
        }

        const rows: SessionRow[] = ((sessRes.data ?? []) as InterviewSession[]).map((s) => ({
          ...s,
          team_name: subMap.get(s.submission_id) ?? undefined,
          answered_count: answerCountMap.get(s.id) ?? 0,
        }));

        setSessions(rows);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load sessions");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user, isParticipant]);

  const totalCount = sessions.length;
  const completedCount = sessions.filter(
    (s) => s.status === "completed" || s.status === "reviewed"
  ).length;
  const pendingCount = sessions.filter(
    (s) => s.status === "pending" || s.status === "in_progress"
  ).length;
  const advanceRate =
    completedCount > 0
      ? Math.round(
          (sessions.filter(
            (s) => s.overall_report?.recommendation === "Advance to Panel"
          ).length /
            completedCount) *
            100
        )
      : 0;

  const handleRowClick = (s: SessionRow) => {
    if (isParticipant) {
      // Participants always go to recording page
      router.push(`/interview/${s.id}`);
    } else if (s.status === "completed" || s.status === "reviewed") {
      router.push(`/interview/${s.id}/report`);
    } else {
      router.push(`/interview/${s.id}`);
    }
  };

  return (
    <RoleGuard allowedRoles={["admin", "reviewer", "participant"]}>
    <div className="px-8 py-10 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="slide-in flex items-start justify-between">
        <SectionHeader
          eyebrow="Interviews"
          title={isParticipant ? "Your Interviews" : "Due Diligence Sessions"}
          description={isParticipant
            ? "Complete your video interviews below. Each session contains structured questions — record your answers on camera."
            : "AI-powered video interviews for deep tech due diligence. Each participant answers structured questions evaluated in real time."
          }
        />
      </div>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-4 gap-4 slide-in">
        <StatBlock label="Total" value={String(totalCount)} sub="interview sessions" />
        <StatBlock label="Completed" value={String(completedCount)} sub="interviews finished" />
        <StatBlock label="Pending" value={String(pendingCount)} sub="awaiting completion" />
        <StatBlock
          label="Advance Rate"
          value={`${advanceRate}%`}
          sub="of completed sessions"
        />
      </div>

      {/* Table */}
      <div className="mt-8">
        {loading && (
          <div className="border border-rule p-16 text-center">
            <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted pulse-dot">
              Loading sessions...
            </div>
          </div>
        )}

        {error && (
          <div className="border border-rust/30 bg-rustSoft p-6 text-center">
            <p className="text-[13px] text-rustDeep">{error}</p>
          </div>
        )}

        {!loading && !error && sessions.length === 0 && (
          <div className="border border-dashed border-rule p-16 text-center">
            <div className="font-display text-[28px] text-ink tracking-tightest">
              No interview sessions yet.
            </div>
            <p className="text-[13px] text-inkMuted mt-2">
              Interview sessions are created after evaluating a submission.
            </p>
          </div>
        )}

        {!loading && !error && sessions.length > 0 && (
          <div className="border border-rule slide-in">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-rule bg-paperDark/40 text-[10px] font-mono uppercase tracking-widest text-inkMuted">
              <div className="col-span-2">Participant</div>
              <div className="col-span-2">Team</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Questions</div>
              <div className="col-span-1">Score</div>
              <div className="col-span-2">Recommendation</div>
              <div className="col-span-2">Date</div>
            </div>

            {/* Table rows */}
            {sessions.map((s) => (
              <div
                key={s.id}
                onClick={() => handleRowClick(s)}
                className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-ruleSoft hover:bg-paperDark/30 cursor-pointer transition-colors"
              >
                <div className="col-span-2 text-[13px] text-ink truncate">
                  {s.participant_name || "Unknown"}
                </div>
                <div className="col-span-2 text-[13px] text-inkSoft truncate">
                  {s.team_name || "\u2014"}
                </div>
                <div className="col-span-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest border rounded-sm ${statusStyles[s.status]}`}
                  >
                    <span className="h-1 w-1 rounded-full bg-current" />
                    {s.status.replace("_", " ")}
                  </span>
                </div>
                <div className="col-span-1 text-[13px] font-mono text-inkSoft num">
                  {s.answered_count}/{s.questions?.length ?? 0}
                </div>
                <div className="col-span-1 text-[13px] font-mono text-ink num">
                  {s.overall_report?.overall_score ?? "\u2014"}
                </div>
                <div className="col-span-2">
                  {s.overall_report?.recommendation ? (
                    <RecommendationBadge
                      recommendation={recMap[s.overall_report.recommendation]}
                    />
                  ) : (
                    <span className="text-[11px] text-inkMuted">\u2014</span>
                  )}
                </div>
                <div className="col-span-2 text-[12px] font-mono text-inkMuted">
                  {new Date(s.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="mt-20 pt-6 border-t border-rule flex justify-between text-[11px] font-mono text-inkMuted uppercase tracking-widest">
        <span>Africa DeepTech Challenge</span>
        <span>Interview Agent</span>
      </footer>
    </div>
    </RoleGuard>
  );
}
