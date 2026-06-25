"use client";
import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import type { UserRole } from "@/lib/types";

interface AuthFormProps {
  mode: "login" | "signup";
  onSuccess?: () => void;
}

export default function AuthForm({ mode: initialMode, onSuccess }: AuthFormProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("participant");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "login") {
        await signIn(email, password);
        onSuccess?.();
      } else {
        await signUp(email, password, name, role);
        setSignupSuccess(true);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (signupSuccess) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="border border-rule bg-paper p-10">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-leaf mb-4">
            Account Created
          </div>
          <h2 className="font-display text-[28px] leading-[1.1] tracking-tightest text-ink mb-3">
            Check your email
          </h2>
          <p className="text-[14px] text-inkSoft leading-relaxed mb-8">
            We sent a confirmation link to <span className="text-ink font-medium">{email}</span>.
            Please verify your email before signing in.
          </p>
          <button
            onClick={() => {
              setMode("login");
              setSignupSuccess(false);
              setPassword("");
            }}
            className="w-full py-3 bg-rust text-white text-[13px] font-medium tracking-wide hover:bg-rustDeep transition-colors"
          >
            Continue to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="border border-rule bg-paper p-10">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-rust mb-4">
          {mode === "login" ? "Welcome Back" : "Join the Platform"}
        </div>
        <h2 className="font-display text-[28px] leading-[1.1] tracking-tightest text-ink mb-1">
          {mode === "login" ? "Sign in" : "Create account"}
        </h2>
        <p className="text-[14px] text-inkSoft mb-8">
          {mode === "login"
            ? "Enter your credentials to continue."
            : "Set up your evaluator or participant account."}
        </p>

        {error && (
          <div className="mb-6 py-3 px-4 border border-rust/30 bg-rustSoft text-[13px] text-rustDeep">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "signup" && (
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-inkMuted mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-transparent border-b border-rule py-2.5 text-[14px] text-ink placeholder:text-inkMuted/50 focus:border-rust focus:outline-none transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-inkMuted mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent border-b border-rule py-2.5 text-[14px] text-ink placeholder:text-inkMuted/50 focus:border-rust focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-inkMuted mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              minLength={6}
              className="w-full bg-transparent border-b border-rule py-2.5 text-[14px] text-ink placeholder:text-inkMuted/50 focus:border-rust focus:outline-none transition-colors"
            />
          </div>

          {mode === "signup" && (
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-inkMuted mb-2">
                Role
              </label>
              <div className="flex gap-3">
                {(["participant", "reviewer"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`flex-1 py-2.5 text-[13px] border transition-colors ${
                      role === r
                        ? "border-rust bg-rustSoft text-rustDeep"
                        : "border-rule text-inkSoft hover:border-inkMuted"
                    }`}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-rust text-white text-[13px] font-medium tracking-wide hover:bg-rustDeep transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-3"
          >
            {loading
              ? mode === "login"
                ? "Signing in..."
                : "Creating account..."
              : mode === "login"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-rule text-center">
          <p className="text-[13px] text-inkSoft">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError(null);
              }}
              className="text-rust hover:text-rustDeep transition-colors font-medium"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
