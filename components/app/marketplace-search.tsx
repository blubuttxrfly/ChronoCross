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
    <div className={cn("w-full", className)}>
      {/* Search Bar */}
      <div className="relative">
        <div className="flex h-[60px] items-center overflow-hidden rounded-full border border-[#d4cfc4] bg-white shadow-sm transition-shadow focus-within:shadow-md focus-within:ring-2 focus-within:ring-[#14261f]/10">
          {/* Search Icon */}
          <div className="flex h-full items-center pl-5 pr-3">
            <IconSearch
              className="h-5 w-5 shrink-0 text-[#6b6f66]"
              stroke={1.75}
            />
          </div>

          {/* Input Field */}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gardening, repairs, tutoring..."
            className="min-w-0 flex-1 bg-transparent text-base font-medium text-[#1d251f] placeholder:text-[#8a8f85] focus:outline-none"
          />

          {/* Search Button */}
          <div className="pr-2">
            <button
              type="button"
              className="h-[44px] rounded-full bg-[#14261f] px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1e352b] active:scale-[0.98]"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {MARKETPLACE_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const active = category === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategory(cat.id)}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-all duration-150",
                "min-w-[88px] justify-center",
                active
                  ? "border-[#14261f] bg-[#14261f] text-white shadow-sm"
                  : "border-[#d4cfc4] bg-white text-[#5d625b] hover:border-[#14261f]/40 hover:text-[#14261f]"
              )}
            >
              {Icon && (
                <Icon className="h-4 w-4 shrink-0" stroke={1.75} />
              )}
              <span className="whitespace-nowrap">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
