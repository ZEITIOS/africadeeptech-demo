"use client";

import { useState, useCallback, useRef } from "react";

export interface VideoRecorderState {
  stream: MediaStream | null;
  isRecording: boolean;
  videoBlob: Blob | null;
  videoUrl: string | null;
  error: string | null;
  permissionDenied: boolean;
}

const initialState: VideoRecorderState = {
  stream: null,
  isRecording: false,
  videoBlob: null,
  videoUrl: null,
  error: null,
  permissionDenied: false,
};

function getSupportedMimeType(): string {
  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ];

  for (const mimeType of candidates) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(mimeType)) {
      return mimeType;
    }
  }

  return "video/webm";
}

export function useVideoRecorder() {
  const [state, setState] = useState<VideoRecorderState>(initialState);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const requestPermission = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setState((prev) => ({
        ...prev,
        stream: mediaStream,
        error: null,
        permissionDenied: false,
      }));

      return mediaStream;
    } catch (err) {
      const isDenied =
        err instanceof DOMException &&
        (err.name === "NotAllowedError" || err.name === "PermissionDeniedError");

      setState((prev) => ({
        ...prev,
        stream: null,
        error: isDenied
          ? "Camera and microphone access denied. Please allow access in your browser settings."
          : err instanceof Error
            ? err.message
            : "Failed to access camera",
        permissionDenied: isDenied,
      }));

      return null;
    }
  }, []);

  const startRecording = useCallback(async () => {
    let mediaStream = state.stream;

    // Request permission if we don't have a stream yet
    if (!mediaStream) {
      mediaStream = await requestPermission();
      if (!mediaStream) return;
    }

    chunksRef.current = [];
    const mimeType = getSupportedMimeType();

    try {
      const recorder = new MediaRecorder(mediaStream, { mimeType });
      recorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onerror = () => {
        setState((prev) => ({
          ...prev,
          isRecording: false,
          error: "Recording failed unexpectedly",
        }));
      };

      recorder.start(1000); // Collect data every second

      setState((prev) => ({
        ...prev,
        isRecording: true,
        videoBlob: null,
        videoUrl: null,
        error: null,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "Failed to start recording",
      }));
    }
  }, [state.stream, requestPermission]);

  const stopRecording = useCallback(() => {
    return new Promise<Blob | null>((resolve) => {
      const recorder = recorderRef.current;

      if (!recorder || recorder.state === "inactive") {
        resolve(null);
        return;
      }

      recorder.onstop = () => {
        const mimeType = getSupportedMimeType();
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);

        setState((prev) => ({
          ...prev,
          isRecording: false,
          videoBlob: blob,
          videoUrl: url,
        }));

        recorderRef.current = null;
        chunksRef.current = [];
        resolve(blob);
      };

      recorder.stop();

      // Stop all tracks on the stream
      if (state.stream) {
        state.stream.getTracks().forEach((track) => track.stop());
        setState((prev) => ({ ...prev, stream: null }));
      }
    });
  }, [state.stream]);

  const reset = useCallback(() => {
    // Stop any active recording
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
    recorderRef.current = null;
    chunksRef.current = [];

    // Stop media tracks
    if (state.stream) {
      state.stream.getTracks().forEach((track) => track.stop());
    }

    // Revoke object URL to free memory
    if (state.videoUrl) {
      URL.revokeObjectURL(state.videoUrl);
    }

    setState(initialState);
  }, [state.stream, state.videoUrl]);

  return {
    ...state,
    requestPermission,
    startRecording,
    stopRecording,
    reset,
  };
}
