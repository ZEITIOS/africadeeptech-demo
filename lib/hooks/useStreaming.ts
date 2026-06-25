"use client";

import { useState, useCallback, useRef } from "react";
import type { Evaluation } from "../types";

export interface StreamingEvaluationState {
  content: string;
  isStreaming: boolean;
  error: string | null;
  evaluation: Evaluation | null;
}

const initialState: StreamingEvaluationState = {
  content: "",
  isStreaming: false,
  error: null,
  evaluation: null,
};

export function useStreamingEvaluation() {
  const [state, setState] = useState<StreamingEvaluationState>(initialState);
  const abortRef = useRef<AbortController | null>(null);

  const evaluate = useCallback(async (submissionId: string) => {
    // Abort any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState({ content: "", isStreaming: true, error: null, evaluation: null });

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(
          (body as { error?: string }).error ||
            `Request failed (${response.status})`,
        );
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process complete SSE lines (double newline delimited)
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          try {
            const payload = JSON.parse(line.slice(6)) as
              | { type: "delta"; content: string }
              | { type: "complete"; evaluation: Evaluation }
              | { type: "error"; message: string };

            switch (payload.type) {
              case "delta":
                setState((prev) => ({
                  ...prev,
                  content: prev.content + payload.content,
                }));
                break;

              case "complete":
                setState((prev) => ({
                  ...prev,
                  isStreaming: false,
                  evaluation: payload.evaluation,
                }));
                break;

              case "error":
                setState((prev) => ({
                  ...prev,
                  isStreaming: false,
                  error: payload.message,
                }));
                break;
            }
          } catch {
            // Skip malformed SSE lines
          }
        }
      }

      // If stream ended without a complete/error event, stop streaming
      setState((prev) =>
        prev.isStreaming ? { ...prev, isStreaming: false } : prev,
      );
    } catch (err) {
      if ((err as Error).name === "AbortError") return;

      setState((prev) => ({
        ...prev,
        isStreaming: false,
        error: err instanceof Error ? err.message : "Evaluation failed",
      }));
    }
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setState(initialState);
  }, []);

  return {
    ...state,
    evaluate,
    reset,
  };
}
