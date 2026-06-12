import { MemberAvatar } from "@/components/app/member-avatar";
import { cn } from "@/lib/utils";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

type OpportunityRowProps = {
  type: "offer" | "request";
  title: string;
  category: string;
  hours: number;
  memberName: string;
  posted: string;
  description: string;
  href?: string;
  className?: string;
};

export function OpportunityRow({
  type,
  title,
  category,
  hours,
  memberName,
  posted,
  description,
  href = "#",
  className,
}: OpportunityRowProps) {
  const isOffer = type === "offer";

  return (
    <Link
      href={href}
      className={cn(
        "group -mx-4 flex gap-5 border-b border-border-subtle px-4 py-7 transition-colors last:border-0 hover:bg-surface-muted/50 sm:-mx-6 sm:px-6",
        className,
      )}
    >
      <MemberAvatar name={memberName} size="md" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span
            className={cn(
              "text-xs font-semibold uppercase tracking-wide",
              isOffer ? "text-positive" : "text-warning",
            )}
          >
            {isOffer ? "Offering help" : "Needs help"}
          </span>
          <span className="text-xs text-text-tertiary">{posted}</span>
        </div>
        <h3 className="mt-1.5 text-lg font-semibold tracking-[-0.02em] text-text-primary group-hover:text-accent">
          {title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[15px] leading-relaxed text-text-secondary">
          {description}
        </p>
        <p className="mt-3 text-sm text-text-tertiary">
          {memberName} · {category} · {hours} hr{hours === 1 ? "" : "s"}
        </p>
      </div>
      <IconArrowRight className="mt-2 h-5 w-5 shrink-0 text-text-tertiary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
    </Link>
  );
}
