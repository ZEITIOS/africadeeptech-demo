import { NextRequest } from "next/server";
import { insforge } from "@/lib/insforge";
import type {
  InterviewQuestion,
  InterviewAnswer,
  InterviewReport,
} from "@/lib/types";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = (await req.json()) as { sessionId: string };

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: "sessionId is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // 1. Fetch the interview session
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

    // 2. Fetch all answers for this session
    const { data: answers, error: ansError } = await insforge.database
      .from("adt_interview_answers")
      .select()
      .eq("session_id", sessionId);

    if (ansError) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch interview answers" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!answers || answers.length === 0) {
      return new Response(
        JSON.stringify({ error: "No answers found for this session" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // 3. Fetch the original submission
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

    const questions = session.questions as InterviewQuestion[];
    const typedAnswers = answers as InterviewAnswer[];

    // Build Q&A summary for AI
    const qaSummary = questions
      .map((q) => {
        const answer = typedAnswers.find((a) => a.question_id === q.id);
        return `Q${q.order} [${q.category}]: ${q.question}
Answer: ${answer?.transcript || "No answer provided"}
Evaluation: ${answer?.evaluation ? `Score: ${answer.evaluation.overall_score}/100 — ${answer.evaluation.reasoning}` : "Not evaluated"}
Red flags: ${answer?.evaluation?.red_flags?.length ? answer.evaluation.red_flags.join(", ") : "None"}`;
      })
      .join("\n\n");

    // 4. Call InsForge AI to synthesize the report (streaming SSE)
    const stream = await insforge.ai.chat.completions.create({
      model: "anthropic/claude-sonnet-4.5",
      messages: [
        {
          role: "system",
          content:
            "You are an expert interview panel synthesizer for the Africa DeepTech Foundation. Generate a comprehensive interview report that weighs all answers together to form a holistic assessment. Be fair but rigorous.",
        },
        {
          role: "user",
          content: `Synthesize a final interview report for this candidate.

SUBMISSION:
- Participant: ${submission.participant_name}
- Team: ${submission.team_name || "Solo"}
- Description: ${submission.description}
- Technologies: ${(submission.claimed_technologies as string[]).join(", ")}

INTERVIEW Q&A:
${qaSummary}

Generate a comprehensive report as JSON:
{
  "overall_score": 0-100 (weighted across all answers),
  "recommendation": "Advance to Panel" | "Needs Follow-up" | "Reject",
  "summary": "2-3 paragraph narrative assessment of the candidate",
  "strength_areas": ["areas where the candidate excelled"],
  "concern_areas": ["areas needing improvement or further exploration"],
  "red_flags": ["any serious concerns about authenticity or capability"],
  "follow_up_questions": ["questions for a potential follow-up or panel interview"]
}

Guidelines:
- Score >= 75 and no major red flags → "Advance to Panel"
- Score 50-74 or minor concerns → "Needs Follow-up"
- Score < 50 or major red flags → "Reject"

Return ONLY valid JSON, no markdown fences or other text.`,
        },
      ],
      stream: true,
    });

    // 5. Stream response back as SSE
    return new Response(
      new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          let fullContent = "";

          try {
            for await (const chunk of stream) {
              const delta = chunk.choices[0]?.delta?.content || "";
              fullContent += delta;
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: "delta", content: delta })}\n\n`,
                ),
              );
            }

            // Parse the AI response
            let report: InterviewReport;

            try {
              const cleaned = fullContent
                .replace(/^```json\s*/i, "")
                .replace(/```\s*$/, "")
                .trim();
              report = JSON.parse(cleaned);
            } catch {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: "error", message: "Failed to parse report response" })}\n\n`,
                ),
              );
              controller.close();
              return;
            }

            // 6. Update session with report and status
            const { error: updateError } = await insforge.database
              .from("adt_interview_sessions")
              .update({
                overall_report: report,
                status: "reviewed",
                completed_at: new Date().toISOString(),
              })
              .eq("id", sessionId);

            if (updateError) {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: "error", message: "Failed to save report" })}\n\n`,
                ),
              );
              controller.close();
              return;
            }

            // 7. Send completion event
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "complete", report })}\n\n`,
              ),
            );

            controller.close();
          } catch (err) {
            const message =
              err instanceof Error ? err.message : "Report generation failed";
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "error", message })}\n\n`,
              ),
            );
            controller.close();
          }
        },
      }),
      {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      },
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
