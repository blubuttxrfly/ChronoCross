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
      <section className="aero-hero relative overflow-hidden rounded-[1.75rem] p-6 sm:p-8">
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#8a5b13]">
              Skills available
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
              Share what you&apos;re good at.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/82">
              List a skill or favor. Neighbors book your time and you earn
              hours to spend later.
            </p>
          </div>
          <Link
            href="/dashboard/offers"
            className="aero-chip inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-[#007ca9]"
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
          <h2 className="text-2xl font-semibold tracking-tight text-[#0f3442]">
            Popular offers nearby
          </h2>
          <p className="mt-1 text-sm text-[#5e8490]">
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
