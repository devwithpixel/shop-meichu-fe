import LoginForm from "./_components/form";
import GuestOnly from "@/components/middleware/guest-only";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Shop Meichu",
  robots: "noindex, nofollow",
};

export default function Page() {
  return (
    <GuestOnly fallback="/admin">
      <main className="bg-gray-900 min-h-screen pt-24 dark">
        <LoginForm className="mx-auto bg-gray-800 max-w-96 text-white border-none" />
      </main>
    </GuestOnly>
  );
}
