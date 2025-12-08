import LoginForm from "@/components/form/admin/login-form";
import Image from "@/components/global/image";
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
        <div className="bg-gray-800 flex w-fit mx-auto rounded-lg">
          <Image src="/assets/illustration/Login.png" className="w-96" />
          <LoginForm className="mx-auto w-96 bg-transparent text-white border-none" />
        </div>
      </main>
    </GuestOnly>
  );
}
