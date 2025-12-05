"use client";

import { Package } from "lucide-react";
import { useCart } from "@/context/cart-provider";
import { useMemo } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import CheckoutItemCard from "./checkout-item-card";

import type { checkoutSchema } from "@/schema/form/checkout";
import { Controller, UseFormReturn } from "react-hook-form";
import z from "zod";
import { FieldError } from "../ui/field";

export default function OrderSummary({
  form,
  className,
}: {
  form: UseFormReturn<z.infer<typeof checkoutSchema>>;
  className?: string;
}) {
  const { items } = useCart();

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const total = subtotal;

  return (
    <div
      className={cn(
        "bg-white border border-gray-200 rounded-2xl p-6 space-y-4 font-inter",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <Package className="w-6 h-6 text-gray-700" />
        <h3 className="font-semibold text-lg text-gray-900 font-rubik">
          Order Summary
        </h3>
      </div>

      <Controller
        name="orderItems"
        control={form.control}
        render={({ fieldState }) => (
          <div className="space-y-1 max-h-96 h-96 overflow-y-auto">
            {items.map((item) => (
              <CheckoutItemCard key={item.id} item={item} />
            ))}

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </div>
        )}
      />

      <div className="border-t border-gray-200 pt-4 space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({totalItems} items)</span>
          <span className="font-semibold text-gray-900">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
          <span className="font-bold text-base text-gray-900">Total</span>
          <span className="font-bold text-2xl text-gray-900">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
