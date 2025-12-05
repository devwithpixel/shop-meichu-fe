import { Slot } from "@radix-ui/react-slot";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Meichu - Admin",
  description: "Admin panel for shop meichu",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Slot className="font-outfit">{children}</Slot>;
}
