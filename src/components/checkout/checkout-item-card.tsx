import { formatCurrency } from "@/lib/utils";
import Image from "@/components/global/image";

import type { CartItem } from "@/types/cart";

export default function CheckoutItemCard({ item }: { item: CartItem }) {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 last:border-b-0 font-inter">
      <div className="relative shrink-0">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${item.images?.[0]?.url}`}
          alt={item.name}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
          {item.quantity}
        </div>
      </div>

      <div className="flex-1 flex justify-between">
        <div className="flex flex-col justify-center">
          <h3 className="font-semibold pr-10 md:max-w-none text-sm text-gray-900">
            {item.name}
          </h3>
        </div>
        <div className="text-sm font-bold text-gray-900 flex items-center pr-4">
          {formatCurrency(item.price * item.quantity)}
        </div>
      </div>
    </div>
  );
}
