"use client";

import { MemberAvatar } from "@/components/app/member-avatar";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import {
  IconBell,
  IconCalendarStats,
  IconChevronDown,
  IconClockHour4,
  IconHeartHandshake,
  IconHome2,
  IconLogout,
  IconMenu2,
  IconPlus,
  IconSearch,
  IconSettings,
  IconUsers,
  IconWallet,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: IconHome2 },
  { label: "Offers", href: "/dashboard/offers", icon: IconHeartHandshake },
  { label: "Requests", href: "/dashboard/requests", icon: IconCalendarStats },
  { label: "Community", href: "/dashboard/community", icon: IconUsers },
  { label: "Wallet", href: "/dashboard/profile", icon: IconWallet },
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
    <div className="aero-app min-h-screen text-[#0f3442]">
      <div className="relative min-h-screen overflow-hidden">
      <aside className="dashboard-sidebar fixed top-0 bottom-0 left-0 z-50 hidden overflow-hidden border-r border-white/45 bg-gradient-to-b from-[#039de0] via-[#00b7c7] to-[#19bf7c] text-white shadow-[16px_0_45px_rgba(16,110,145,0.18)] md:flex">
        <div className="flex min-w-0 flex-1 flex-col px-5 py-5">
          <div className="rounded-[1.35rem] border border-white/22 bg-white/18 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
            <div className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <IconClockHour4 className="h-6 w-6" stroke={2} />
              ChronoShare
            </div>
            <p className="mt-6 text-sm font-semibold text-white/88">
              Time Bank
            </p>
          </div>

          <Link
            href="/dashboard/offers"
            className="aero-chip mt-6 flex h-11 items-center gap-3 rounded-xl px-4 text-sm font-semibold text-[#047c9e] transition-transform hover:-translate-y-0.5"
          >
            <IconPlus className="h-4 w-4" stroke={2} />
            List your time
          </Link>

          <nav className="mt-5 grid gap-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex h-11 items-center justify-between rounded-xl px-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-white/88 text-[#047c9e] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                      : "text-white/84 hover:bg-white/14 hover:text-white",
                  )}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon className="h-[18px] w-[18px] shrink-0" stroke={1.8} />
                    <span className="truncate">{link.label}</span>
                  </span>
                  {!active && (
                    <IconChevronDown className="-rotate-90 h-4 w-4 opacity-45" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-[1.35rem] border border-white/18 bg-[#007fa8]/28 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]">
            <Link href="/dashboard/profile" className="flex items-center gap-3">
              <MemberAvatar
                name={user?.name ?? "Member"}
                size="sm"
                className="!h-11 !w-11 !text-xs ring-2 ring-white/20"
              />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">
                  {user?.name ?? "Member"}
                </span>
                <span className="block truncate text-xs text-white/62">
                  {user?.email ?? "Open profile"}
                </span>
              </span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-white/72 transition-colors hover:bg-white/10 hover:text-white"
            >
              <IconLogout className="h-5 w-5" stroke={1.8} />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-40 border-b border-white/50 bg-white/55 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#08aef0] text-white">
              <IconClockHour4 className="h-5 w-5" stroke={2} />
            </span>
            ChronoShare
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/70 bg-white/70 text-[#0f3442]"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <IconX className="h-5 w-5" /> : <IconMenu2 className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="aero-panel mt-3 grid gap-1 rounded-2xl p-2">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium",
                    isActive(link.href)
                      ? "bg-[#08aef0] text-white"
                      : "text-[#315462] hover:bg-white/56",
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

      <main className="dashboard-main min-h-screen">
        <div className="flex min-h-screen w-full flex-col px-4 py-5 sm:px-6 md:px-6 md:py-5 lg:px-7">
          <div className="mb-4 hidden h-12 items-center justify-between gap-5 md:flex">
            <div className="aero-panel flex h-10 w-full max-w-[320px] items-center gap-3 rounded-xl px-4">
              <IconSearch className="h-4 w-4 text-[#408399]" stroke={2} />
              <input
                type="search"
                placeholder="Search"
                className="min-w-0 flex-1 bg-transparent text-sm text-[#0f3442] placeholder:text-[#6d93a0] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-4">
              <button className="aero-panel relative flex h-10 w-10 items-center justify-center rounded-xl text-[#315462]">
                <IconBell className="h-5 w-5" stroke={1.8} />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#00bf86] text-[10px] font-bold text-white">
                  3
                </span>
              </button>
              <Link
                href="/dashboard/profile"
                className="aero-panel flex items-center gap-3 rounded-2xl px-3 py-2"
              >
                <MemberAvatar
                  name={user?.name ?? "Member"}
                  size="sm"
                  className="!h-9 !w-9 !text-[11px]"
                />
                <span className="text-sm font-semibold text-[#0f3442]">
                  {user?.name ?? "Member"}
                </span>
                <IconChevronDown className="h-4 w-4 text-[#73847d]" />
              </Link>
            </div>
          </div>
          <div className="min-w-0 flex-1 w-full">
            {children}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}
