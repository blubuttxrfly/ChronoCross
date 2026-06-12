import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLDivElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border border-transparent px-2 py-0.5 text-xs font-medium transition-colors",
        className,
      )}
      {...props}
    />
  );
}
