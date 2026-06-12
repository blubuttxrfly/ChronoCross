"use client";

import { MemberAvatar } from "@/components/app/member-avatar";
import { categoryGradient, formatHoursPrice } from "@/lib/marketplace";
import { cn } from "@/lib/utils";
import { IconClock, IconHeart, IconMapPin } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

function SaveButton({ className }: { className?: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        setSaved((value) => !value);
      }}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-150",
        saved
          ? "bg-white text-rose-500 shadow-sm"
          : "bg-black/25 text-white hover:bg-white hover:text-slate-700",
        className,
      )}
      aria-label={saved ? "Remove from saved" : "Save listing"}
    >
      <IconHeart
        className="h-4 w-4"
        fill={saved ? "currentColor" : "none"}
        stroke={saved ? 0 : 1.75}
      />
    </button>
  );
}

type ListingCardProps = {
  type: "offer" | "request";
  title: string;
  category: string;
  hours: number;
  memberName: string;
  posted: string;
  href?: string;
  className?: string;
};

export function ListingCard({
  type,
  title,
  category,
  hours,
  memberName,
  posted,
  href = "#",
  className,
}: ListingCardProps) {
  const isOffer = type === "offer";

  return (
    <Link
      href={href}
      className={cn(
        "group block min-w-0 transition-transform duration-200 hover:-translate-y-0.5",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br shadow-sm transition-shadow duration-200 group-hover:shadow-md",
          categoryGradient(category),
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.68),transparent_26%),linear-gradient(to_top,rgba(20,38,31,0.32),rgba(20,38,31,0.02)_58%)] opacity-90" />
        <div className="absolute inset-0 bg-[#14261f]/10" />
        <span
          className={cn(
            "absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold shadow-sm backdrop-blur-sm",
            isOffer
              ? "bg-white/92 text-[#14261f]"
              : "bg-[#14261f]/86 text-white",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              isOffer ? "bg-emerald-500" : "bg-[#f6c35b]",
            )}
          />
          {isOffer ? "Available" : "Needed"}
        </span>
        <SaveButton className="absolute top-3 right-3" />

        <div className="absolute bottom-4 left-4 flex rounded-full bg-white/92 px-3 py-1.5 text-xs font-semibold text-[#14261f] shadow-sm backdrop-blur-sm">
          {category}
        </div>
      </div>

      <div className="mt-3 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-base font-semibold leading-snug text-[#1d251f]">
            {title}
          </h3>
          <div className="flex shrink-0 items-center gap-1 text-[#1d251f]">
            <IconClock className="h-3.5 w-3.5 text-[#b5791b]" stroke={2} />
            <span className="text-[13px] font-semibold tabular-nums">
              {formatHoursPrice(hours)}
            </span>
          </div>
        </div>

        <p className="mt-1.5 flex items-center gap-1 text-[13px] text-[#74776f]">
          <IconMapPin className="h-3.5 w-3.5" stroke={1.8} />
          Nearby / {posted}
        </p>

        <div className="mt-2.5 flex min-w-0 items-center gap-1.5">
          <MemberAvatar
            name={memberName}
            size="sm"
            className="!h-5 !w-5 !text-[8px]"
          />
          <span className="truncate text-[13px] font-medium text-[#5d625b]">
            {memberName}
          </span>
        </div>
      </div>
    </Link>
  );
}

type ListingGridProps = {
  children: React.ReactNode;
  className?: string;
};

export function ListingGrid({ children, className }: ListingGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
