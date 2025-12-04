"use client";

import { useCallback, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import type { ReviewSection } from "@/types/strapi/components/home-page/review-section";

export default function ReviewSection({ data }: { data: ReviewSection }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [index, setIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || !data.reviews?.length) return;

    const itemWidth = container.scrollWidth / (data.reviews?.length || 0);
    const scrollIndex = Math.round(container.scrollLeft / itemWidth);
    setIndex(scrollIndex);
  }, [data.reviews?.length]);

  const scrollTo = useCallback(
    (i: number) => {
      const container = containerRef.current;
      if (!container || !data.reviews?.length) return;

      const itemWidth = container.scrollWidth / (data.reviews?.length || 0);
      container.scrollTo({ left: itemWidth * i, behavior: "smooth" });
      setIndex(i);
    },
    [data.reviews?.length]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || !containerRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = "grabbing";
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (!containerRef.current) return;

    containerRef.current.style.cursor = "grab";
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      e.preventDefault();
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      containerRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (containerRef.current) {
        containerRef.current.style.cursor = "grab";
      }
    }
  }, [isDragging]);

  return (
    <div className=" w-full pl-6 lg:pl-8 min-h-full bg-[#D9E4E8]">

      <div className="flex-col items-center justify-center py-20 md:py-40">
        <div className="flex flex-col gap-4 md:gap-6">
          <h2 className="text-xs md:text-lg font-medium tracking-wide font-albert-sans">
            {data.section.title}
          </h2>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold md:mb-6 max-w-sm md:max-w-5xl font-albert-sans">
            {data.section.description}
          </h1>
        </div>

        <div
          ref={containerRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex gap-4 md:space-x-4 overflow-x-hidden scroll-smooth no-scrollbar py-4 cursor-grab select-none"
        >
          {data.reviews?.map((review) => (
            <Card
              key={review.id}
              className="w-96 md:w-98 lg:w-115 shrink-0 rounded-3xl lg:px-4 lg:py-12 bg-white text-black transition-all duration-300 hover:-translate-y-2 hover:border-black hover:border-2"
            >
              <CardContent>
                <div className="">
                  <p className="text-sm lg:text-base font-albert-sans font-medium leading-relaxed mb-4">
                    {review.review}
                  </p>
                </div>
                <div className="flex items-center gap-5 mt-6 md:mt-8 font-albert-sans">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${review.avatar?.url}`}
                    alt={review.name}
                    className="w-14 h-14 lg:w-16 lg:h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-normal text-base">{review.name}</p>
                    <p className="text-base font-normal">{review.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {data.reviews?.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-3 rounded-full transition-all ${
                index === i ? "w-6 bg-gray-300" : "w-3 bg-black"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
