import { SidebarNavigationGroupProps } from "@/types/admin/navbar";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";

export const sidebarConfig: SidebarNavigationGroupProps[] = [
  {
    title: "Menu",
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "Categories",
        href: "/admin/categories",
        icon: ShoppingBag,
      },
      {
        title: "Products",
        href: "/admin/products",
        icon: Package,
      },
      {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingCart,
      },
    ],
  },
];
