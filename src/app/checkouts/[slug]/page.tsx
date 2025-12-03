import CheckoutClient from "@/components/checkout/checkout-client";
import CheckoutHeader from "@/components/checkout/checkout-header";
import { CheckoutItems } from "@/lib/data/item-checkout";
import { createCheckoutSession } from "@/lib/checkout-slug";

export default function CheckoutPage() {
  const checkoutSession = createCheckoutSession(CheckoutItems);

  return (
    <div className="min-h-screen bg-gray-50">
      <CheckoutHeader sessionSlug={checkoutSession.slug} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CheckoutClient checkoutSession={checkoutSession} />
      </div>
    </div>
  );
}
