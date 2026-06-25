import { NextRequest } from "next/server";
import { insforge } from "@/lib/insforge";
import type { AnswerEvaluation, InterviewQuestion } from "@/lib/types";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, questionId, transcript } = (await req.json()) as {
      sessionId: string;
      questionId: string;
      transcript: string;
    };

    if (!sessionId || !questionId || !transcript) {
      return new Response(
        JSON.stringify({
          error: "sessionId, questionId, and transcript are required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // 1. Fetch the interview session to get question details
    const { data: session, error: sessError } = await insforge.database
      .from("adt_interview_sessions")
      .select()
      .eq("id", sessionId)
      .single();

    if (sessError || !session) {
      return new Response(
        JSON.stringify({ error: "Interview session not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    const questions = session.questions as InterviewQuestion[];
    const question = questions.find((q) => q.id === questionId);

    if (!question) {
      return new Response(
        JSON.stringify({ error: "Question not found in session" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // 2. Fetch the original submission for context
    const { data: submission, error: subError } = await insforge.database
      .from("adt_submissions")
      .select()
      .eq("id", session.submission_id)
      .single();

    if (subError || !submission) {
      return new Response(
        JSON.stringify({ error: "Submission not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // 3. Call InsForge AI to evaluate the transcript
    const response = await insforge.ai.chat.completions.create({
      model: "anthropic/claude-sonnet-4.5",
      messages: [
        {
          role: "system",
          content:
            "You are an expert interview evaluator for the Africa DeepTech Foundation. Evaluate the candidate's answer for technical accuracy, depth, authenticity, and communication quality. Be rigorous — look for signs of genuine understanding vs. rehearsed or superficial answers.",
        },
        {
          role: "user",
          content: `Evaluate this interview answer.

CONTEXT:
- Submission: ${submission.description}
- Technologies: ${(submission.claimed_technologies as string[]).join(", ")}

QUESTION (${question.category}):
${question.question}

Why we asked: ${question.context}
Expected depth: ${question.expected_depth}

CANDIDATE'S ANSWER (transcript):
${transcript}

Score on these 4 dimensions (0-100 each):
1. technical_accuracy — Are the technical claims correct? Does the candidate demonstrate real knowledge?
2. depth_of_understanding — Does the answer go beyond surface level? Can they explain WHY, not just WHAT?
3. authenticity — Does this sound like someone who actually built it? Look for specific details, personal experiences, debugging stories.
4. communication_quality — Is the answer clear, structured, and confident?

Return a JSON object:
{
  "technical_accuracy": 0-100,
  "depth_of_understanding": 0-100,
  "authenticity": 0-100,
  "communication_quality": 0-100,
  "overall_score": weighted average (tech 30%, depth 30%, auth 25%, comm 15%),
  "reasoning": "2-3 sentences explaining the score",
  "red_flags": ["any concerns about authenticity or accuracy"],
  "annotations": [
    {
      "timestamp_seconds": 0,
      "note": "Notable observation about their answer",
      "type": "positive" | "concern" | "flag"
    }
  ]
}

Return ONLY valid JSON, no markdown fences or other text.`,
        },
      ],
      stream: false,
    });

    // 4. Parse AI response
    const rawContent =
      response.choices[0]?.message?.content || "{}";
    let evaluation: AnswerEvaluation;

    try {
      const cleaned = rawContent
        .replace(/^```json\s*/i, "")
        .replace(/```\s*$/, "")
        .trim();
      evaluation = JSON.parse(cleaned);
    } catch {
      return new Response(
        JSON.stringify({ error: "Failed to parse evaluation response" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    // 5. Upsert the interview answer with evaluation
    const { data: answer, error: ansError } = await insforge.database
      .from("adt_interview_answers")
      .upsert(
        {
          session_id: sessionId,
          question_id: questionId,
          transcript: transcript,
          evaluation: evaluation,
        },
        { onConflict: "session_id,question_id" },
      )
      .select()
      .single();

    if (ansError) {
      // Fallback: try insert if upsert fails
      const { data: insertedAnswer, error: insertError } =
        await insforge.database
          .from("adt_interview_answers")
          .insert({
            session_id: sessionId,
            question_id: questionId,
            transcript: transcript,
            evaluation: evaluation,
          })
          .select()
          .single();

      if (insertError) {
        return new Response(
          JSON.stringify({
            error: "Failed to save answer evaluation",
            details: insertError.message,
          }),
          { status: 500, headers: { "Content-Type": "application/json" } },
        );
      }

      return new Response(
        JSON.stringify({ answer: insertedAnswer, evaluation }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ answer, evaluation }), {
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
