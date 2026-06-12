"use client";

import { Login1, type Login1Mode } from "@/components/ui/login-1";
import { isDevLoginEnabled, useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthPage() {
  const { user, isLoading, signUp, signIn, devLogin } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<Login1Mode>("signin");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  const handleSubmit = (data: {
    name?: string;
    email: string;
    password: string;
  }) => {
    setError("");

    try {
      if (mode === "signup") {
        if (!data.name?.trim()) {
          setError("Please enter your name.");
          return;
        }
        signUp(data.name, data.email, data.password);
      } else {
        const success = signIn(data.email, data.password);
        if (!success) {
          setError("Invalid email or password.");
          return;
        }
      }
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (isLoading || user) {
    return (
      <div className="auth-login flex min-h-screen items-center justify-center bg-[var(--auth-bg)]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--auth-border)] border-t-[var(--auth-text-primary)]" />
      </div>
    );
  }

  return (
    <Login1
      mode={mode}
      onModeChange={setMode}
      onSubmit={handleSubmit}
      error={error}
      footer={
        isDevLoginEnabled ? (
          <div className="border-t border-[var(--auth-border)] pt-4">
            <p className="mb-3 text-center text-xs text-[var(--auth-text-secondary)]">
              Development only
            </p>
            <button
              type="button"
              onClick={() => {
                devLogin();
                router.push("/dashboard");
              }}
              className="w-full rounded-lg border border-dashed border-amber-500/40 bg-amber-500/10 py-2.5 text-sm font-medium text-amber-200 transition hover:border-amber-500/60 hover:bg-amber-500/15"
            >
              Continue as Dev User
            </button>
          </div>
        ) : undefined
      }
    />
  );
}
