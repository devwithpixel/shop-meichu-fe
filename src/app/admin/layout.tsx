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
  return <div>{children}</div>;
}
