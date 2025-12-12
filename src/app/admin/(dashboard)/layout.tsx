import AdminLayout from "@/components/layout/admin-layout";
import { AdminProvider } from "@/context/admin-provider";
import { getCurrentUser } from "@/lib/api/user";
import { redirect } from "next/navigation";

export default async function AdminAuthLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) return redirect("/logout?redirect=/admin/login");

  if (user.role?.name !== "Admin") {
    return redirect("/logout?redirect=/admin/login");
  }

  return (
    <AdminProvider user={user}>
      <AdminLayout>{children}</AdminLayout>
    </AdminProvider>
  );
}
