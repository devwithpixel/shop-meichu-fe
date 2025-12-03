import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RecommendedProduct } from "@/types/cart";
import Link from "next/link";

interface RecommendedProductsProps {
  products: RecommendedProduct[];
}

export default function RecommendedProducts({
  products,
}: RecommendedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
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

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <>
      <div className="relative w-auto pl-6">
        <div className="flex items-center justify-between mb-6 mt-4">
          <div className="">
            <p className="font-rubik font-medium text-xs md:text-xl">
              You Many So Like
            </p>
          </div>

          <div className="flex items-center gap-4 pr-4">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full transition-colors ${
                !canScrollLeft
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-white border border-black text-black cursor-pointer"
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
                  : "bg-white border border-black text-black cursor-pointer"
              }`}
            >
              <IoIosArrowForward size={18} />
            </button>
          </div>
        </div>
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex gap-4 overflow-x-hidden scroll-smooth no-scrollbar pb-2 cursor-grab select-none"
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[140px] shrink-0 group">
              <Link href={product.href}>
                <div className="relative overflow-hidden rounded-3xl mb-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="px-1.5">
                  <p className="text-rubik text-xs font-semibold truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    ${product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
