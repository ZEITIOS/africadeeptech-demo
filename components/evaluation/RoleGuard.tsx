"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import type { UserRole } from "@/lib/types";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function RoleGuard({ allowedRoles, children, fallback }: RoleGuardProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const redirect = encodeURIComponent(window.location.pathname);
      router.push(`/auth/login?redirect=${redirect}`);
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block h-5 w-5 border-2 border-rule border-t-rust rounded-full animate-spin mb-4" />
          <p className="text-[13px] text-inkMuted font-mono">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!allowedRoles.includes(user!.role)) {
    if (fallback) return <>{fallback}</>;

    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="border border-rule bg-paper p-10 max-w-md text-center">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-rust mb-4">
            Access Denied
          </div>
          <h2 className="font-display text-[24px] leading-[1.1] tracking-tightest text-ink mb-3">
            Insufficient permissions
          </h2>
          <p className="text-[14px] text-inkSoft leading-relaxed mb-6">
            Your role ({user!.role}) does not have access to this section.
            Contact an administrator if you believe this is an error.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2.5 bg-rust text-white text-[13px] font-medium tracking-wide hover:bg-rustDeep transition-colors"
          >
            Return to Overview
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
