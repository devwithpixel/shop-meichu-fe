import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LayoutProvider } from "@/context/layout-provider";
import { ProfileDropdown } from "@/components/dropdown/profile-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import AdminSidebar from "@/components/sidebar/admin-sidebar";
import { Separator } from "../ui/separator";

export default function AdminLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <LayoutProvider>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset className="px-4 py-2 space-y-3 @container/main">
          <div className="flex items-center justify-between">
            <SidebarTrigger />

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <ProfileDropdown />
            </div>
          </div>
          <Separator />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </LayoutProvider>
  );
}
