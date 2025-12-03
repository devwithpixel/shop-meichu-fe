"use client";

export default function ProductActions() {
  return (
    <div className="my-4">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
        <button className="w-full py-4 border border-black bg-black text-white hover:bg-gray-200 hover:text-black rounded-full transition-colors">
          Add to cart
        </button>

        <button className="w-full py-4 border border-black bg-black text-white hover:bg-gray-200 hover:text-black rounded-full transition-colors">
          Buy it now
        </button>
      </div>
    </div>
  );
}
