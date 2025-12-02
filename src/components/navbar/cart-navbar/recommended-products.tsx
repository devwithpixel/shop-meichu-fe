import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RecommendedProduct } from "@/types/cart";

interface RecommendedProductsProps {
  products: RecommendedProduct[];
  onAddToCart: (product: RecommendedProduct) => void;
}

export default function RecommendedProducts({
  products,
  onAddToCart,
}: RecommendedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollAmount = 200;

    if (direction === "left") {
      el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    setTimeout(updateScrollState, 300);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <div className="">
      <div className="flex items-center justify-between mb-2 mt-4">
        <p className="font-rubik font-bold text-xs md:text-sm">
          PAIRS WELL WITH
        </p>

        <div className="flex items-center justify-center gap-4 w-96">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full transition-colors ${
              !canScrollLeft
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 cursor-pointer"
            }`}
          >
            <IoIosArrowBack size={18} />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded-full transition-colors ${
              !canScrollRight
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 cursor-pointer"
            }`}
          >
            <IoIosArrowForward size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-scroll pb-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[140px] shrink-0 cursor-pointer group"
            onClick={() => onAddToCart(product)}
          >
            <div className="relative overflow-hidden rounded-xl mb-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 font-semibold text-sm">
                  + Add
                </span>
              </div>
            </div>
            <p className="text-sm font-medium truncate">{product.name}</p>
            <p className="text-sm text-gray-600">
              ${product.price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
