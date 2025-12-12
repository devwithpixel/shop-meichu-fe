import "@/styles/admin.css";
import { ThemeProvider } from "next-themes";

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
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="font-poppins">{children}</div>
    </ThemeProvider>
  );
}
