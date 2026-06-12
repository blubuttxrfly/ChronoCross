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
        "flex gap-5 border-b border-white/58 py-5 last:border-0",
        className,
      )}
    >
      <MemberAvatar name={person} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="text-base font-medium text-[#0f3442]">{item.title}</p>
        <p className="mt-0.5 text-sm text-[#5e8490]">{item.detail}</p>
        <p className="mt-1.5 text-sm text-[#7ca0aa]">{item.time}</p>
      </div>
      {item.hours !== undefined && (
        <span
          className={cn(
            "shrink-0 text-sm font-semibold tabular-nums",
            item.hours > 0 ? "text-[#008ac1]" : "text-[#d06a4f]",
          )}
        >
          {item.hours > 0 ? "+" : ""}
          {item.hours} hr
        </span>
      )}
    </div>
  );
}
