"use client";

import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

export interface SidebarLinkItem {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);
  const open = openProp ?? openState;
  const setOpen = setOpenProp ?? setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();

  return (
    <motion.div
      className={cn(
        "hidden h-full shrink-0 flex-col border-r border-slate-200/80 bg-white px-3 py-5 md:flex dark:border-slate-800 dark:bg-slate-900",
        className,
      )}
      animate={{
        width: animate ? (open ? "272px" : "76px") : "272px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();

  return (
    <>
      <div
        className="flex h-14 w-full flex-row items-center justify-between border-b border-slate-200/80 bg-white px-4 md:hidden dark:border-slate-800 dark:bg-slate-900"
        {...props}
      >
        <div className="z-20 flex w-full justify-end">
          <button
            type="button"
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={() => setOpen(!open)}
          >
            <IconMenu2 className="h-6 w-6" />
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn(
                "fixed inset-0 z-[100] flex h-full w-full flex-col justify-between bg-white p-8 dark:bg-slate-900",
                className,
              )}
            >
              <button
                type="button"
                className="absolute top-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100"
                aria-label="Close menu"
                onClick={() => setOpen(!open)}
              >
                <IconX className="h-6 w-6" />
              </button>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}

export const SidebarLink = ({
  link,
  className,
  onClick,
  ...props
}: {
  link: SidebarLinkItem;
  className?: string;
  onClick?: () => void;
} & Omit<LinkProps, "href">) => {
  const { open, animate } = useSidebar();
  const pathname = usePathname();
  const active = isActivePath(pathname, link.href);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <Link
      href={link.href}
      onClick={handleClick}
      className={cn(
        "group/sidebar flex min-h-[52px] items-center justify-start gap-3 rounded-xl px-2.5 py-2.5 transition-colors",
        active
          ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
          active
            ? "bg-white text-slate-800 shadow-sm ring-1 ring-slate-200/80 dark:bg-slate-700 dark:text-slate-100 dark:ring-slate-600"
            : "bg-slate-50 text-slate-500 group-hover/sidebar:bg-white group-hover/sidebar:text-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:group-hover/sidebar:bg-slate-700 dark:group-hover/sidebar:text-slate-200",
        )}
      >
        {link.icon}
      </span>
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="!m-0 inline-block !p-0 text-[15px] font-medium whitespace-pre text-inherit transition duration-150 group-hover/sidebar:translate-x-0.5"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
