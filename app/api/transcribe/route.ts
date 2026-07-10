import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let transcript: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const audioFile = formData.get("audio") as File | null;
      const textFallback = formData.get("text") as string | null;

      if (textFallback) {
        transcript = textFallback;
      } else if (audioFile) {
        // Real speech-to-text via OpenAI Whisper (server-side key, never exposed to client)
        const openaiKey = process.env.OPENAI_API_KEY;
        if (!openaiKey) {
          return new Response(
            JSON.stringify({
              error:
                "Transcription is not configured. Set OPENAI_API_KEY on the server.",
            }),
            { status: 503, headers: { "Content-Type": "application/json" } },
          );
        }

        const whisperForm = new FormData();
        whisperForm.append("file", audioFile, "recording.webm");
        whisperForm.append("model", "whisper-1");

        const whisperRes = await fetch(
          "https://api.openai.com/v1/audio/transcriptions",
          {
            method: "POST",
            headers: { Authorization: `Bearer ${openaiKey}` },
            body: whisperForm,
          },
        );

        if (!whisperRes.ok) {
          const details = await whisperRes.text().catch(() => "");
          return new Response(
            JSON.stringify({
              error: `Transcription failed (${whisperRes.status})`,
              details: details.slice(0, 500),
            }),
            { status: 502, headers: { "Content-Type": "application/json" } },
          );
        }

        const data = await whisperRes.json();
        transcript = data.text || null;

        if (!transcript) {
          return new Response(
            JSON.stringify({ error: "Transcription returned empty text" }),
            { status: 502, headers: { "Content-Type": "application/json" } },
          );
        }
      } else {
        return new Response(
          JSON.stringify({
            error: "No audio file or text provided in FormData",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }
    } else if (contentType.includes("application/json")) {
      const body = (await req.json()) as { text?: string };

      if (!body.text) {
        return new Response(
          JSON.stringify({ error: "text field is required in JSON body" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      transcript = body.text;
    } else {
      return new Response(
        JSON.stringify({
          error:
            "Unsupported content type. Use multipart/form-data or application/json.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!transcript) {
      return new Response(
        JSON.stringify({ error: "Failed to produce a transcript" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ transcript }), {
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
