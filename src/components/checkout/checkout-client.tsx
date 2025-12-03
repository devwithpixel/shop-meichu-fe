"use client";

import { useState } from "react";
import CheckoutForm from "@/components/checkout/checkout-form";
import OrderSummary from "@/components/checkout/order-summary";
import { CheckoutFormData, CheckoutSession } from "@/types/checkout";

export default function CheckoutClient({
  checkoutSession,
}: {
  checkoutSession: CheckoutSession;
}) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    buyerName: "",
    contact: "",
  });

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const required: (keyof CheckoutFormData)[] = ["buyerName", "contact"];
    const missing = required.filter((f) => !formData[f]);

    if (missing.length > 0) {
      alert("Please fill in all required fields");
      return;
    }

    const orderData = {
      checkoutSlug: checkoutSession.slug,
      customer: {
        name: formData.buyerName,
        contact: formData.contact,
      },
      items: checkoutSession.items.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.count,
        price: item.price,
      })),
      totalAmount: checkoutSession.items.reduce(
        (sum, item) => sum + item.price * item.count,
        0
      ),
      createdAt: new Date().toISOString(),
    };

    console.log("Order Data:", orderData);
    alert(`Order placed successfully! Order ID: ${checkoutSession.slug}`);
  };

  return (
    <div className="h-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="w-full">
          <CheckoutForm
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="w-full">
          <OrderSummary items={checkoutSession.items} />
        </div>
      </div>
    </div>
  );
}
