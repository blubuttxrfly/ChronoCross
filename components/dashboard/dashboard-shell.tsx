"use client";

import { MemberAvatar } from "@/components/app/member-avatar";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import {
  IconBell,
  IconClock,
  IconHeartHandshake,
  IconHome2,
  IconLogout,
  IconMenu2,
  IconPlus,
  IconSettings,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: IconHome2 },
  { label: "Offers", href: "/dashboard/offers", icon: IconHeartHandshake },
  { label: "Requests", href: "/dashboard/requests", icon: IconBell },
  { label: "Community", href: "/dashboard/community", icon: IconUsers },
  { label: "Settings", href: "/dashboard/settings", icon: IconSettings },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  const handleLogout = () => {
    signOut();
    router.push("/auth");
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#1c211d]">
      <aside className="dashboard-sidebar fixed top-0 bottom-0 left-0 z-50 hidden border-r border-[#d9d2c4] bg-[#14261f] shadow-[18px_0_45px_rgba(20,38,31,0.12)] md:flex">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden px-3 py-4">
          <Link
            href="/dashboard"
            className="dashboard-sidebar__item flex h-12 items-center gap-3 rounded-lg px-2 text-white"
            aria-label="ChronoShare dashboard"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f6c35b] text-[#14261f] shadow-sm">
              <IconClock className="h-5 w-5" stroke={2} />
            </span>
            <span className="dashboard-sidebar__label min-w-0 overflow-hidden whitespace-nowrap text-lg font-semibold">
              ChronoShare
            </span>
          </Link>

          <Link
            href="/dashboard/offers"
            className="dashboard-sidebar__item mt-6 flex h-11 items-center gap-3 rounded-lg bg-[#f6c35b] px-3 text-sm font-semibold text-[#14261f] shadow-sm transition-colors hover:bg-[#e9b349]"
          >
            <IconPlus className="h-5 w-5 shrink-0" stroke={2} />
            <span className="dashboard-sidebar__label overflow-hidden whitespace-nowrap">
              List your time
            </span>
          </Link>

          <nav className="mt-6 flex flex-1 flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "dashboard-sidebar__item flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-white text-[#14261f] shadow-sm"
                      : "text-white/68 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" stroke={1.9} />
                  <span className="dashboard-sidebar__label overflow-hidden whitespace-nowrap">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-white/10 pt-3">
            <Link
              href="/dashboard/profile"
              className={cn(
                "dashboard-sidebar__item flex min-w-0 items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/10",
                isActive("/dashboard/profile") && "bg-white/10",
              )}
            >
              <MemberAvatar
                name={user?.name ?? "Member"}
                size="sm"
                className="!h-10 !w-10 !text-[11px]"
              />
              <span className="dashboard-sidebar__label min-w-0 overflow-hidden">
                <span className="block truncate text-sm font-semibold text-white">
                  {user?.name ?? "Member"}
                </span>
                <span className="block truncate text-xs text-white/52">
                  {user?.email ?? "Open profile"}
                </span>
              </span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="dashboard-sidebar__item mt-1 flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-white/58 transition-colors hover:bg-white/10 hover:text-white"
            >
              <IconLogout className="h-5 w-5 shrink-0" stroke={1.9} />
              <span className="dashboard-sidebar__label overflow-hidden whitespace-nowrap">
                Sign out
              </span>
            </button>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-40 border-b border-[#d9d2c4] bg-[#f4f1ea]/92 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#14261f] text-[#f6c35b]">
              <IconClock className="h-5 w-5" stroke={2} />
            </span>
            ChronoShare
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d9d2c4] bg-white text-[#14261f]"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <IconX className="h-5 w-5" /> : <IconMenu2 className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="mt-3 grid gap-1 rounded-lg border border-[#d9d2c4] bg-white p-2 shadow-sm">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium",
                    isActive(link.href)
                      ? "bg-[#14261f] text-white"
                      : "text-[#5f665f] hover:bg-[#f4f1ea]",
                  )}
                >
                  <Icon className="h-5 w-5" stroke={1.9} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      <main className="dashboard-main min-h-screen md:pl-[4.75rem]">
        {children}
      </main>
    </div>
  );
}
