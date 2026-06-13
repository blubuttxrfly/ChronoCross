import { cn } from "@/lib/utils";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  href,
  linkLabel = "See all",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#0f3442] sm:text-[28px]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-base leading-relaxed text-[#5e8490]">
              {subtitle}
            </p>
          )}
        </div>
        {href && (
          <Link
            href={href}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#008ac1] transition-colors hover:text-[#006f9c]"
          >
            {linkLabel}
            <IconArrowRight className="h-4 w-4" stroke={2} />
          </Link>
        )}
      </div>
    </div>
  );
}
