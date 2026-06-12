"use client";

import { PageFrame } from "@/components/app/page-frame";
import { useAuth } from "@/lib/auth";
import Link from "next/link";

function SettingsRow({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border-subtle py-8 last:border-0">
      <p className="text-base font-semibold text-text-primary">{label}</p>
      <p className="mt-1 text-[15px] leading-relaxed text-text-secondary">
        {description}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function SettingsPage() {
  const { user } = useAuth();

  return (
    <PageFrame narrow>
      <section className="pb-8 pt-4 sm:pt-8">
        <Link
          href="/dashboard/profile"
          className="text-sm font-medium text-text-tertiary hover:text-text-secondary"
        >
          ← Back to profile
        </Link>
        <h1 className="mt-6 text-[2rem] font-bold tracking-[-0.04em] text-text-primary sm:text-4xl">
          Settings
        </h1>
        <p className="mt-3 text-lg text-text-secondary">
          How you appear and how we reach you.
        </p>
      </section>

      <section className="border-t border-border-subtle">
        <SettingsRow
          label="Display name"
          description="How other members see you in the community."
        >
          <p className="text-base text-text-primary">{user?.name ?? "—"}</p>
        </SettingsRow>

        <SettingsRow
          label="Email"
          description="Used for exchange notifications and account recovery."
        >
          <p className="text-base text-text-primary">{user?.email ?? "—"}</p>
        </SettingsRow>

        <SettingsRow
          label="Exchange notifications"
          description="Get notified when someone responds to your offers or requests."
        >
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              defaultChecked
              className="peer sr-only"
              aria-label="Exchange notifications"
            />
            <span className="h-6 w-11 rounded-full bg-surface-muted transition-colors peer-checked:bg-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5" />
          </label>
        </SettingsRow>

        <SettingsRow
          label="Community digest"
          description="Weekly summary of new offers and requests in your network."
        >
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              aria-label="Community digest"
            />
            <span className="h-6 w-11 rounded-full bg-surface-muted transition-colors peer-checked:bg-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5" />
          </label>
        </SettingsRow>
      </section>
    </PageFrame>
  );
}
