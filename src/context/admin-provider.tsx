"use client";

import { createContext, useContext } from "react";

import type { User } from "@/types/strapi/user";

interface AdminProviderContext {
  user: User;
  children?: React.ReactNode;
}

const AdminProviderContext = createContext<AdminProviderContext | null>(null);

export function AdminProvider(props: AdminProviderContext) {
  return (
    <AdminProviderContext
      value={{
        user: props.user,
      }}
    >
      {props.children}
    </AdminProviderContext>
  );
}

export function useAdminProvider() {
  const context = useContext(AdminProviderContext);
  if (!context) {
    throw new Error("useAdminProvider must be used within a AdminProvider");
  }

  return context;
}
