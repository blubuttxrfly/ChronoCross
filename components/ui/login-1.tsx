"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Clock } from "lucide-react";

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function AuthField({ label, className, id, ...rest }: FieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="auth-login__field">
      <label htmlFor={fieldId} className="auth-login__label">
        {label}
      </label>
      <input
        id={fieldId}
        className={`auth-login__input ${className ?? ""}`}
        {...rest}
      />
    </div>
  );
}

export type Login1Mode = "signin" | "signup";
export type Login1Step = "credentials" | "otp" | "signup-success";

export type Login1Props = {
  mode?: Login1Mode;
  step?: Login1Step;
  pendingEmail?: string;
  onModeChange?: (mode: Login1Mode) => void;
  onSubmit?: (data: {
    name?: string;
    email: string;
    password: string;
  }) => void;
  onVerifyOtp?: (code: string) => void;
  onResendOtp?: () => void;
  onGoogleSignIn?: () => void;
  onBack?: () => void;
  error?: string;
  info?: string;
  footer?: React.ReactNode;
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=900&fit=crop&q=80";

function AuthAlerts({
  error,
  info,
}: {
  error?: string;
  info?: string;
}) {
  return (
    <>
      {error && (
        <p className="auth-login__alert auth-login__alert--error" role="alert">
          {error}
        </p>
      )}
      {info && (
        <p className="auth-login__alert auth-login__alert--info" role="status">
          {info}
        </p>
      )}
    </>
  );
}

export function Login1({
  mode: modeProp,
  step = "credentials",
  pendingEmail,
  onModeChange,
  onSubmit,
  onVerifyOtp,
  onResendOtp,
  onGoogleSignIn,
  onBack,
  error,
  info,
  footer,
}: Login1Props) {
  const [internalMode, setInternalMode] = React.useState<Login1Mode>("signin");
  const mode = modeProp ?? internalMode;

  const setMode = (next: Login1Mode) => {
    if (modeProp === undefined) setInternalMode(next);
    onModeChange?.(next);
  };

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [otpCode, setOtpCode] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.({
      name: mode === "signup" ? name : undefined,
      email,
      password,
    });
  };

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onVerifyOtp?.(otpCode);
  };

  const isSignUp = mode === "signup";
  const isOtpStep = step === "otp";
  const isSignupSuccess = step === "signup-success";

  return (
    <div className="auth-login">
      <div className="auth-login__shell card">
        <div className="auth-login__panel">
          <Link href="/" className="auth-login__brand">
            <span className="auth-login__logo" aria-hidden>
              <Clock size={18} strokeWidth={2.2} />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              ChronoCross
            </span>
          </Link>

          <div className="auth-login__content">
            <div className="auth-login__content-inner">
              {!isOtpStep && !isSignupSuccess && (
                <div className="auth-login__tabs">
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className={`auth-login__tab ${!isSignUp ? "auth-login__tab--active" : ""}`}
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className={`auth-login__tab ${isSignUp ? "auth-login__tab--active" : ""}`}
                  >
                    Sign up
                  </button>
                </div>
              )}

              {isSignupSuccess ? (
                <div className="grid gap-6 text-left">
                  <div className="grid gap-2">
                    <h1 className="font-display text-3xl font-semibold tracking-tight text-[var(--auth-heading)]">
                      Check your email
                    </h1>
                    <p className="text-sm leading-relaxed text-[var(--auth-text-secondary)]">
                      We sent a confirmation link to{" "}
                      <span className="font-medium text-[var(--auth-heading)]">
                        {pendingEmail ?? email}
                      </span>
                      . Open it to activate your account, then return here to sign
                      in.
                    </p>
                  </div>
                  <AuthAlerts info={info} />
                  <button
                    type="button"
                    onClick={() => {
                      onBack?.();
                      setMode("signin");
                    }}
                    className="auth-login__submit"
                  >
                    Back to sign in
                  </button>
                </div>
              ) : isOtpStep ? (
                <form className="auth-login__form" onSubmit={handleOtpSubmit}>
                  <div className="grid gap-2 text-left">
                    <h1 className="font-display text-3xl font-semibold tracking-tight text-[var(--auth-heading)]">
                      Verify your email
                    </h1>
                    <p className="text-sm leading-relaxed text-[var(--auth-text-secondary)]">
                      Enter the 6-digit code sent to{" "}
                      <span className="font-medium text-[var(--auth-heading)]">
                        {pendingEmail ?? email}
                      </span>
                    </p>
                  </div>

                  <AuthField
                    label="Verification code"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) =>
                      setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="000000"
                    required
                    className="text-center text-lg tracking-[0.35em]"
                  />

                  <AuthAlerts error={error} info={info} />

                  <button
                    type="submit"
                    disabled={otpCode.length !== 6}
                    className="auth-login__submit"
                  >
                    Verify and sign in
                  </button>

                  <div className="flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={onResendOtp}
                      className="auth-login__link"
                    >
                      Resend code
                    </button>
                    <button
                      type="button"
                      onClick={onBack}
                      className="auth-login__link"
                    >
                      Use a different account
                    </button>
                  </div>
                </form>
              ) : (
                <form className="auth-login__form" onSubmit={handleSubmit}>
                  <div className="grid gap-2 text-left">
                    <h1 className="font-display text-3xl font-semibold tracking-tight text-[var(--auth-heading)]">
                      {isSignUp ? "Create your account" : "Welcome back"}
                    </h1>
                    <p className="text-sm text-[var(--auth-text-secondary)]">
                      {isSignUp
                        ? "Join your neighborhood time bank with email."
                        : "Sign in to manage offers, requests, and your hour balance."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onGoogleSignIn}
                    className="auth-login__google"
                    aria-label="Continue with Google"
                  >
                    <IconBrandGoogle className="h-5 w-5" />
                    Continue with Google
                  </button>

                  <div className="auth-login__divider">or continue with email</div>

                  <div className="grid gap-4">
                    {isSignUp && (
                      <AuthField
                        label="Full name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        placeholder="Alex Rivera"
                        required
                      />
                    )}
                    <AuthField
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                    />
                    <AuthField
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete={isSignUp ? "new-password" : "current-password"}
                      placeholder={isSignUp ? "At least 6 characters" : "Your password"}
                      minLength={6}
                      required
                    />
                  </div>

                  <AuthAlerts error={error} info={info} />

                  <button type="submit" className="auth-login__submit">
                    {isSignUp ? "Create account" : "Continue to verification"}
                  </button>

                  {footer && (
                    <div className="auth-login__footer">
                      {footer}
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        <aside className="auth-login__hero">
          <Image
            src={HERO_IMAGE}
            alt="Neighbors supporting each other in the community"
            fill
            priority
            className="object-cover"
            sizes="48vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,51,68,0.75)] via-[rgba(8,51,68,0.15)] to-transparent" />
          <div className="auth-login__hero-copy">
            <p className="font-display text-xl font-semibold text-white">
              Exchange time, build trust
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/82">
              Join your neighborhood time bank and trade skills hour for hour.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Login1;
