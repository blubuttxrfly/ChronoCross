"use client";

import { ListingCard } from "@/components/app/listing-card";
import { MarketplaceSearch } from "@/components/app/marketplace-search";
import { MemberAvatar } from "@/components/app/member-avatar";
import {
  COMMUNITY_MEMBERS,
  HOUR_BALANCE,
  HOME_FEED,
  MOCK_OFFERS,
  MOCK_REQUESTS,
  USER_TRUST,
} from "@/lib/dashboard-data";
import { formatChronosPrice, MARKETPLACE_CATEGORIES } from "@/lib/marketplace";
import {
  IconArrowRight,
  IconClock,
  IconHeartHandshake,
  IconPlus,
  IconShieldCheck,
  IconSparkles,
} from "@tabler/icons-react";
import Link from "next/link";

function CategoryTile({
  label,
  icon: Icon,
}: {
  label: string;
  icon: (typeof MARKETPLACE_CATEGORIES)[number]["icon"];
}) {
  return (
    <button
      type="button"
      className="group flex h-24 flex-col justify-between rounded-2xl border border-[#e4ded4] bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#cfc6b8] hover:shadow-md"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f6f1e8] text-[#14261f] transition-colors group-hover:bg-[#14261f] group-hover:text-white">
        {Icon ? (
          <Icon className="h-4 w-4" stroke={2} />
        ) : (
          <IconSparkles className="h-4 w-4" stroke={2} />
        )}
      </span>
      <span className="text-sm font-semibold text-[#1d251f]">{label}</span>
    </button>
  );
}

function SectionHeader({
  title,
  subtitle,
  href,
}: {
  title: string;
  subtitle?: string;
  href?: string;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-[#1d251f]">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-[#74776f]">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#14261f]"
        >
          Show all
          <IconArrowRight className="h-4 w-4" stroke={2} />
        </Link>
      )}
    </div>
  );
}

function SmallOpportunity({
  type,
  title,
  category,
  hours,
  memberName,
}: {
  type: "offer" | "request";
  title: string;
  category: string;
  hours: number;
  memberName: string;
}) {
  return (
    <Link
      href={type === "offer" ? "/dashboard/offers" : "/dashboard/requests"}
      className="flex items-center gap-3 rounded-2xl border border-[#e7e1d8] bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <MemberAvatar name={memberName} size="sm" className="!h-11 !w-11" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#1d251f]">{title}</p>
        <p className="mt-0.5 text-xs text-[#74776f]">
          {category} / {memberName}
        </p>
      </div>
      <span className="shrink-0 rounded-full bg-[#f6f1e8] px-3 py-1 text-xs font-semibold text-[#1d251f]">
        {formatChronosPrice(hours)}
      </span>
    </Link>
  );
}

export function DashboardHome() {
  const featuredOffers = MOCK_OFFERS.filter((offer) => offer.status === "active");
  const openRequests = MOCK_REQUESTS.filter((request) => request.status === "open");
  const categories = MARKETPLACE_CATEGORIES.filter((category) => category.id !== "all");

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-11 px-5 py-6 sm:px-8 lg:px-10 lg:py-9">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-[#e6dfd4] bg-[#fbf7ef] p-6 shadow-sm sm:p-8 lg:min-h-[360px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(246,195,91,0.36),transparent_30%),radial-gradient(circle_at_10%_92%,rgba(42,115,78,0.13),transparent_28%)]" />
          <div className="relative max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/78 px-3 py-1.5 text-xs font-semibold text-[#5c5f57] shadow-sm">
              <IconHeartHandshake className="h-4 w-4 text-[#b5791b]" stroke={2} />
              Community time bank
            </p>
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.06] tracking-tight text-[#16241d] sm:text-5xl">
              Find help nearby. Pay with hours.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#646860]">
              Trade one hour of your skills for one hour from someone else.
              Browse neighbors offering repairs, tutoring, gardening, errands,
              and the everyday help that makes life easier.
            </p>
          </div>
          <MarketplaceSearch className="relative mt-8 max-w-4xl" />
        </div>

        <aside className="grid content-start gap-4">
          <div className="rounded-[1.5rem] bg-[#14261f] p-5 text-white shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-white/62">Your balance</p>
                <p className="mt-2 flex items-end gap-2 text-5xl font-semibold tracking-tight">
                  ₡{HOUR_BALANCE.current}
                  <span className="pb-1 text-base font-medium text-white/62">
                    Chronos
                  </span>
                </p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#f6c35b]">
                <IconClock className="h-5 w-5" stroke={2} />
              </span>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
              <div>
                <p className="font-semibold">{USER_TRUST.neighborsHelped}</p>
                <p className="mt-1 text-[11px] text-white/52">Helped</p>
              </div>
              <div>
                <p className="font-semibold">{USER_TRUST.hoursGiven}h</p>
                <p className="mt-1 text-[11px] text-white/52">Given</p>
              </div>
              <div>
                <p className="font-semibold">{USER_TRUST.hoursReceived}h</p>
                <p className="mt-1 text-[11px] text-white/52">Used</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-[#e2ddd4] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf4ee] text-[#24734d]">
                <IconShieldCheck className="h-5 w-5" stroke={2} />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#1d251f]">
                  Trusted by neighbors
                </p>
                <p className="mt-1 text-xs leading-5 text-[#74776f]">
                  Member since {USER_TRUST.memberSince}
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/offers"
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#14261f] text-sm font-semibold text-white transition-colors hover:bg-[#1e352b]"
            >
              <IconPlus className="h-4 w-4" stroke={2} />
              List your time
            </Link>
          </div>
        </aside>
      </section>

      <section>
        <SectionHeader
          title="Browse by what you need"
          subtitle="Quick paths into common time exchanges"
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {categories.map((category) => (
            <CategoryTile key={category.id} {...category} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Popular offers nearby"
          subtitle="Book an hour from someone in the community"
          href="/dashboard/offers"
        />
        <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {featuredOffers.map((offer) => (
            <ListingCard
              key={offer.id}
              type="offer"
              title={offer.title}
              category={offer.category}
              hours={offer.hours}
              memberName={offer.memberName}
              posted={offer.posted}
              href="/dashboard/offers"
            />
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.42fr)]">
        <div>
          <SectionHeader
            title="Neighbors asking for help"
            subtitle="Earn hours by answering open requests"
            href="/dashboard/requests"
          />
          <div className="grid gap-3">
            {openRequests.map((request) => (
              <SmallOpportunity key={request.id} type="request" {...request} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader title="Active members" href="/dashboard/community" />
          <div className="grid gap-3">
            {COMMUNITY_MEMBERS.slice(0, 4).map((member) => (
              <Link
                key={member.id}
                href="/dashboard/community"
                className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <MemberAvatar name={member.name} size="sm" className="!h-11 !w-11" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#1d251f]">
                    {member.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-[#74776f]">
                    {member.skills.join(" / ")}
                  </p>
                </div>
                <IconArrowRight className="h-4 w-4 text-[#9a9d94]" stroke={2} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeader title="Fresh in your network" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_FEED.map((item) => (
            <SmallOpportunity key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}
