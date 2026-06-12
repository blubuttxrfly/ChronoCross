"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatHoursPrice } from "@/lib/marketplace";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface CarouselListingItem {
  id: string;
  title: string;
  image: string;
  category: string;
  memberName: string;
  hours: number;
  badge?: string;
  posted?: string;
  href: string;
}

interface ListingCarouselSectionProps {
  title: string;
  items: CarouselListingItem[];
  viewAllHref?: string;
}

const CATEGORY_IMAGES: Record<string, string> = {
  repair: "https://images.unsplash.com/photo-1485965120188-e8f992113851",
  education: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
  home: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
  errands: "https://images.unsplash.com/photo-1542838132-92c53300491e",
  outdoors: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
  career: "https://images.unsplash.com/photo-1521737710472-677dce154dec",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac";

export function getCategoryImage(category: string) {
  const key = category.toLowerCase();
  return CATEGORY_IMAGES[key] ?? DEFAULT_IMAGE;
}

function ListingCarouselCard({ item }: { item: CarouselListingItem }) {
  return (
    <Card className="group relative flex h-[320px] w-full flex-col overflow-hidden rounded-xl border-0 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-xl">
        <Image
          alt={item.title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
          sizes="260px"
          src={item.image}
        />
        <Button
          className="absolute top-2 right-2 z-10 rounded-full bg-white/80 text-neutral-700 backdrop-blur-sm hover:bg-white/90 hover:text-black dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-900/90 dark:hover:text-white"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          size="icon"
          variant="ghost"
        >
          <Heart className="h-4 w-4 stroke-[2px]" />
          <span className="sr-only">Save listing</span>
        </Button>
        {item.badge && (
          <Badge className="absolute top-2 left-2 rounded-md bg-white/90 px-1.5 py-0.5 font-medium text-black text-xs dark:bg-slate-900/90 dark:text-white">
            {item.badge}
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <CardContent className="p-2 pt-3 pb-0">
          <h3 className="line-clamp-2 font-medium text-sm tracking-tight">
            {item.title}
          </h3>
          <p className="text-slate-500 text-xs tracking-tight dark:text-slate-400">
            {item.category} · {item.memberName}
          </p>
          {item.posted && (
            <p className="text-slate-500 text-xs tracking-tight dark:text-slate-400">
              Posted {item.posted}
            </p>
          )}
        </CardContent>

        <CardFooter className="mt-auto flex items-center gap-0.5 p-2 pt-0 text-xs">
          <span className="text-slate-500 text-xs tracking-tight dark:text-slate-400">
            Time exchange
          </span>
          <span className="ml-auto text-xs font-medium tracking-tight">
            {formatHoursPrice(item.hours)}
          </span>
        </CardFooter>
      </div>
    </Card>
  );
}

export function ListingCarouselSection({
  title,
  items,
  viewAllHref = "#",
}: ListingCarouselSectionProps) {
  const scrollContainer = React.useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    scrollContainer.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    scrollContainer.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <div className="w-full py-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-medium text-lg tracking-tight md:text-xl">{title}</h2>
        <div className="flex items-center gap-1">
          <Button
            className="h-7 w-7 rounded-full border-neutral-200 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900"
            onClick={handleScrollLeft}
            size="icon"
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button
            className="h-7 w-7 rounded-full border-neutral-200 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900"
            onClick={handleScrollRight}
            size="icon"
            variant="outline"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
          <Link
            className="ml-1 hidden font-medium text-xs hover:underline md:block"
            href={viewAllHref}
          >
            Show all
          </Link>
        </div>
      </div>

      <div
        className="scrollbar-hide -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2"
        ref={scrollContainer}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {items.map((item) => (
          <div
            className="w-[240px] flex-none snap-start md:w-[260px]"
            key={item.id}
          >
            <Link
              className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              href={item.href}
            >
              <ListingCarouselCard item={item} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
