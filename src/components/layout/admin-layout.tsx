"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { LayoutProvider } from "@/context/layout-provider";
import AdminSidebar from "@/components/sidebar/admin-sidebar";
import React from "react";
import { User } from "@/types/strapi/user";

export default function AdminLayout({
  user,
  children,
}: {
  user: User;
  children?: React.ReactNode;
}) {
  return (
    <LayoutProvider>
      <SidebarProvider>
        <div className="relative flex h-screen w-full dark font-outfit bg-background-admin text-white">
          <AdminSidebar user={user} />
          <SidebarInset className="bg-background-admin! flex flex-col p-8">
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </LayoutProvider>
  );
}
