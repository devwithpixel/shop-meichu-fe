"use client";

import { formatCurrency } from "@/lib/utils";
import Image from "@/components/global/image";

import type { CartItem } from "@/types/cart";

export default function CheckoutItemCard({ item }: { item: CartItem }) {
  return (
    <div className="flex gap-3 md:gap-4 py-3 md:py-4 border-b border-gray-200 last:border-b-0 font-inter">
      <div className="relative shrink-0">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${item.images?.[0]?.url}`}
          alt={item.name}
          className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover"
        />
        <div className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center font-semibold">
          {item.quantity}
        </div>
      </div>

      <div className="flex-1 flex justify-between min-w-0">
        <div className="flex flex-col justify-center flex-1 min-w-0 pr-2">
          <h3 className="font-semibold text-xs md:text-sm text-gray-900 line-clamp-2">
            {item.name}
          </h3>
        </div>
        <div className="text-xs md:text-sm font-bold text-gray-900 flex items-center shrink-0">
          {formatCurrency(item.price * item.quantity)}
        </div>
      </div>
    </div>
  );
}
