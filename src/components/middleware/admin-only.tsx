import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { LayoutProvider } from "@/context/layout-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import AdminSidebar from "@/components/sidebar/admin-sidebar";
import React from "react";

export default async function AdminOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session.isLoggedIn) redirect("/admin/login");
  return (
    <LayoutProvider>
      <SidebarProvider>
        <NuqsAdapter>
          <div className="relative flex h-screen w-full dark font-outfit bg-background text-white">
            <AdminSidebar user={session.user!} />
            <SidebarInset className="flex flex-col p-8">
              {children}
            </SidebarInset>
          </div>
        </NuqsAdapter>
      </SidebarProvider>
    </LayoutProvider>
  );
}
