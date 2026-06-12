import { cn } from "@/lib/utils";
import Link from "next/link";

const VARIANTS = {
  primary:
    "bg-gradient-to-b from-teal-500 to-teal-600 text-white hover:from-teal-400 hover:to-teal-500 border border-teal-600/20 shadow-md shadow-teal-900/15",
  secondary:
    "bg-surface text-text-primary border border-border hover:bg-surface-muted hover:border-border shadow-sm",
  ghost:
    "bg-transparent text-text-secondary border border-transparent hover:bg-surface-muted hover:text-text-primary",
} as const;

type ButtonVariant = keyof typeof VARIANTS;

type ButtonBaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClass =
  "inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-[13px] font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98]";

export function Button({
  variant = "secondary",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(baseClass, VARIANTS[variant], className);

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { href: _, ...buttonProps } = props as ButtonAsButton;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
