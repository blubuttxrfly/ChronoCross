import { AuthGuard } from "@/components/dashboard/auth-guard";
import { AppShell } from "@/components/v2/dashboard/app-shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AppShell>{children}</AppShell>
    </AuthGuard>
  );
}
