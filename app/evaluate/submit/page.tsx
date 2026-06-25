"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { insforge } from "@/lib/insforge";
import { useAuth } from "@/lib/hooks/useAuth";
import { SectionHeader } from "@/components/UI";
import RoleGuard from "@/components/evaluation/RoleGuard";
import type { Challenge } from "@/lib/types";

export default function SubmitPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [challengeId, setChallengeId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [description, setDescription] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [documentationUrl, setDocumentationUrl] = useState("");
  const [videoPitchUrl, setVideoPitchUrl] = useState("");
  const [technologiesInput, setTechnologiesInput] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    async function loadChallenges() {
      try {
        const { data, error: fetchErr } = await insforge.database
          .from("adt_challenges")
          .select("*")
          .eq("status", "active");

        if (fetchErr) throw fetchErr;
        setChallenges((data ?? []) as Challenge[]);
        if (data && data.length > 0) {
          setChallengeId(data[0].id);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to load challenges";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    loadChallenges();
  }, []);

  async function handleGenerate() {
    setGenerating(true);
    setError(null);
    try {
      const selectedChallenge = challenges.find((c) => c.id === challengeId);
      const res = await fetch("/api/generate-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeName: selectedChallenge?.name }),
      });
      if (!res.ok) throw new Error("Failed to generate submission");
      const data = await res.json();

      setParticipantName(data.participant_name ?? "");
      setTeamName(data.team_name ?? "");
      setCountry(data.country ?? "");
      setCity(data.city ?? "");
      setDescription(data.description ?? "");
      setTechnologiesInput(data.technologies ?? "");
      setRepoUrl(data.repo_url ?? "");
      setDocumentationUrl(data.documentation_url ?? "");
      setVideoPitchUrl(data.video_pitch_url ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const claimedTechnologies = technologiesInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const { error: insertErr } = await insforge.database
        .from("adt_submissions")
        .insert({
          challenge_id: challengeId,
          user_id: user?.id ?? "anonymous",
          participant_name: participantName,
          team_name: teamName || null,
          description,
          repo_url: repoUrl || null,
          documentation_url: documentationUrl || null,
          video_pitch_url: videoPitchUrl || null,
          claimed_technologies: claimedTechnologies,
          country: country || null,
          city: city || null,
          status: "pending",
        });

      if (insertErr) throw insertErr;
      router.push("/evaluate");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to submit";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <RoleGuard allowedRoles={["participant", "admin"]}>
    <div className="px-8 py-10 max-w-[900px] mx-auto">
      <div className="slide-in flex items-start justify-between">
        <SectionHeader
          eyebrow="Submit"
          title="New Challenge Submission"
          description="Submit your team's work for AI-powered evaluation. Provide as much detail as possible for the most accurate assessment."
        />
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating || !challengeId}
          className="shrink-0 px-5 py-2.5 border border-ink text-ink text-[12px] font-mono uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
        >
          {generating ? "Generating..." : "Auto-Generate"}
        </button>
      </div>

      {error && (
        <div className="mt-6 py-3 px-4 border border-rust/30 bg-rustSoft text-[13px] text-rustDeep">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-10 space-y-8 slide-in">
        {/* Challenge selector */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-widest text-inkMuted mb-2">
            Challenge
          </label>
          {loading ? (
            <div className="text-[13px] text-inkMuted">Loading challenges...</div>
          ) : challenges.length === 0 ? (
            <div className="text-[13px] text-inkMuted">No active challenges found.</div>
          ) : (
            <select
              value={challengeId}
              onChange={(e) => setChallengeId(e.target.value)}
              required
              className="w-full bg-transparent border-b border-rule py-2.5 text-[14px] text-ink focus:border-rust focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              {challenges.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.year})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Team + Participant */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-inkMuted mb-2">
              Team Name
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="e.g. NovaTech Labs"
              className="w-full bg-transparent border-b border-rule py-2.5 text-[14px] text-ink placeholder:text-inkMuted/50 focus:border-rust focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-inkMuted mb-2">
              Participant Name *
            </label>
            <input
              type="text"
              required
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder="Lead participant name"
              className="w-full bg-transparent border-b border-rule py-2.5 text-[14px] text-ink placeholder:text-inkMuted/50 focus:border-rust focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-inkMuted mb-2">
              Country
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. Nigeria"
              className="w-full bg-transparent border-b border-rule py-2.5 text-[14px] text-ink placeholder:text-inkMuted/50 focus:border-rust focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-inkMuted mb-2">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Lagos"
              className="w-full bg-transparent border-b border-rule py-2.5 text-[14px] text-ink placeholder:text-inkMuted/50 focus:border-rust focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-widest text-inkMuted mb-2">
            Description *
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your solution, approach, and key innovations..."
            rows={5}
            className="w-full bg-transparent border-b border-rule py-2.5 text-[14px] text-ink placeholder:text-inkMuted/50 focus:border-rust focus:outline-none transition-colors resize-none leading-relaxed"
          />
        </div>

        {/* URLs */}
        <div className="space-y-5">
          <div className="text-[10px] font-mono uppercase tracking-widest text-rust">
            Links &amp; Evidence
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-inkMuted mb-2">
              Repository URL
            </label>
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/your-org/your-repo"
              className="w-full bg-transparent border-b border-rule py-2.5 text-[14px] text-ink placeholder:text-inkMuted/50 focus:border-rust focus:outline-none transition-colors font-mono text-[13px]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-inkMuted mb-2">
              Documentation URL
            </label>
            <input
              type="url"
              value={documentationUrl}
              onChange={(e) => setDocumentationUrl(e.target.value)}
              placeholder="https://docs.example.com"
              className="w-full bg-transparent border-b border-rule py-2.5 text-[14px] text-ink placeholder:text-inkMuted/50 focus:border-rust focus:outline-none transition-colors font-mono text-[13px]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-inkMuted mb-2">
              Video Pitch URL
            </label>
            <input
              type="url"
              value={videoPitchUrl}
              onChange={(e) => setVideoPitchUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full bg-transparent border-b border-rule py-2.5 text-[14px] text-ink placeholder:text-inkMuted/50 focus:border-rust focus:outline-none transition-colors font-mono text-[13px]"
            />
          </div>
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-widest text-inkMuted mb-2">
            Claimed Technologies
          </label>
          <input
            type="text"
            value={technologiesInput}
            onChange={(e) => setTechnologiesInput(e.target.value)}
            placeholder="Python, TensorFlow, Edge TPU, React Native (comma-separated)"
            className="w-full bg-transparent border-b border-rule py-2.5 text-[14px] text-ink placeholder:text-inkMuted/50 focus:border-rust focus:outline-none transition-colors"
          />
          {technologiesInput && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {technologiesInput
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
                .map((tech, i) => (
                  <span
                    key={i}
                    className="inline-block px-2 py-0.5 text-[11px] bg-paperDark text-inkSoft border border-rule rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-rule flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/evaluate")}
            className="text-[12px] font-mono uppercase tracking-widest text-inkMuted hover:text-ink transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || !challengeId}
            className="px-8 py-3 bg-rust text-white text-[12px] font-mono uppercase tracking-widest hover:bg-rustDeep transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
          >
            {submitting ? "Submitting..." : "Submit for Evaluation"}
          </button>
        </div>
      </form>

      <footer className="mt-20 pt-6 border-t border-rule flex justify-between text-[11px] font-mono text-inkMuted uppercase tracking-widest">
        <span>Africa DeepTech Challenge</span>
        <span>Submission Portal</span>
      </footer>
    </div>
    </RoleGuard>
  );
}
