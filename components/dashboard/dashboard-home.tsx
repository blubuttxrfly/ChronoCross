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
      className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#e4ded4] bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#cfc6b8] hover:shadow-md"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f6f1e8] text-[#14261f] transition-colors group-hover:bg-[#14261f] group-hover:text-white">
        {Icon ? (
          <Icon className="h-5 w-5" stroke={2} />
        ) : (
          <IconSparkles className="h-5 w-5" stroke={2} />
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
    <div className="mb-6 flex items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-[#1d251f]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1.5 text-sm text-[#74776f]">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-[#14261f] transition-colors hover:bg-[#f4f1ea]"
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
      className="flex items-center gap-3 rounded-2xl border border-[#e7e1d8] bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <MemberAvatar name={memberName} size="sm" className="!h-11 !w-11" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#1d251f]">{title}</p>
        <p className="mt-0.5 text-xs text-[#74776f]">
          {category}
        </p>
      </div>
      <span className="shrink-0 rounded-full bg-[#f6f1e8] px-3 py-1.5 text-xs font-semibold text-[#1d251f]">
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Hero Section */}
      <section className="mb-8 sm:mb-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main Hero Card */}
          <div className="relative overflow-hidden rounded-3xl border border-[#e6dfd4] bg-gradient-to-br from-[#fbf7ef] to-[#f5f0e8] p-6 sm:p-8 shadow-sm">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-[#5c5f57] shadow-sm backdrop-blur-sm">
                <IconHeartHandshake className="h-4 w-4 text-[#b5791b]" stroke={2} />
                Community Time Bank
              </div>
              <h1 className="mt-4 sm:mt-5 text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-[#16241d]">
                Find help nearby. Pay with hours.
              </h1>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-[#646860]">
                Trade one hour of your skills for one hour from someone else.
                Browse neighbors offering repairs, tutoring, gardening, errands,
                and the everyday help that makes life easier.
              </p>
            </div>
            <div className="relative z-10 mt-6 max-w-xl">
              <MarketplaceSearch />
            </div>
          </div>

          {/* Sidebar Cards */}
          <aside className="flex flex-col gap-4">
            {/* Balance Card */}
            <div className="rounded-3xl bg-[#14261f] p-6 text-white shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-white/70">Your Balance</p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <p className="text-4xl sm:text-5xl font-semibold tracking-tight">₡{HOUR_BALANCE.current}</p>
                    <span className="text-base font-medium text-white/70">Chronos</span>
                  </div>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#f6c35b]">
                  <IconClock className="h-6 w-6" stroke={2} />
                </span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/15 pt-5">
                <div>
                  <p className="text-lg font-semibold">{USER_TRUST.neighborsHelped}</p>
                  <p className="mt-1 text-xs text-white/60">Helped</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{USER_TRUST.hoursGiven}</p>
                  <p className="mt-1 text-xs text-white/60">Given</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{USER_TRUST.hoursReceived}</p>
                  <p className="mt-1 text-xs text-white/60">Received</p>
                </div>
              </div>
            </div>

            {/* Trust Card */}
            <div className="rounded-3xl border border-[#e2ddd4] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf4ee] text-[#24734d]">
                  <IconShieldCheck className="h-6 w-6" stroke={2} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#1d251f]">
                    Trusted by neighbors
                  </p>
                  <p className="mt-1 text-xs text-[#74776f]">
                    Member since {USER_TRUST.memberSince}
                  </p>
                </div>
              </div>
              <Link
                href="/dashboard/offers"
                className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#14261f] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1e352b]"
              >
                <IconPlus className="h-4 w-4" stroke={2} />
                List your time
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-8 sm:mb-10">
        <SectionHeader
          title="Browse by category"
          subtitle="Find the perfect exchange for your needs"
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
          {categories.map((category) => (
            <CategoryTile key={category.id} {...category} />
          ))}
        </div>
      </section>

      {/* Featured Offers Section */}
      <section className="mb-8 sm:mb-10">
        <SectionHeader
          title="Popular offers nearby"
          subtitle="Book an hour from someone in the community"
          href="/dashboard/offers"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Requests + Community Grid */}
      <section className="mb-8 sm:mb-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Requests Column */}
        <div>
          <SectionHeader
            title="Neighbors asking for help"
            subtitle="Earn Chronos by answering open requests"
            href="/dashboard/requests"
          />
          <div className="flex flex-col gap-3">
            {openRequests.map((request) => (
              <SmallOpportunity key={request.id} type="request" {...request} />
            ))}
          </div>
        </div>

        {/* Community Members Column */}
        <div>
          <SectionHeader title="Active members" href="/dashboard/community" />
          <div className="flex flex-col gap-3">
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
                    {member.skills.join(" • ")}
                  </p>
                </div>
                <IconArrowRight className="h-4 w-4 shrink-0 text-[#9a9d94]" stroke={2} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fresh in Network Section */}
      <section>
        <SectionHeader
          title="Fresh in your network"
          subtitle="New opportunities just for you"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOME_FEED.map((item) => (
            <SmallOpportunity key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}
