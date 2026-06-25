"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import AuthForm from "@/components/evaluation/AuthForm";

function LoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";

  return (
    <AuthForm
      mode="login"
      onSuccess={() => router.push(redirect)}
    />
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="w-full max-w-md slide-in">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2.5 mb-6">
            <div className="h-9 w-9 bg-ink text-paper grid place-items-center rounded-sm">
              <span className="font-display text-[18px] leading-none font-semibold">W</span>
            </div>
            <span className="font-display text-[22px] tracking-tightest text-ink">Wokkah</span>
          </div>
        </div>
        <Suspense fallback={<div className="text-center text-inkMuted text-[13px]">Loading...</div>}>
          <LoginInner />
        </Suspense>
      </div>
    </div>
  );
}
