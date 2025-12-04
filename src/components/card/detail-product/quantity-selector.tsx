import { FaMinus, FaPlus } from "react-icons/fa6";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export default function QuantitySelector({
  quantity,
  onQuantityChange,
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

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
          onClick={handleDecrease}
        />

        <p className="font-medium">{quantity}</p>

        <FaPlus
          size={14}
          className="cursor-pointer hover:text-gray-600"
          onClick={handleIncrease}
        />
      </div>
    </div>
  );
}
