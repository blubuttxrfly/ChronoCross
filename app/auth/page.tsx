import { Suspense } from "react";
import { AuthPageClient } from "./auth-page-client";

function AuthLoading() {
  return (
    <div className="auth-login flex min-h-screen items-center justify-center bg-[var(--auth-bg)]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--auth-border)] border-t-[var(--auth-text-primary)]" />
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<AuthLoading />}>
      <AuthPageClient />
    </Suspense>
  );
}
