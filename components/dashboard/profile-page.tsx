"use client";

import { ExchangeRow } from "@/components/app/exchange-row";
import { MemberAvatar } from "@/components/app/member-avatar";
import { PageFrame } from "@/components/app/page-frame";
import { SectionHeading } from "@/components/app/section-heading";
import { useAuth } from "@/lib/auth";
import {
  HOUR_BALANCE,
  RECENT_ACTIVITY,
  USER_TRUST,
} from "@/lib/dashboard-data";
import {
  IconArrowRight,
  IconClockHour4,
  IconLogout,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ProfileMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof IconClockHour4;
}) {
  return (
    <div className="aero-panel rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-semibold text-[#008ac1]">{value}</p>
          <p className="mt-1 text-sm text-[#5e8490]">{label}</p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#0ab4ff] to-[#00c986] text-white">
          <Icon className="h-5 w-5" stroke={1.8} />
        </span>
      </div>
    </div>
  );
}

export function ProfilePage() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push("/auth");
  };

  if (!user) return null;

  return (
    <PageFrame wide className="pb-16">
      <section className="aero-hero rounded-[1.75rem] p-6 text-white sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-5">
            <MemberAvatar
              name={user.name}
              size="xl"
              className="ring-4 ring-white/42"
            />
            <div>
              <p className="text-sm font-semibold text-white/78">
                Member profile
              </p>
              <h1 className="mt-1 text-4xl font-semibold tracking-tight">
                {user.name}
              </h1>
              <p className="mt-2 text-sm text-white/78">{user.email}</p>
              <p className="mt-1 text-sm text-white/70">
                Member since {USER_TRUST.memberSince}
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/settings"
            className="aero-chip inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-[#007ca9]"
          >
            <IconSettings className="h-4 w-4" stroke={2} />
            Settings
          </Link>
        </div>
      </section>

      <section className="grid gap-4 py-8 md:grid-cols-3">
        <ProfileMetric
          label="Available balance"
          value={`${HOUR_BALANCE.current.toFixed(1)}h`}
          icon={IconClockHour4}
        />
        <ProfileMetric
          label="Neighbors helped"
          value={USER_TRUST.neighborsHelped.toString()}
          icon={IconUsers}
        />
        <ProfileMetric
          label="Hours received"
          value={`${USER_TRUST.hoursReceived}h`}
          icon={IconArrowRight}
        />
      </section>

      <section className="aero-panel rounded-[1.75rem] p-6">
        <SectionHeading title="Your exchanges" />
        <div>
          {RECENT_ACTIVITY.map((item) => (
            <ExchangeRow key={item.id} item={item} />
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={handleSignOut}
        className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-white/52 px-5 text-sm font-semibold text-[#315462] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-colors hover:bg-white/70"
      >
        <IconLogout className="h-4 w-4" stroke={2} />
        Sign out
      </button>
    </PageFrame>
  );
}
