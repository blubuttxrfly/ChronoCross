"use client";

import { ListingCard, ListingGrid } from "@/components/app/listing-card";
import { MarketplaceSearch } from "@/components/app/marketplace-search";
import { PageFrame } from "@/components/app/page-frame";
import { MOCK_REQUESTS } from "@/lib/dashboard-data";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useMemo, useState } from "react";

function matchesCategory(category: string, filter: string) {
  if (filter === "all") return true;
  return category.toLowerCase() === filter;
}

export function RequestsPage() {
  const [category, setCategory] = useState("all");
  const openRequests = useMemo(
    () =>
      MOCK_REQUESTS.filter(
        (r) => r.status === "open" && matchesCategory(r.category, category),
      ),
    [category],
  );

  return (
    <PageFrame wide className="pb-16">
      <section className="aero-hero relative overflow-hidden rounded-[1.75rem] p-6 sm:p-8">
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-white/86">
              Favors needed
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
              Get help without money changing hands.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/82">
              Browse favors neighbors need, or post your own request and pay
              with hours you&apos;ve earned.
            </p>
          </div>
          <Link
            href="/dashboard/requests"
            className="aero-chip inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-[#007ca9]"
          >
            <IconPlus className="h-4 w-4" stroke={2} />
            Post a request
          </Link>
        </div>
        <div className="relative mt-8 max-w-4xl">
          <MarketplaceSearch onCategoryChange={setCategory} />
        </div>
      </section>

      <section className="flex items-center justify-between gap-4 py-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#0f3442]">
            Open requests nearby
          </h2>
          <p className="mt-1 text-sm text-[#5e8490]">
            {openRequests.length} request{openRequests.length === 1 ? "" : "s"} waiting for help
          </p>
        </div>
      </section>

      <ListingGrid>
        {openRequests.map((request) => (
          <ListingCard
            key={request.id}
            type="request"
            title={request.title}
            category={request.category}
            hours={request.hours}
            memberName={request.memberName}
            posted={request.posted}
          />
        ))}
      </ListingGrid>
    </PageFrame>
  );
}
