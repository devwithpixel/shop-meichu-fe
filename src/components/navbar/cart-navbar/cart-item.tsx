import { Minus, Plus } from "lucide-react";
import { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex gap-4 pb-4 border-b last:border-b-0">
      <img
        src={item.image}
        className="w-24 h-24 rounded-xl object-cover shrink-0"
        alt={item.name}
      />

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-base">{item.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{item.variant}</p>
          </div>

          <div className="font-semibold text-lg">
            ${(item.price * item.quantity).toLocaleString()}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="border border-gray-300 rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition"
            >
              <Minus className="w-3 h-3" />
            </button>

            <span className="text-sm font-medium min-w-5 text-center">
              {item.quantity}
            </span>

            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
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
