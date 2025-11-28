import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

export default async function GuestOnly({
  children,
  fallback,
}: {
  fallback: string;
  children?: React.ReactNode;
}) {
  const session = await getSession();

  if (session.isLoggedIn) redirect(fallback);
  return <>{children}</>;
}
