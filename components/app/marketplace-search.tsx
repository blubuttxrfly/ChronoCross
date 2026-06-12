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
      <div className="aero-panel flex min-h-14 overflow-hidden rounded-full transition-shadow focus-within:shadow-[0_16px_42px_rgba(32,142,180,0.18)]">
        <div className="flex min-w-0 flex-1 items-center gap-3 px-5 py-3 sm:px-6">
          <IconSearch
            className="h-5 w-5 shrink-0 text-[#408399]"
            stroke={1.75}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gardening, repairs, errands..."
            className="min-w-0 flex-1 bg-transparent text-[15px] font-medium text-[#0f3442] placeholder:text-[#6d93a0] focus:outline-none"
          />
        </div>
        <div className="hidden shrink-0 p-1.5 sm:block">
          <button
            type="button"
            className="aero-button h-full rounded-full px-7 text-sm font-semibold active:scale-[0.98]"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {MARKETPLACE_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const active = category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategory(cat.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-all duration-150",
                active
                  ? "border-white/70 bg-gradient-to-br from-[#0ab4ff] to-[#00c986] text-white shadow-sm"
                  : "aero-chip text-[#315462] hover:text-[#0f3442]",
              )}
            >
              {Icon && <Icon className="h-3.5 w-3.5" stroke={1.75} />}
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
