import { FaMinus, FaPlus } from "react-icons/fa6";

interface QuantitySelectorProps {
  quantity: number;
  stock: number;
  onQuantityChange: (quantity: number) => void;
}

export default function QuantitySelector({
  quantity,
  stock,
  onQuantityChange,
}: QuantitySelectorProps) {
  const isOutOfStock = stock === 0;

  const updateQuantity = (addition: number) => {
    if (addition === 0 || isOutOfStock) return;

    const newQuantity = quantity + addition;

    if (newQuantity < 1 || newQuantity > stock) {
      return;
    }

    onQuantityChange(newQuantity);
  };

  const handleDecrease = () => {
    updateQuantity(-1);
  };

  const handleIncrease = () => {
    updateQuantity(1);
  };

  return (
    <div className="my-5">
      <p className="font-rubik font-bold text-xs mb-2">Quantity</p>

      <div
        className={`w-fit select-none flex items-center justify-start gap-8 border px-4 py-2.5 rounded-sm ${
          isOutOfStock
            ? "border-gray-300 bg-gray-200 cursor-not-allowed"
            : "border-black bg-white"
        }`}
      >
        <FaMinus
          size={14}
          className={`${
            isOutOfStock || quantity === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-black hover:text-gray-600 cursor-pointer"
          }`}
          onClick={!isOutOfStock ? handleDecrease : undefined}
        />

        <p
          className={`font-medium ${isOutOfStock ? "text-gray-500" : "text-black"}`}
        >
          {quantity}
        </p>

        <FaPlus
          size={14}
          className={`${
            isOutOfStock || quantity >= stock
              ? "text-gray-400 cursor-not-allowed"
              : "text-black hover:text-gray-600 cursor-pointer"
          }`}
          onClick={!isOutOfStock ? handleIncrease : undefined}
        />
      </div>

      {!isOutOfStock && quantity >= stock && (
        <p className="text-xs text-orange-500 mt-2">
          Maximum stock reached ({stock} items available)
        </p>
      )}
    </div>
  );
}
