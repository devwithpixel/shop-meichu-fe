"use client";

import { usePathname } from "next/navigation";

export default function PagePadding({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <main className={isHome ? "pt-0 select-none" : "pt-16 select-none"}>
      {children}
    </main>
  );
}
