import { MemberAvatar } from "@/components/app/member-avatar";
import { cn } from "@/lib/utils";
import type { ActivityItem } from "@/lib/dashboard-data";

type ExchangeRowProps = {
  item: ActivityItem;
  className?: string;
};

export function ExchangeRow({ item, className }: ExchangeRowProps) {
  const person = item.person ?? "Community member";

  return (
    <div
      className={cn(
        "flex gap-5 border-b border-border-subtle py-6 last:border-0",
        className,
      )}
    >
      <MemberAvatar name={person} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="text-base font-medium text-text-primary">{item.title}</p>
        <p className="mt-0.5 text-sm text-text-secondary">{item.detail}</p>
        <p className="mt-1.5 text-sm text-text-tertiary">{item.time}</p>
      </div>
      {item.hours !== undefined && (
        <span
          className={cn(
            "shrink-0 text-sm font-semibold tabular-nums",
            item.hours > 0 ? "text-positive" : "text-text-secondary",
          )}
        >
          {item.hours > 0 ? "+" : ""}
          {item.hours} hr
        </span>
      )}
    </div>
  );
}
