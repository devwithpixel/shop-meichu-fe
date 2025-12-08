"use client";

import { Package } from "lucide-react";
import { useCart } from "@/context/cart-provider";
import { useMemo } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import CheckoutItemCard from "./checkout-item-card";

import type { checkoutSchema } from "@/schema/checkout";
import { Controller, UseFormReturn } from "react-hook-form";
import { FieldError } from "@/components/ui/field";
import z from "zod";

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
        "bg-white border border-gray-200 rounded-xl md:rounded-2xl p-4 md:p-6 space-y-3 md:space-y-4 font-inter",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3 md:mb-4">
        <Package className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
        <h3 className="font-semibold text-base md:text-lg text-gray-900 font-rubik">
          Order Summary
        </h3>
      </div>

      <Controller
        name="orderItems"
        control={form.control}
        render={({ fieldState }) => (
          <div className="space-y-1">
            <div className="max-h-60 md:max-h-96 md:h-96 overflow-y-auto">
              {items.map((item) => (
                <CheckoutItemCard key={item.id} item={item} />
              ))}
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </div>
        )}
      />

      <div className="border-t border-gray-200 pt-3 md:pt-4 space-y-2 md:space-y-3 text-xs md:text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({totalItems} items)</span>
          <span className="font-semibold text-gray-900">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="border-t border-gray-200 pt-2 md:pt-3 flex justify-between items-center">
          <span className="font-bold text-sm md:text-base text-gray-900">
            Total
          </span>
          <span className="font-bold text-xl md:text-2xl text-gray-900">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
