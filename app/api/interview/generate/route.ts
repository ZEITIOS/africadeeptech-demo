import { NextRequest } from "next/server";
import { insforge } from "@/lib/insforge";
import type { InterviewQuestion, InterviewSession } from "@/lib/types";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { submissionId } = (await req.json()) as { submissionId: string };

    if (!submissionId) {
      return new Response(
        JSON.stringify({ error: "submissionId is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // 1. Fetch the submission
    const { data: submission, error: subError } = await insforge.database
      .from("adt_submissions")
      .select()
      .eq("id", submissionId)
      .single();

    if (subError || !submission) {
      return new Response(
        JSON.stringify({ error: "Submission not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // 2. Fetch the evaluation for this submission
    const { data: evaluation, error: evalError } = await insforge.database
      .from("adt_evaluations")
      .select()
      .eq("submission_id", submissionId)
      .single();

    if (evalError || !evaluation) {
      return new Response(
        JSON.stringify({ error: "Evaluation not found for this submission" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // 3. Call InsForge AI to generate interview questions
    const response = await insforge.ai.chat.completions.create({
      model: "anthropic/claude-sonnet-4.5",
      messages: [
        {
          role: "system",
          content:
            "You are an expert interviewer for the Africa DeepTech Foundation. Generate probing questions to verify the applicant actually built what they claim. Questions should test genuine understanding, not just surface knowledge.",
        },
        {
          role: "user",
          content: `Based on this submission and its evaluation, generate 5-6 interview questions.

SUBMISSION:
- Participant: ${submission.participant_name}
- Team: ${submission.team_name || "Solo"}
- Description: ${submission.description}
- Technologies claimed: ${(submission.claimed_technologies as string[]).join(", ")}
- Repo: ${submission.repo_url || "Not provided"}

EVALUATION SUMMARY:
- Overall score: ${evaluation.overall_score}/100
- Recommendation: ${evaluation.recommendation}
- Summary: ${evaluation.summary}
- Strengths: ${JSON.stringify(
              (evaluation.criteria_scores as Array<{ strengths: string[] }>)
                .flatMap((c) => c.strengths)
                .slice(0, 6),
            )}
- Weaknesses: ${JSON.stringify(
              (evaluation.criteria_scores as Array<{ weaknesses: string[] }>)
                .flatMap((c) => c.weaknesses)
                .slice(0, 6),
            )}

Return a JSON array of questions with this structure:
[
  {
    "id": "q1",
    "order": 1,
    "category": "technical" | "process" | "authenticity" | "behavioral",
    "question": "The question text",
    "context": "Why you're asking this question",
    "expected_depth": "What a strong answer would demonstrate",
    "max_duration_seconds": 90-120
  }
]

Mix categories across technical (architecture decisions, implementation details), process (how they built it, workflow), authenticity (verify they actually did the work), and behavioral (teamwork, problem-solving).

Return ONLY valid JSON, no markdown fences or other text.`,
        },
      ],
      stream: false,
    });

    // 4. Parse AI response
    const rawContent =
      response.choices[0]?.message?.content || "[]";
    let questions: InterviewQuestion[];

    try {
      const cleaned = rawContent
        .replace(/^```json\s*/i, "")
        .replace(/```\s*$/, "")
        .trim();
      questions = JSON.parse(cleaned);
    } catch {
      return new Response(
        JSON.stringify({ error: "Failed to parse generated questions" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    // 5. Create interview session in DB
    const { data: session, error: sessionError } = await insforge.database
      .from("adt_interview_sessions")
      .insert({
        submission_id: submissionId,
        user_id: submission.user_id,
        participant_name: submission.participant_name,
        status: "pending",
        questions: questions,
      })
      .select()
      .single();

    if (sessionError || !session) {
      return new Response(
        JSON.stringify({
          error: "Failed to create interview session",
          details: sessionError?.message,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify(session as InterviewSession), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
