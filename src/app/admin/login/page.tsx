import LoginForm from "@/components/form/admin/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Shop Meichu",
  robots: "noindex, nofollow"
};

export default function Page() {
  return (
    <main className="font-outfit bg-gray-900 h-screen pt-24 dark">
      <LoginForm className="mx-auto w-96 bg-gray-800 text-white border-none" />
    </main>
  );
}
