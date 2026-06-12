"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/auth");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface-subtle">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
