import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-1 text-[11px] font-semibold tracking-[0.1em] text-accent uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-bold tracking-[-0.03em] text-text-primary">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-text-secondary">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-2.5">{actions}</div>
      )}
    </header>
  );
}
