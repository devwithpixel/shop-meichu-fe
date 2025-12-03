"use client";

import { useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RelatedProduct } from "@/types/detail-product/product";

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 5);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 5
    );
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const itemWidth = 140;
    container.scrollBy({
      left: direction === "left" ? -itemWidth : itemWidth,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="font-rubik font-bold text-xs md:text-sm">
          PAIRS WELL WITH
        </p>
        <div className="flex items-center justify-center gap-4">
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
        onScroll={checkScroll}
        className="flex items-center gap-2 overflow-x-scroll scrollbar-hide"
      >
        {products.map((item) => (
          <div
            key={item.id}
            className="w-31 sm:w-50 md:w-60 lg:w-33 shrink-0 space-y-2 text-center cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src={item.images.hover}
              className="w-31 sm:w-50 md:w-60 lg:w-33 h-32 sm:h-50 md:h-60 lg:h-35 object-cover rounded-xl md:rounded-3xl bg-gray-300"
              alt={item.title}
            />
            <h1 className="text-xs font-semibold font-rubik">{item.title}</h1>
            <p className="text-xs font-rubik">
              ${item.price.toLocaleString()} USD
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
