import CheckoutClient from "@/components/checkout/checkout-client";
import CheckoutHeader from "@/components/checkout/checkout-header";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout – Shop Meichu",
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <CheckoutHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CheckoutClient />
      </div>
    </main>
  );
}
