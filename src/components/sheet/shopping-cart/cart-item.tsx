import { Minus, Plus } from "lucide-react";
import { useMemo } from "react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

import type { CartItem } from "@/types/cart";

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const accumulatedPrice = useMemo(
    () => formatCurrency(item.price * item.quantity),
    [item]
  );

  return (
    <div className="flex gap-4 py-4 border-b last:border-b-0">
      <img
        src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${item?.images?.[0]?.url}`}
        className="w-24 h-24 rounded-xl object-cover shrink-0"
        alt={item.name}
      />

      <div className="flex flex-1 flex-col justify-center gap-4">
        <Link
          href={`/product/${item.slug}`}
          className="flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold text-base">{item.name}</h3>
          </div>

          <div className="font-semibold text-lg">{accumulatedPrice}</div>
        </Link>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onUpdateQuantity(item.id, -1)}
              className="border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition"
            >
              <Minus className="w-3 h-3" />
            </button>

            <span className="text-sm font-medium min-w-5 text-center">
              {item.quantity}
            </span>

            <button
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-500 text-sm underline hover:text-gray-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
