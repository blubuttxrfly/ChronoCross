"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { IconBrandGoogle } from "@tabler/icons-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

function AppInput({ label, placeholder, icon, className, ...rest }: InputProps) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="relative w-full min-w-[200px]">
      {label && (
        <label className="mb-2 block text-sm text-[var(--auth-text-primary)]">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          type="text"
          className={`peer relative z-10 h-12 w-full rounded-md border-2 border-[var(--auth-border)] bg-[var(--auth-surface)] px-4 font-light text-[var(--auth-heading)] outline-none drop-shadow-sm transition-all duration-200 ease-in-out placeholder:font-medium placeholder:text-[var(--auth-text-secondary)] focus:bg-[var(--auth-muted-surface)] ${className ?? ""}`}
          placeholder={placeholder}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          {...rest}
        />
        {isHovering && (
          <>
            <div
              className="pointer-events-none absolute top-0 right-0 left-0 z-20 h-[2px] overflow-hidden rounded-t-md"
              style={{
                background: `radial-gradient(30px circle at ${mousePosition.x}px 0px, var(--auth-text-primary) 0%, transparent 70%)`,
              }}
            />
            <div
              className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-[2px] overflow-hidden rounded-b-md"
              style={{
                background: `radial-gradient(30px circle at ${mousePosition.x}px 2px, var(--auth-text-primary) 0%, transparent 70%)`,
              }}
            />
          </>
        )}
        {icon && (
          <div className="absolute top-1/2 right-3 z-20 -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>
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
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

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
    <div className="auth-login flex min-h-screen w-full items-center justify-center bg-[var(--auth-bg)] p-4">
      <div className="card flex h-[min(600px,90vh)] w-full max-w-5xl justify-between overflow-hidden rounded-2xl border border-[var(--auth-border)] bg-[var(--auth-surface)] shadow-[var(--auth-shadow-xl)]">
        <div
          className="relative flex h-full w-full flex-col overflow-hidden px-4 py-6 sm:px-10 lg:w-1/2 lg:px-16"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            className={`pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-gradient-to-r from-purple-300/30 via-blue-300/30 to-pink-300/30 blur-3xl transition-opacity duration-200 ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`,
              transition: "transform 0.1s ease-out",
            }}
          />

          <Link
            href="/"
            className="relative z-10 mb-4 text-sm font-semibold tracking-tight text-[var(--auth-heading)]"
          >
            ChronoCross
          </Link>

          <div className="form-container relative z-10 flex h-full flex-col">
            {!isOtpStep && !isSignupSuccess && (
              <div className="mb-6 flex rounded-lg bg-[var(--auth-muted-surface)] p-1">
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
                    !isSignUp
                      ? "bg-[var(--auth-bg-2)] text-[var(--auth-bg)]"
                      : "text-[var(--auth-text-secondary)] hover:text-[var(--auth-heading)]"
                  }`}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
                    isSignUp
                      ? "bg-[var(--auth-bg-2)] text-[var(--auth-bg)]"
                      : "text-[var(--auth-text-secondary)] hover:text-[var(--auth-heading)]"
                  }`}
                >
                  Sign up
                </button>
              </div>
            )}

            {isSignupSuccess ? (
              <div className="grid h-full gap-4 text-center">
                <div className="mb-2 grid gap-4">
                  <h1 className="text-3xl font-extrabold text-[var(--auth-heading)] md:text-4xl">
                    Check your email
                  </h1>
                  <p className="text-sm text-[var(--auth-text-secondary)]">
                    We sent a confirmation link to{" "}
                    <span className="font-medium text-[var(--auth-heading)]">
                      {pendingEmail ?? email}
                    </span>
                    . Click the link to activate your account, then sign in.
                  </p>
                </div>
                {info && (
                  <p className="text-sm text-emerald-400" role="status">
                    {info}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    onBack?.();
                    setMode("signin");
                  }}
                  className="mx-auto rounded-md bg-[var(--auth-border)] px-6 py-2.5 text-sm text-white transition hover:scale-105"
                >
                  Back to sign in
                </button>
              </div>
            ) : isOtpStep ? (
              <form
                className="grid h-full gap-4 text-center"
                onSubmit={handleOtpSubmit}
              >
                <div className="mb-2 grid gap-4">
                  <h1 className="text-3xl font-extrabold text-[var(--auth-heading)] md:text-4xl">
                    Enter verification code
                  </h1>
                  <p className="text-sm text-[var(--auth-text-secondary)]">
                    We sent a 6-digit code to{" "}
                    <span className="font-medium text-[var(--auth-heading)]">
                      {pendingEmail ?? email}
                    </span>
                  </p>
                </div>

                <AppInput
                  placeholder="123456"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) =>
                    setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  required
                  className="text-center text-lg tracking-[0.35em]"
                />

                {error && (
                  <p className="text-sm text-red-400" role="alert">
                    {error}
                  </p>
                )}

                {info && (
                  <p className="text-sm text-emerald-400" role="status">
                    {info}
                  </p>
                )}

                <div className="flex flex-col items-center justify-center gap-3">
                  <button
                    type="submit"
                    disabled={otpCode.length !== 6}
                    className="group/button relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-md bg-[var(--auth-border)] px-4 py-2 text-xs font-normal text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-[var(--auth-text-primary)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="px-2 py-1 text-sm">Verify and sign in</span>
                  </button>
                  <button
                    type="button"
                    onClick={onResendOtp}
                    className="text-sm text-[var(--auth-text-secondary)] hover:text-[var(--auth-heading)]"
                  >
                    Resend code
                  </button>
                  <button
                    type="button"
                    onClick={onBack}
                    className="text-sm text-[var(--auth-text-secondary)] hover:text-[var(--auth-heading)]"
                  >
                    Back
                  </button>
                </div>
              </form>
            ) : (
              <form
                className="grid h-full gap-4 text-center"
                onSubmit={handleSubmit}
              >
                <div className="mb-2 grid gap-4">
                  <h1 className="text-3xl font-extrabold text-[var(--auth-heading)] md:text-4xl">
                    {isSignUp ? "Create account" : "Sign in"}
                  </h1>
                  <div className="social-container">
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        onClick={onGoogleSignIn}
                        aria-label="Continue with Google"
                        className="group relative z-[1] flex h-12 items-center gap-3 overflow-hidden rounded-full border-2 border-[var(--auth-text-primary)] bg-[var(--auth-bg-2)] px-5 transition hover:scale-105"
                      >
                        <div className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--auth-bg)] transition-transform duration-500 ease-in-out group-hover:scale-y-100" />
                        <span className="z-[2] flex items-center gap-2 text-[var(--auth-bg)] transition-all duration-500 ease-in-out group-hover:text-[var(--auth-text-primary)]">
                          <IconBrandGoogle className="h-5 w-5" />
                          <span className="text-sm font-medium">
                            Continue with Google
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                  <span className="text-sm text-[var(--auth-text-secondary)]">
                    or use your email
                  </span>
                </div>

                <div className="grid items-center gap-4">
                  {isSignUp && (
                    <AppInput
                      placeholder="Full name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      required
                    />
                  )}
                  <AppInput
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                  <AppInput
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                    minLength={6}
                    required
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400" role="alert">
                    {error}
                  </p>
                )}

                {info && (
                  <p className="text-sm text-emerald-400" role="status">
                    {info}
                  </p>
                )}

                <div className="flex items-center justify-center gap-4">
                  <button
                    type="submit"
                    className="group/button relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-md bg-[var(--auth-border)] px-4 py-2 text-xs font-normal text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-[var(--auth-text-primary)]"
                  >
                    <span className="px-2 py-1 text-sm">
                      {isSignUp ? "Sign up with email" : "Continue"}
                    </span>
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                      <div className="relative h-full w-8 bg-white/20" />
                    </div>
                  </button>
                </div>

                {footer && <div className="mt-auto pt-2">{footer}</div>}
              </form>
            )}
          </div>
        </div>

        <div className="relative hidden h-full w-1/2 overflow-hidden lg:block">
          <Image
            src={HERO_IMAGE}
            alt="Neighbors helping each other in the community"
            fill
            priority
            className="object-cover opacity-40"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--auth-bg)] via-transparent to-transparent" />
          <div className="absolute right-8 bottom-8 left-8">
            <p className="text-lg font-semibold text-[var(--auth-heading)]">
              Exchange time, build trust
            </p>
            <p className="mt-2 text-sm text-[var(--auth-text-secondary)]">
              Join your neighborhood time bank and trade skills hour for hour.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login1;
