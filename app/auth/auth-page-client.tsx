"use client";

import {
  Login1,
  type Login1Mode,
  type Login1Step,
} from "@/components/ui/login-1";
import { isDevLoginEnabled, useAuth } from "@/lib/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function authErrorMessage(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes("Invalid login credentials")) {
      return "Invalid email or password.";
    }
    if (error.message.includes("User already registered")) {
      return "An account with this email already exists.";
    }
    return error.message;
  }
  return "Something went wrong.";
}

export function AuthPageClient() {
  const {
    user,
    isLoading,
    signUp,
    signInStart,
    verifySignInOtp,
    resendSignInOtp,
    signInWithGoogle,
    devLogin,
  } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Login1Mode>("signin");
  const [step, setStep] = useState<Login1Step>("credentials");
  const [pendingEmail, setPendingEmail] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    if (searchParams.get("error") === "auth_callback_failed") {
      setError("Sign in failed. Please try again.");
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  const resetMessages = () => {
    setError("");
    setInfo("");
  };

  const handleSubmit = async (data: {
    name?: string;
    email: string;
    password: string;
  }) => {
    resetMessages();

    try {
      if (mode === "signup") {
        if (!data.name?.trim()) {
          setError("Please enter your name.");
          return;
        }

        const result = await signUp(data.name, data.email, data.password);
        setPendingEmail(data.email.trim().toLowerCase());

        if (result.needsEmailConfirmation) {
          setStep("signup-success");
          setInfo("Confirm your email to finish creating your account.");
          return;
        }

        router.push("/dashboard");
        return;
      }

      const email = data.email.trim().toLowerCase();
      await signInStart(email, data.password);
      setPendingEmail(email);
      setStep("otp");
      setInfo("Verification code sent. Check your inbox.");
    } catch (err) {
      setError(authErrorMessage(err));
    }
  };

  const handleVerifyOtp = async (code: string) => {
    resetMessages();

    try {
      await verifySignInOtp(pendingEmail, code);
      router.push("/dashboard");
    } catch (err) {
      setError(authErrorMessage(err));
    }
  };

  const handleResendOtp = async () => {
    resetMessages();

    try {
      await resendSignInOtp(pendingEmail);
      setInfo("A new verification code was sent.");
    } catch (err) {
      setError(authErrorMessage(err));
    }
  };

  const handleGoogleSignIn = async () => {
    resetMessages();

    try {
      await signInWithGoogle();
    } catch (err) {
      setError(authErrorMessage(err));
    }
  };

  const handleBack = () => {
    resetMessages();
    setStep("credentials");
  };

  if (isLoading || user) {
    return (
      <div className="auth-login flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[rgba(42,122,151,0.18)] border-t-[#0aa8ff]" />
      </div>
    );
  }

  return (
    <Login1
      mode={mode}
      step={step}
      pendingEmail={pendingEmail}
      onModeChange={(next) => {
        setMode(next);
        resetMessages();
        setStep("credentials");
      }}
      onSubmit={handleSubmit}
      onVerifyOtp={handleVerifyOtp}
      onResendOtp={handleResendOtp}
      onGoogleSignIn={handleGoogleSignIn}
      onBack={handleBack}
      error={error}
      info={info}
      footer={
        isDevLoginEnabled && step === "credentials" ? (
          <div>
            <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.08em] text-[var(--auth-text-secondary)]">
              Development only
            </p>
            <button
              type="button"
              onClick={() => {
                devLogin();
                router.push("/dashboard");
              }}
              className="w-full rounded-xl border border-dashed border-[rgba(212,130,10,0.35)] bg-[rgba(254,243,226,0.75)] py-2.5 text-sm font-medium text-[#9a6208] transition hover:border-[rgba(212,130,10,0.55)] hover:bg-[rgba(254,243,226,0.95)]"
            >
              Continue as Dev User
            </button>
          </div>
        ) : undefined
      }
    />
  );
}
