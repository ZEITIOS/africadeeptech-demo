import { NextRequest } from "next/server";
import { insforge } from "@/lib/insforge";
import type { Evaluation, EvaluationCriterionScore, CodeAnalysis } from "@/lib/types";

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

    // 2. Fetch the challenge to get criteria
    const { data: challenge, error: chalError } = await insforge.database
      .from("adt_challenges")
      .select()
      .eq("id", submission.challenge_id)
      .single();

    if (chalError || !challenge) {
      return new Response(
        JSON.stringify({ error: "Challenge not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // 3. Mark submission as evaluating
    await insforge.database
      .from("adt_submissions")
      .update({ status: "evaluating" })
      .eq("id", submissionId);

    const startTime = Date.now();

    // 4. Call InsForge AI Gateway with Claude
    const stream = await insforge.ai.chat.completions.create({
      model: "anthropic/claude-sonnet-4.5",
      messages: [
        {
          role: "system",
          content: `You are an expert technical evaluator for the Africa DeepTech Foundation Challenge. You evaluate deep tech submissions from African innovators. Be rigorous but fair. Score each criterion 0-100.`,
        },
        {
          role: "user",
          content: `Evaluate this submission against these criteria:\n\n${JSON.stringify(challenge.criteria)}\n\nSubmission:\n- Team: ${submission.team_name || submission.participant_name}\n- Description: ${submission.description}\n- Technologies: ${(submission.claimed_technologies as string[]).join(", ")}\n- Repo: ${submission.repo_url || "Not provided"}\n- Documentation: ${submission.documentation_url || "Not provided"}\n\nReturn a JSON object with this exact structure:\n{\n  "criteria_scores": [{ "name": "...", "weight": ..., "score": 0-100, "reasoning": "...", "strengths": ["..."], "weaknesses": ["..."] }],\n  "overall_score": weighted average,\n  "recommendation": "Advance" | "Review" | "Reject",\n  "summary": "2-3 paragraph assessment",\n  "code_analysis": { "languages": [...], "quality": "...", "architecture_notes": "..." } or null\n}\n\nReturn ONLY valid JSON, no markdown fences or other text.`,
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

            const durationMs = Date.now() - startTime;

            // Parse the AI response
            let parsed: {
              criteria_scores: EvaluationCriterionScore[];
              overall_score: number;
              recommendation: "Advance" | "Review" | "Reject";
              summary: string;
              code_analysis: CodeAnalysis | null;
            };

            try {
              // Strip markdown fences if present
              const cleaned = fullContent
                .replace(/^```json\s*/i, "")
                .replace(/```\s*$/, "")
                .trim();
              parsed = JSON.parse(cleaned);
            } catch {
              // If parsing fails, mark as error and notify client
              await insforge.database
                .from("adt_submissions")
                .update({ status: "error" })
                .eq("id", submissionId);

              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: "error", message: "Failed to parse evaluation response" })}\n\n`,
                ),
              );
              controller.close();
              return;
            }

            // 6. Save evaluation to DB
            const { data: savedEvaluation, error: saveError } =
              await insforge.database.from("adt_evaluations").insert({
                submission_id: submissionId,
                criteria_scores: parsed.criteria_scores,
                overall_score: parsed.overall_score,
                recommendation: parsed.recommendation,
                summary: parsed.summary,
                code_analysis: parsed.code_analysis,
                evaluated_by: "ai:claude-sonnet-4.5",
                duration_ms: durationMs,
              }).select().single();

            if (saveError) {
              await insforge.database
                .from("adt_submissions")
                .update({ status: "error" })
                .eq("id", submissionId);

              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: "error", message: "Failed to save evaluation" })}\n\n`,
                ),
              );
              controller.close();
              return;
            }

            // 7. Update submission status
            await insforge.database
              .from("adt_submissions")
              .update({ status: "evaluated" })
              .eq("id", submissionId);

            // 8. Send completion event
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "complete", evaluation: savedEvaluation as Evaluation })}\n\n`,
              ),
            );

            controller.close();
          } catch (err) {
            // Handle streaming errors
            await insforge.database
              .from("adt_submissions")
              .update({ status: "error" })
              .eq("id", submissionId);

            const message =
              err instanceof Error ? err.message : "Evaluation failed";
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
