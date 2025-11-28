import AdminOnly from "@/components/middleware/admin-only";
import type { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children?: ReactNode;
}) {
  return <AdminOnly fallback="/admin/login">{children}</AdminOnly>;
}
