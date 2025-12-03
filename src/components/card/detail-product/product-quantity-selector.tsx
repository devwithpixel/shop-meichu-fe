"use client";

import { FaMinus, FaPlus } from "react-icons/fa6";

interface ProductQuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export default function ProductQuantitySelector({
  quantity,
  onQuantityChange,
}: ProductQuantitySelectorProps) {
  return (
    <div className="my-5">
      <p className="font-rubik font-bold text-xs mb-2">Quantity</p>

      <div className="w-fit flex items-center justify-start gap-8 border border-black px-4 py-2.5 rounded-sm">
        <FaMinus
          size={14}
          className={`cursor-pointer ${
            quantity === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-black hover:text-gray-600"
          }`}
          onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}
        />

        <p className="font-medium">{quantity}</p>

        <FaPlus
          size={14}
          className="cursor-pointer hover:text-gray-600"
          onClick={() => onQuantityChange(quantity + 1)}
        />
      </div>
    </div>
  );
}
