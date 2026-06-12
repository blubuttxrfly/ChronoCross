"use client";

import { cn } from "@/lib/utils";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeToggleProps = {
  className?: string;
  /** Match sidebar nav item layout */
  sidebar?: boolean;
  /** Sidebar expanded state — hides label when collapsed */
  sidebarOpen?: boolean;
};

export function ThemeToggle({
  className,
  sidebar,
  sidebarOpen = true,
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn(
          sidebar ? "min-h-[52px] rounded-xl" : "h-10 w-10 rounded-xl",
          className,
        )}
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");
  const label = isDark ? "Light mode" : "Dark mode";

  if (sidebar) {
    return (
      <button
        type="button"
        onClick={toggle}
        className={cn(
          "flex min-h-[52px] w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors",
          "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
          "dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100",
          className,
        )}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            "bg-slate-50 text-slate-500",
            "dark:bg-slate-800 dark:text-slate-300",
          )}
        >
          {isDark ? (
            <IconSun className="h-[22px] w-[22px]" stroke={1.75} />
          ) : (
            <IconMoon className="h-[22px] w-[22px]" stroke={1.75} />
          )}
        </span>
        <motion.span
          animate={{
            display: sidebarOpen ? "inline-block" : "none",
            opacity: sidebarOpen ? 1 : 0,
          }}
          className="text-[15px] font-medium whitespace-pre"
        >
          {label}
        </motion.span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
        "text-slate-600 hover:bg-slate-100",
        "dark:text-slate-300 dark:hover:bg-slate-800",
        className,
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <IconSun className="h-5 w-5" stroke={1.75} />
      ) : (
        <IconMoon className="h-5 w-5" stroke={1.75} />
      )}
    </button>
  );
}
