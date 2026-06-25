import { NextRequest } from "next/server";
import { insforge } from "@/lib/insforge";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { challengeName } = (await req.json()) as { challengeName?: string };

    const response = await insforge.ai.chat.completions.create({
      model: "anthropic/claude-sonnet-4.5",
      messages: [
        {
          role: "system",
          content:
            "You generate realistic deep tech challenge submissions from African innovators. Each submission should be a plausible, technically detailed project that an African engineer, researcher, or startup could build. Be specific with technologies, metrics, and real African cities/countries. Vary the verticals: health, agriculture, energy, defense, fintech, climate, water, education, manufacturing.",
        },
        {
          role: "user",
          content: `Generate a single realistic submission for the "${challengeName || "Africa DeepTech Challenge 2026 — AI for Africa"}" challenge.

Return a JSON object with these fields:
{
  "participant_name": "Full name (African name, realistic)",
  "team_name": "Creative team/startup name",
  "country": "African country",
  "city": "Real city in that country",
  "description": "3-5 sentence technical description of the project. Be specific about what it does, how it works, what data/hardware it uses, and what results it achieved. Include real metrics.",
  "technologies": "comma-separated list of 4-7 specific technologies (frameworks, hardware, languages, protocols)",
  "repo_url": "https://github.com/plausible-org/plausible-repo",
  "documentation_url": "a plausible documentation URL or null",
  "video_pitch_url": "a plausible Loom/YouTube URL or null"
}

Return ONLY valid JSON, no markdown fences.`,
        },
      ],
      stream: false,
    });

    const rawContent = response.choices[0]?.message?.content || "{}";

    let parsed;
    try {
      const cleaned = rawContent
        .replace(/^```json\s*/i, "")
        .replace(/```\s*$/, "")
        .trim();
      parsed = JSON.parse(cleaned);
    } catch {
      return new Response(
        JSON.stringify({ error: "Failed to parse generated submission" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
