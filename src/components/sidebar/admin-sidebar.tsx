"use client";

import { useLayout } from "@/context/layout-provider";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AppTitle } from "./app-title";
import { SidebarNavigationGroup } from "./nav-group";
import { sidebarConfig } from "@/config/sidebar";
import { NavUser } from "./nav-user";

import type { User } from "@/types/strapi/user";

export default function AdminSidebar({ user }: { user: User }) {
  const { collapsible, variant } = useLayout();

  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        <AppTitle />
      </SidebarHeader>
      <SidebarContent>
        {sidebarConfig.map((item) => (
          <SidebarNavigationGroup
            key={item.title}
            title={item.title}
            items={item.items}
          />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
