"use client";

import { useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSearch } from "@/context/search-provider";
import ProductCard from "@/components/card/product-card";

import type { Product } from "@/types/strapi/models/product";

interface ProductResultsProps {
  products: Product[];
}

export default function ProductResults({ products }: ProductResultsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { searchQuery } = useSearch();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const isMobile = useIsMobile();

  const handleScrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;

    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = "grab";
      }
    }
  };

  return (
    <div className="my-3 lg:mt-10 text-left bg-white lg:bg-transparent pl-5 lg:pl-0">
      <div className="flex items-center justify-between text-left py-6">
        <h1 className="font-medium lg:font-semibold text-xl lg:text-2xl font-rubik text-left">
          {searchQuery ? "RESULTS FOR" : "YOU MAY ALSO LIKE"}
        </h1>
        <div className="flex gap-4 pr-4 lg:pr-0">
          <button
            onClick={handleScrollLeft}
            className="bg-white p-2 lg:p-4 rounded-full border border-black hover:bg-gray-100 transition-all duration-300 z-10 relative"
          >
            <MdKeyboardArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleScrollRight}
            className="bg-white p-2 lg:p-4 rounded-full border border-black hover:bg-gray-100 transition-all duration-300 z-10 relative"
          >
            <MdKeyboardArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {products.length > 0 ? (
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex gap-6 pb-4 overflow-x-auto scrollbar-hide no-scrollbar cursor-grab select-none"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              size={isMobile ? "lg" : "sm"}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            {searchQuery ? "No products found" : "Type something to search"}
          </p>
        </div>
      )}
    </div>
  );
}
