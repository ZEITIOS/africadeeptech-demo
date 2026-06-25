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
        // Try Whisper transcription via InsForge AI Gateway (OpenAI-compatible)
        try {
          const whisperForm = new FormData();
          whisperForm.append("file", audioFile, "recording.webm");
          whisperForm.append("model", "whisper-1");

          const whisperRes = await fetch(
            `${process.env.NEXT_PUBLIC_INSFORGE_URL}/ai/v1/audio/transcriptions`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY}`,
              },
              body: whisperForm,
            },
          );

          if (whisperRes.ok) {
            const data = await whisperRes.json();
            transcript = data.text || null;
          }
        } catch {
          // Whisper endpoint not available
        }

        // Fallback: return a placeholder if Whisper failed
        if (!transcript) {
          transcript =
            "[Transcription unavailable] Audio transcription service is not configured. The recorded video is saved and can be reviewed manually.";
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
