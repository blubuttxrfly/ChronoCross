"use client";

import { MemberAvatar } from "@/components/app/member-avatar";
import { useAuth } from "@/lib/auth";
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
import { useEffect, useState } from "react";

const NAV = [
  { label: "Dashboard", href: "/v2/dashboard", icon: IconHome2 },
  { label: "Offers", href: "/dashboard/offers", icon: IconHeartHandshake },
  { label: "Requests", href: "/dashboard/requests", icon: IconBell },
  { label: "Community", href: "/dashboard/community", icon: IconUsers },
  { label: "Settings", href: "/dashboard/settings", icon: IconSettings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const active = (href: string) =>
    href === "/v2/dashboard" ? pathname === href : pathname.startsWith(href);

  const handleLogout = () => {
    signOut();
    router.push("/auth");
  };

  const sidebarWidth = collapsed ? 76 : 280;

  return (
    <div
      className="min-h-screen bg-[#f4f1ea] text-[#1c211d]"
      style={
        mounted
          ? { "--sidebar-w": `${sidebarWidth}px` } as React.CSSProperties
          : undefined
      }
    >
      {/* ── Desktop Sidebar ── */}
      <aside
        className="fixed top-0 bottom-0 left-0 z-50 hidden flex-col border-r border-[#d9d2c4] bg-[#14261f] shadow-[18px_0_45px_rgba(20,38,31,0.12)] transition-[width] duration-300 md:flex"
        style={{ width: sidebarWidth }}
      >
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden px-3 pb-5">
          {/* Brand Row — toggle + clock + name on one line */}
          <div className="flex items-center gap-2 pt-3 pb-2">
            <Link
              href="/v2/dashboard"
              className="flex min-w-0 flex-1 items-center gap-2 text-white"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f6c35b] text-[#14261f] shadow-sm">
                <IconClock className="h-5 w-5" stroke={2} />
              </span>
              {!collapsed && (
                <span className="min-w-0 overflow-hidden whitespace-nowrap text-lg font-semibold">
                  ChronoCross
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/20 bg-[#1e352b] text-white/70 shadow-sm transition-all hover:bg-[#2a4538] hover:text-white"
              aria-label={collapsed ? "Expand" : "Collapse"}
            >
              <IconMenu2
                className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* CTA */}
          <Link
            href="/dashboard/offers"
            className="mt-6 flex items-center gap-3 rounded-lg bg-[#f6c35b] text-sm font-semibold text-[#14261f] shadow-sm transition-colors hover:bg-[#e9b349]"
            style={{
              height: 48,
              justifyContent: collapsed ? "center" : undefined,
              paddingLeft: collapsed ? 0 : 12,
              paddingRight: collapsed ? 0 : 12,
            }}
          >
            <IconPlus className="h-5 w-5 shrink-0" stroke={2} />
            {!collapsed && (
              <span className="overflow-hidden whitespace-nowrap">
                List your time
              </span>
            )}
          </Link>

          {/* Nav */}
          <nav className="mt-8 flex flex-1 flex-col gap-2">
            {NAV.map((link) => {
              const Icon = link.icon;
              const isActive = active(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white text-[#14261f] shadow-sm"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                  style={{
                    height: 48,
                    paddingLeft: collapsed ? 0 : 12,
                    justifyContent: collapsed ? "center" : undefined,
                  }}
                >
                  <Icon className="h-5 w-5 shrink-0" stroke={1.9} />
                  {!collapsed && (
                    <span className="overflow-hidden whitespace-nowrap">
                      {link.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User + Logout */}
          <div className="mt-auto border-t border-white/10 pt-4">
            <Link
              href="/dashboard/profile"
              className={`flex items-center gap-3 rounded-lg transition-colors hover:bg-white/10 ${
                active("/dashboard/profile") ? "bg-white/10" : ""
              }`}
              style={{
                height: 48,
                padding: 8,
                justifyContent: collapsed ? "center" : undefined,
              }}
            >
              <MemberAvatar
                name={user?.name ?? "Member"}
                size="sm"
                className="!h-10 !w-10 !text-[11px]"
              />
              {!collapsed && (
                <span className="min-w-0 overflow-hidden">
                  <span className="block truncate text-sm font-semibold text-white">
                    {user?.name ?? "Member"}
                  </span>
                  <span className="block truncate text-xs text-white/50">
                    {user?.email ?? "Open profile"}
                  </span>
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 flex items-center gap-3 rounded-lg text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              style={{
                height: 44,
                paddingLeft: collapsed ? 0 : 12,
                justifyContent: collapsed ? "center" : undefined,
                width: "100%",
              }}
            >
              <IconLogout className="h-5 w-5 shrink-0" stroke={1.9} />
              {!collapsed && (
                <span className="overflow-hidden whitespace-nowrap">
                  Sign out
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* ── Mobile Header ── */}
      <header className="sticky top-0 z-40 border-b border-[#d9d2c4] bg-[#f4f1ea]/92 px-6 py-4 backdrop-blur md:hidden">
        <div className="flex items-center justify-between">
          <Link
            href="/v2/dashboard"
            className="flex items-center gap-2 font-semibold text-[#1c211d]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#14261f] text-[#f6c35b]">
              <IconClock className="h-5 w-5" stroke={2} />
            </span>
            ChronoCross
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#d9d2c4] bg-white text-[#14261f]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close" : "Menu"}
          >
            {menuOpen ? (
              <IconX className="h-5 w-5" />
            ) : (
              <IconMenu2 className="h-5 w-5" />
            )}
          </button>
        </div>

        {menuOpen && (
          <nav className="mt-4 grid gap-2 rounded-lg border border-[#d9d2c4] bg-white p-3 shadow-sm">
            {NAV.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3.5 text-sm font-medium ${
                    active(link.href)
                      ? "bg-[#14261f] text-white"
                      : "text-[#5f665f] hover:bg-[#f4f1ea]"
                  }`}
                >
                  <Icon className="h-5 w-5" stroke={1.9} />
                  {link.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-3 rounded-lg px-4 py-3.5 text-sm font-medium text-[#5f665f] hover:bg-[#f4f1ea]"
            >
              <IconLogout className="h-5 w-5" stroke={1.9} />
              Sign out
            </button>
          </nav>
        )}
      </header>

      {/* ── Main Content ── */}
      <main
        className="min-h-screen transition-[padding-left] duration-300 md:pl-[280px]"
        style={mounted ? { paddingLeft: `${sidebarWidth}px` } : undefined}
      >
        <div
          className="mx-auto max-w-[1280px]"
          style={{
            paddingLeft: "clamp(24px, 4vw, 64px)",
            paddingRight: "clamp(24px, 4vw, 64px)",
            paddingTop: "clamp(32px, 3vw, 48px)",
            paddingBottom: "clamp(32px, 3vw, 48px)",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
