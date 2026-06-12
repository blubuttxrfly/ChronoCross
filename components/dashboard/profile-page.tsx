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
import { IconArrowRight, IconSettings } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ProfilePage() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push("/auth");
  };

  if (!user) return null;

  return (
    <PageFrame narrow>
      <section className="pb-12 pt-4 sm:pt-8">
        <div className="flex items-start gap-6">
          <MemberAvatar name={user.name} size="xl" />
          <div>
            <h1 className="text-[2rem] font-bold leading-[1.15] tracking-[-0.04em] text-text-primary sm:text-4xl">
              {user.name}
            </h1>
            <p className="mt-2 text-base text-text-secondary">{user.email}</p>
            <p className="mt-1 text-sm text-text-tertiary">
              Member since {USER_TRUST.memberSince}
            </p>
          </div>
        </div>

        <p className="mt-10 text-lg leading-relaxed text-text-secondary">
          You&apos;ve helped{" "}
          <span className="font-semibold text-text-primary">
            {USER_TRUST.neighborsHelped} neighbors
          </span>{" "}
          and have{" "}
          <span className="font-semibold text-text-primary">
            {HOUR_BALANCE.current.toFixed(1)} hours
          </span>{" "}
          to spend. Trust is earned one exchange at a time.
        </p>
      </section>

      <section className="border-t border-border-subtle py-14">
        <SectionHeading title="Your exchanges" />
        <div>
          {RECENT_ACTIVITY.map((item) => (
            <ExchangeRow key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="border-t border-border-subtle py-14">
        <Link
          href="/dashboard/settings"
          className="group flex items-center justify-between py-2"
        >
          <div className="flex items-center gap-4">
            <IconSettings className="h-5 w-5 text-text-tertiary" stroke={1.75} />
            <span className="text-base font-medium text-text-primary">
              Settings & notifications
            </span>
          </div>
          <IconArrowRight className="h-5 w-5 text-text-tertiary transition-transform group-hover:translate-x-0.5" />
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          className="mt-8 text-sm font-medium text-text-tertiary transition-colors hover:text-text-secondary"
        >
          Sign out
        </button>
      </section>
    </PageFrame>
  );
}
