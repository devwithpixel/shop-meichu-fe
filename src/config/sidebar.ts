import { SidebarNavigationGroupProps } from "@/types/admin/navbar";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  ShoppingCart,
  Mail,
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
        title: "Requests",
        href: "/admin/requests",
        icon: ShoppingCart,
      },
      {
        title: "Subscribers",
        href: "/admin/subscribers",
        icon: Mail,
      },
    ],
  },
];
