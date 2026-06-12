"use client";

import { PageFrame } from "@/components/app/page-frame";
import { useAuth } from "@/lib/auth";
import { IconArrowLeft, IconBell, IconMail, IconUser } from "@tabler/icons-react";
import Link from "next/link";

function SettingsRow({
  label,
  description,
  icon: Icon,
  children,
}: {
  label: string;
  description: string;
  icon: typeof IconUser;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/58 py-6 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0ab4ff] to-[#00c986] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.58)]">
          <Icon className="h-5 w-5" stroke={1.8} />
        </span>
        <div>
          <p className="text-base font-semibold text-[#0f3442]">{label}</p>
          <p className="mt-1 max-w-xl text-sm leading-6 text-[#5e8490]">
            {description}
          </p>
        </div>
      </div>
      <div className="sm:text-right">{children}</div>
    </div>
  );
}

function Toggle({ defaultChecked }: { defaultChecked?: boolean }) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span className="h-7 w-12 rounded-full border border-white/70 bg-white/54 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-colors peer-checked:bg-gradient-to-r peer-checked:from-[#0ab4ff] peer-checked:to-[#00c986] after:absolute after:top-1 after:left-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-5" />
    </label>
  );
}

export function SettingsPage() {
  const { user } = useAuth();

  return (
    <PageFrame wide className="pb-16">
      <section className="aero-hero rounded-[1.75rem] p-6 text-white sm:p-8">
        <Link
          href="/dashboard/profile"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/82"
        >
          <IconArrowLeft className="h-4 w-4" stroke={2} />
          Back to profile
        </Link>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          Settings
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/82">
          Manage how your identity, contact details, and time-bank
          notifications appear across ChronoShare.
        </p>
      </section>

      <section className="aero-panel mt-8 rounded-[1.75rem] p-6">
        <SettingsRow
          label="Display name"
          description="How other members see you in the community."
          icon={IconUser}
        >
          <p className="text-base font-semibold text-[#0f3442]">
            {user?.name ?? "Member"}
          </p>
        </SettingsRow>

        <SettingsRow
          label="Email"
          description="Used for exchange notifications and account recovery."
          icon={IconMail}
        >
          <p className="text-base font-semibold text-[#0f3442]">
            {user?.email ?? "No email"}
          </p>
        </SettingsRow>

        <SettingsRow
          label="Exchange notifications"
          description="Get notified when someone responds to your offers or requests."
          icon={IconBell}
        >
          <Toggle defaultChecked />
        </SettingsRow>

        <SettingsRow
          label="Community digest"
          description="Weekly summary of new offers and requests in your network."
          icon={IconBell}
        >
          <Toggle />
        </SettingsRow>
      </section>
    </PageFrame>
  );
}
