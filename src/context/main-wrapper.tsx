"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const specialRoutes = ["/checkout", "/admin"];

  const isSpecialPage = specialRoutes.some((route) =>
    pathname?.startsWith(route)
  );

  return (
    <main
      className={cn(
        "md:pb-0 pb-16 select-none",
        isSpecialPage ? "md:pt-0 pb-0" : "md:pt-18"
      )}
    >
      {children}
    </main>
  );
}
