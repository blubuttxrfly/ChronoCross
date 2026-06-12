"use client";

import { MARKETPLACE_CATEGORIES } from "@/lib/marketplace";
import { cn } from "@/lib/utils";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

type MarketplaceSearchProps = {
  onCategoryChange?: (category: string) => void;
  className?: string;
};

export function MarketplaceSearch({
  onCategoryChange,
  className,
}: MarketplaceSearchProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const handleCategory = (id: string) => {
    setCategory(id);
    onCategoryChange?.(id);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search Bar */}
      <div className="flex min-h-[56px] overflow-hidden rounded-full border border-[#ded8cf] bg-white shadow-[0_10px_32px_rgba(31,35,29,0.08)] transition-shadow focus-within:shadow-[0_16px_42px_rgba(31,35,29,0.12)]">
        <div className="flex min-w-0 flex-1 items-center gap-3 px-5 py-3 sm:px-6">
          <IconSearch
            className="h-5 w-5 shrink-0 text-[#77756d]"
            stroke={1.75}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gardening, repairs, errands..."
            className="min-w-0 flex-1 bg-transparent text-[15px] font-medium text-[#1a1a1a] placeholder:text-[#929087] focus:outline-none"
          />
        </div>
        <div className="shrink-0 p-1.5">
          <button
            type="button"
            className="h-full rounded-full bg-[#14261f] px-6 py-2.5 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#1e352b] active:scale-[0.98]"
          >
            Search
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {MARKETPLACE_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const active = category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategory(cat.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-150",
                active
                  ? "border-[#14261f] bg-[#14261f] text-white shadow-sm"
                  : "border-[#ded8cf] bg-white/86 text-[#575c55] hover:border-[#14261f]/35 hover:text-[#1d251f]",
              )}
            >
              {Icon && <Icon className="h-4 w-4 shrink-0" stroke={1.75} />}
              <span className="whitespace-nowrap">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
