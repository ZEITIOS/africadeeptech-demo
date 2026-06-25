"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { insforge } from "../insforge";
import type { UserRole } from "../types";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// Refresh interval: 4 minutes (tokens typically expire in 5-10 min)
const REFRESH_INTERVAL_MS = 4 * 60 * 1000;

function extractUser(raw: Record<string, unknown>): AuthUser {
  return {
    id: raw.id as string,
    email: (raw.email as string) ?? "",
    name:
      (raw.profile as Record<string, unknown>)?.name as string ??
      (raw.email as string)?.split("@")[0] ??
      "User",
    role:
      ((raw.profile as Record<string, unknown>)?.role as UserRole) ??
      "participant",
  };
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const refreshTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const isAuthenticated = !!user;

  // Proactive session refresh
  const refreshSession = useCallback(async () => {
    try {
      const { data, error } = await insforge.auth.refreshSession();
      if (error || !data) return;

      // Update user state if the refresh returned user data
      if (data.user) {
        setUser(extractUser(data.user as unknown as Record<string, unknown>));
      }
    } catch {
      // Silent fail — next interval will retry, or user will be redirected on 401
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      try {
        const { data, error } = await insforge.auth.getCurrentUser();
        if (error || !data?.user) {
          if (!cancelled) {
            setUser(null);
            setIsLoading(false);
          }
          return;
        }

        if (!cancelled) {
          setUser(extractUser(data.user as unknown as Record<string, unknown>));
          setIsLoading(false);

          // Start periodic refresh
          refreshTimer.current = setInterval(refreshSession, REFRESH_INTERVAL_MS);
        }
      } catch {
        if (!cancelled) {
          setUser(null);
          setIsLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      cancelled = true;
      if (refreshTimer.current) {
        clearInterval(refreshTimer.current);
      }
    };
  }, [refreshSession]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { data, error } = await insforge.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    if (data?.user) {
      setUser(extractUser(data.user as unknown as Record<string, unknown>));

      // Start periodic refresh after login
      if (refreshTimer.current) clearInterval(refreshTimer.current);
      refreshTimer.current = setInterval(async () => {
        try {
          await insforge.auth.refreshSession();
        } catch { /* silent */ }
      }, REFRESH_INTERVAL_MS);
    }

    return data;
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, name: string, role: UserRole = "participant") => {
      const { data, error } = await insforge.auth.signUp({
        email,
        password,
        name,
      });
      if (error) throw error;

      // Set role in profile — works if auto-confirm is on or email is pre-verified
      if (data?.accessToken) {
        try {
          await insforge.auth.setProfile({ role });
        } catch { /* will be set on first login if signup requires email verification */ }
      }

      return data;
    },
    [],
  );

  const signOut = useCallback(async () => {
    if (refreshTimer.current) {
      clearInterval(refreshTimer.current);
      refreshTimer.current = null;
    }
    const { error } = await insforge.auth.signOut();
    if (error) throw error;
    setUser(null);
  }, []);

  return { user, isLoading, isAuthenticated, signIn, signUp, signOut };
}
