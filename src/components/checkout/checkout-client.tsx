"use client";

import { useCallback } from "react";
import { useCart } from "@/context/cart-provider";
import { useForm } from "react-hook-form";
import { checkoutSchema } from "@/schema/form/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckoutForm from "@/components/checkout/checkout-form";
import OrderSummary from "@/components/checkout/order-summary";
import * as z from "zod";

export default function CheckoutClient() {
  const { items } = useCart();
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      buyerName: "",
      contact: "",
      note: "",
      items: items,
    },
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof checkoutSchema>) => {
      console.log(data);
    },
    [form]
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        className="flex flex-col lg:flex-row gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="w-full lg:w-1/2">
          <CheckoutForm form={form} />
        </div>
        <div className="w-full lg:w-1/2">
          <OrderSummary />
        </div>
      </form>
    </div>
  );
}
