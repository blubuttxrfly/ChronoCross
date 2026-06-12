import { cn } from "@/lib/utils";

type PageFrameProps = {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
  wide?: boolean;
};

export function PageFrame({ children, className, narrow, wide }: PageFrameProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 py-8 sm:px-8 sm:py-10 md:px-10",
        narrow && "max-w-2xl",
        wide && "max-w-7xl",
        !narrow && !wide && "max-w-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
