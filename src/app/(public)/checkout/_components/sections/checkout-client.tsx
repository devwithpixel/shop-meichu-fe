"use client";

import { useCallback, useEffect } from "react";
import { useCart } from "@/context/cart-provider";
import { useForm } from "react-hook-form";
import { checkoutSchema } from "@/schema/checkout";
import { redirect } from "next/navigation";
import { checkout } from "@/lib/api/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import CheckoutForm from "./checkout-form";
import OrderSummary from "./order-summary";

export default function CheckoutClient() {
  const { items, note, reset } = useCart();
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      buyerName: "",
      contact: "",
      note: note,
      orderItems: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    },
  });

  useEffect(() => {
    if (items.length === 0) {
      redirect("/");
    }
  }, [items]);

  const onSubmit = useCallback(async (data: z.infer<typeof checkoutSchema>) => {
    const result = await checkout(data);

    switch (result.type) {
      case "success":
        toast.success("Order successfully created.");
        reset();

        setTimeout(() => {
          redirect("/");
        }, 2000);
        break;
      case "validation":
        const errors = result.validation.details
          .errors as unknown as Array<string>;
        toast.error(errors[0]);
        break;
      case "error":
        toast.error(result.message);
        break;
    }
  }, []);

  return (
    <form
      id="checkout-form"
      className="flex flex-col lg:flex-row gap-4 md:gap-6 px-4 md:px-6 lg:px-0"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <CheckoutForm form={form} className="flex-1 order-2 lg:order-1" />
      <OrderSummary form={form} className="flex-1 order-1 lg:order-2" />
    </form>
  );
}
