import { Button } from "@/components/dashboard/ui/button";
import { PageHeader } from "@/components/dashboard/ui/page-header";
import { cn } from "@/lib/utils";

type SectionPageProps = {
  title: string;
  description: string;
  eyebrow?: string;
  actionLabel?: string;
  actionHref?: string;
  children?: React.ReactNode;
  className?: string;
};

export function SectionPage({
  title,
  description,
  eyebrow,
  actionLabel,
  actionHref,
  children,
  className,
}: SectionPageProps) {
  return (
    <div className="flex h-full flex-1 flex-col overflow-y-auto">
      <div
        className={cn(
          "mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10",
          className,
        )}
      >
        <PageHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          actions={
            actionLabel && actionHref ? (
              <Button variant="primary" href={actionHref}>
                {actionLabel}
              </Button>
            ) : undefined
          }
        />
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/60 py-16 text-center">
      <p className="text-[14px] font-medium text-text-primary">{title}</p>
      <p className="mt-1 max-w-sm text-[13px] text-text-secondary">
        {description}
      </p>
      {actionLabel && actionHref && (
        <div className="mt-4">
          <Button variant="secondary" href={actionHref}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
