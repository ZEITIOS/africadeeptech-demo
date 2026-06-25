"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useVideoRecorder } from "@/lib/hooks/useVideoRecorder";

type RecorderPhase = "idle" | "recording" | "review";

export default function VideoRecorder({
  onRecordingComplete,
  maxDuration,
}: {
  onRecordingComplete: (blob: Blob) => void;
  maxDuration: number;
}) {
  const {
    stream,
    isRecording,
    videoBlob,
    videoUrl,
    error,
    permissionDenied,
    startRecording,
    stopRecording,
    reset,
  } = useVideoRecorder();

  const liveVideoRef = useRef<HTMLVideoElement>(null);
  const playbackRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [remaining, setRemaining] = useState(maxDuration);

  const phase: RecorderPhase = videoBlob ? "review" : isRecording ? "recording" : "idle";

  // Attach live stream to video element
  useEffect(() => {
    if (liveVideoRef.current && stream) {
      liveVideoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Countdown timer
  useEffect(() => {
    if (isRecording) {
      setRemaining(maxDuration);
      timerRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRecording, maxDuration, stopRecording]);

  const handleSubmit = useCallback(() => {
    if (videoBlob) {
      onRecordingComplete(videoBlob);
    }
  }, [videoBlob, onRecordingComplete]);

  const handleReRecord = useCallback(() => {
    reset();
    setRemaining(maxDuration);
  }, [reset, maxDuration]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="border border-rule bg-paper">
      {/* Video area */}
      <div className="relative aspect-video bg-ink/5">
        {phase === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-rule flex items-center justify-center">
              <svg
                className="w-8 h-8 text-inkMuted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <p className="text-[12px] text-inkMuted font-mono uppercase tracking-widest">
              Ready to record
            </p>
            <p className="text-[11px] text-inkMuted">
              Max duration: {formatTime(maxDuration)}
            </p>
          </div>
        )}

        {phase === "recording" && (
          <>
            <video
              ref={liveVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Recording overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-ink/70 backdrop-blur-sm px-3 py-1.5 rounded-sm">
              <span className="h-2 w-2 rounded-full bg-rust animate-pulse" />
              <span className="text-[11px] font-mono text-white uppercase tracking-widest">
                Recording
              </span>
            </div>
            {/* Countdown */}
            <div className="absolute top-4 right-4 bg-ink/70 backdrop-blur-sm px-3 py-1.5 rounded-sm">
              <span className="text-[14px] font-mono text-white num">
                {formatTime(remaining)}
              </span>
            </div>
          </>
        )}

        {phase === "review" && videoUrl && (
          <video
            ref={playbackRef}
            src={videoUrl}
            controls
            playsInline
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-rule">
        {error && (
          <div className="mb-3 px-3 py-2 border border-rust/30 bg-rustSoft text-[12px] text-rustDeep">
            {error}
            {permissionDenied && (
              <span className="block mt-1 text-[11px] text-inkMuted">
                Please enable camera and microphone in your browser settings.
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-3">
          {phase === "idle" && (
            <button
              onClick={startRecording}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-rust text-white text-[12px] font-mono uppercase tracking-widest hover:bg-rustDeep transition-colors rounded-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8" />
              </svg>
              Start Recording
            </button>
          )}

          {phase === "recording" && (
            <button
              onClick={stopRecording}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-ink text-paper text-[12px] font-mono uppercase tracking-widest hover:bg-rust transition-colors rounded-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12" rx="1" />
              </svg>
              Stop Recording
            </button>
          )}

          {phase === "review" && (
            <>
              <button
                onClick={handleReRecord}
                className="flex-1 px-5 py-2.5 border border-ink text-ink text-[12px] font-mono uppercase tracking-widest hover:bg-paperDark transition-colors rounded-sm"
              >
                Re-record
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-5 py-2.5 bg-rust text-white text-[12px] font-mono uppercase tracking-widest hover:bg-rustDeep transition-colors rounded-sm"
              >
                Submit Answer
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
