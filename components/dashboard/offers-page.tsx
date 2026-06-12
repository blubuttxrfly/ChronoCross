"use client";

import { ListingCard, ListingGrid } from "@/components/app/listing-card";
import { MarketplaceSearch } from "@/components/app/marketplace-search";
import { PageFrame } from "@/components/app/page-frame";
import { MOCK_OFFERS } from "@/lib/dashboard-data";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useMemo, useState } from "react";

function matchesCategory(category: string, filter: string) {
  if (filter === "all") return true;
  return category.toLowerCase() === filter;
}

export function OffersPage() {
  const [category, setCategory] = useState("all");
  const activeOffers = useMemo(
    () =>
      MOCK_OFFERS.filter(
        (o) => o.status === "active" && matchesCategory(o.category, category),
      ),
    [category],
  );

  return (
    <PageFrame wide className="pb-16">
      <section className="relative overflow-hidden rounded-[1.75rem] border border-[#e6dfd4] bg-[#fbf7ef] p-6 shadow-sm sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(246,195,91,0.34),transparent_28%),radial-gradient(circle_at_14%_90%,rgba(42,115,78,0.13),transparent_28%)]" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#8a5b13]">
              Skills available
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.08] tracking-tight text-[#16241d] sm:text-5xl">
              Share what you&apos;re good at.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#646860]">
              List a skill or favor. Neighbors book your time and you earn
              hours to spend later.
            </p>
          </div>
          <Link
            href="/dashboard/offers"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#14261f] px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1e352b]"
          >
            <IconPlus className="h-4 w-4" stroke={2} />
            List your time
          </Link>
        </div>
        <div className="relative mt-8 max-w-4xl">
          <MarketplaceSearch onCategoryChange={setCategory} />
        </div>
      </section>

      <section className="flex items-center justify-between gap-4 py-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#1d251f]">
            Popular offers nearby
          </h2>
          <p className="mt-1 text-sm text-[#74776f]">
            {activeOffers.length} listing{activeOffers.length === 1 ? "" : "s"} ready to book
          </p>
        </div>
      </section>

      <ListingGrid>
        {activeOffers.map((offer) => (
          <ListingCard
            key={offer.id}
            type="offer"
            title={offer.title}
            category={offer.category}
            hours={offer.hours}
            memberName={offer.memberName}
            posted={offer.posted}
          />
        ))}
      </ListingGrid>
    </PageFrame>
  );
}
