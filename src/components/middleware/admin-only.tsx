import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminOnly({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: string;
}) {
  const session = await getSession();

  if (!session.isLoggedIn) redirect(fallback);
  return children;
}
