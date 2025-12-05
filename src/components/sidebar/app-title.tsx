import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
// import { Logo } from "@/components/global/logo";

export function AppTitle() {
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="gap-0 py-0 hover:bg-transparent active:bg-transparent"
          asChild
        >
          <div>
            <Logo className="size-8 me-3" />
            <Link
              href="/"
              onClick={() => setOpenMobile(false)}
              className="grid flex-1 text-start text-sm leading-tight"
            >
              <span className="truncate font-bold">Shop</span>
              <span className="truncate text-xs">Meichu</span>
            </Link>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
