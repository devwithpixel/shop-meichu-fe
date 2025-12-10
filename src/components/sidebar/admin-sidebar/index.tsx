"use client";

import { useAdminProvider } from "@/context/admin-provider";
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

export default function AdminSidebar() {
  const { collapsible, variant } = useLayout();
  const { user } = useAdminProvider();

  return (
    <Sidebar
      collapsible={collapsible}
      variant={variant}
      className="rounded-lg!"
    >
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
