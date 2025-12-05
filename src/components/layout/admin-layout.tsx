"use client";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LayoutProvider } from "@/context/layout-provider";
import { ProfileDropdown } from "@/components/dropdown/profile-dropdown";
import AdminSidebar from "@/components/sidebar/admin-sidebar";

import type { ReactNode } from "react";
import type { User } from "@/types/strapi/user";

export default function AdminLayout({
  user,
  children,
}: {
  user: User;
  children?: ReactNode;
}) {
  return (
    <LayoutProvider>
      <SidebarProvider>
        <div className="relative flex min-h-screen w-full dark font-outfit bg-background-admin text-white">
          <AdminSidebar user={user} />
          <SidebarInset className="bg-background-admin! flex flex-col p-8">
            <div className="flex items-center justify-between mb-5">
              <SidebarTrigger />
              <ProfileDropdown user={user} />
            </div>
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </LayoutProvider>
  );
}
