import AdminOnly from "@/components/middleware/admin-only";
import AdminLayout from "@/components/layout/admin-layout";
import { AdminProvider } from "@/context/admin-provider";
import { getSession } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <AdminOnly fallback="/admin/login">
      <AdminProvider user={session.user!}>
        <AdminLayout>{children}</AdminLayout>
      </AdminProvider>
    </AdminOnly>
  );
}
