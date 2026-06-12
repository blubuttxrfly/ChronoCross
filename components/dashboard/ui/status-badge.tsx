import { cn } from "@/lib/utils";

const STATUS_STYLES = {
  active: "bg-surface-muted text-text-secondary",
  open: "bg-surface-muted text-text-secondary",
  pending: "bg-warning-subtle text-warning",
  matched: "bg-warning-subtle text-warning",
  completed: "bg-positive-subtle text-positive",
} as const;

type Status = keyof typeof STATUS_STYLES;

type StatusBadgeProps = {
  status: Status;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium capitalize",
        STATUS_STYLES[status],
        className,
      )}
    >
      {status}
    </span>
  );
}
