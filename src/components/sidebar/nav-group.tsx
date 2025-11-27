"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  SidebarNavigationGroupProps,
  SidebarSubNavigationProps,
} from "@/types/admin/navbar";

export function SidebarNavigationGroup({
  title,
  items,
}: SidebarNavigationGroupProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuLink key={`${item.title}-${item.href}`} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function SidebarMenuLink({ item }: { item: SidebarSubNavigationProps }) {
  "use no memo";
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={checkIsActive(item)}
        tooltip={item.title}
      >
        <Link href={item.href} onClick={() => setOpenMobile(false)}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function checkIsActive(item: SidebarSubNavigationProps) {
  const pathname = usePathname();

  return pathname === item.href;
}
