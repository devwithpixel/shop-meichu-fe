"use client";

interface ProductSizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeSelect: (size: string) => void;
}

export default function ProductSizeSelector({
  sizes,
  selectedSize,
  onSizeSelect,
}: ProductSizeSelectorProps) {
  return (
    <div className="my-5">
      <p className="font-rubik font-bold text-xs mb-2">SIZE: {selectedSize}</p>

      <div className="flex gap-1.5 flex-wrap">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`px-6 py-2 text-[10px] border rounded transition-colors ${
              selectedSize === size
                ? "bg-black text-white border-black"
                : "border-gray-300 hover:bg-black hover:text-white"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
