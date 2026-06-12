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
          <h2 className="text-2xl font-bold tracking-[-0.03em] text-text-primary sm:text-[28px]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-base leading-relaxed text-text-secondary">
              {subtitle}
            </p>
          )}
        </div>
        {href && (
          <Link
            href={href}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            {linkLabel}
            <IconArrowRight className="h-4 w-4" stroke={2} />
          </Link>
        )}
      </div>
    </div>
  );
}
