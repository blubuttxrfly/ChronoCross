import { Suspense } from "react";
import { AuthPageClient } from "./auth-page-client";

function AuthLoading() {
  return (
    <div className="auth-login flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[rgba(42,122,151,0.18)] border-t-[#0aa8ff]" />
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
