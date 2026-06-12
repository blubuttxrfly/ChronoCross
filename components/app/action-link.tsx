import { cn } from "@/lib/utils";
import Link from "next/link";

type ActionLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function ActionLink({
  href,
  children,
  variant = "primary",
  className,
}: ActionLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-8 py-4 text-base font-semibold transition-all active:scale-[0.98]",
        variant === "primary"
          ? "bg-accent text-white hover:bg-accent-hover"
          : "bg-surface text-text-primary ring-1 ring-border hover:bg-surface-muted",
        className,
      )}
    >
      {children}
    </Link>
  );
}
