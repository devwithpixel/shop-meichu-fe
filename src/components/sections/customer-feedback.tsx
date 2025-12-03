"use client";

import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const feedbacks = [
  {
    name: "Sophia M.",
    location: "San Francisco, CA",
    text: "I recently ordered a few items from the 'Stay Warm & Stylish' collection, and I couldn’t be happier. The jacket I bought is warm and trendy, and I’ve received so many compliments! Fits just right.",
    image: "./assets/gallery/girl3.jpg",
  },
  {
    name: "John P.",
    location: "Austin, TX",
    text: "I recently ordered a few items from the 'Stay Warm & Stylish' collection, and I couldn’t be happier. The jacket I bought is warm and trendy, and I’ve received so many compliments! Fits just right.",
    image: "./assets/gallery/girl3.jpg",
  },
  {
    name: "Emily R.",
    location: "Miami, FL",
    text: "As someone conscious about the environment, I was thrilled to find a clothing brand that offers an eco‑friendly collection without sacrificing style. The clothes are beautiful and comfortable.",
    image: "./assets/gallery/girl3.jpg",
  },
  {
    name: "Emily R.",
    location: "Miami, FL",
    text: "As someone conscious about the environment, I was thrilled to find a clothing brand that offers an eco‑friendly collection without sacrificing style. The clothes are beautiful and comfortable.",
    image: "./assets/gallery/girl3.jpg",
  },
  {
    name: "Emily R.",
    location: "Miami, FL",
    text: "As someone conscious about the environment, I was thrilled to find a clothing brand that offers an eco‑friendly collection without sacrificing style. The clothes are beautiful and comfortable.",
    image: "./assets/gallery/girl3.jpg",
  },
  {
    name: "Emily R.",
    location: "Miami, FL",
    text: "As someone conscious about the environment, I was thrilled to find a clothing brand that offers an eco‑friendly collection without sacrificing style. The clothes are beautiful and comfortable.",
    image: "./assets/gallery/girl3.jpg",
  },
  {
    name: "Emily R.",
    location: "Miami, FL",
    text: "As someone conscious about the environment, I was thrilled to find a clothing brand that offers an eco‑friendly collection without sacrificing style. The clothes are beautiful and comfortable.",
    image: "./assets/gallery/girl3.jpg",
  },
  {
    name: "Emily R.",
    location: "Miami, FL",
    text: "As someone conscious about the environment, I was thrilled to find a clothing brand that offers an eco‑friendly collection without sacrificing style. The clothes are beautiful and comfortable.",
    image: "./assets/gallery/girl3.jpg",
  },
  {
    name: "Emily R.",
    location: "Miami, FL",
    text: "As someone conscious about the environment, I was thrilled to find a clothing brand that offers an eco‑friendly collection without sacrificing style. The clothes are beautiful and comfortable.",
    image: "./assets/gallery/girl3.jpg",
  },
  {
    name: "Emily R.",
    location: "Miami, FL",
    text: "As someone conscious about the environment, I was thrilled to find a clothing brand that offers an eco‑friendly collection without sacrificing style. The clothes are beautiful and comfortable.",
    image: "./assets/gallery/girl3.jpg",
  },
];

export default function CustomerFeedback() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [index, setIndex] = useState(0);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const itemWidth = container.scrollWidth / feedbacks.length;
    const scrollIndex = Math.round(container.scrollLeft / itemWidth);
    setIndex(scrollIndex);
  };

  const scrollTo = (i: number) => {
    const container = containerRef.current;
    if (!container) return;
    const itemWidth = container.scrollWidth / feedbacks.length;
    container.scrollTo({ left: itemWidth * i, behavior: "smooth" });
    setIndex(i);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;

    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (containerRef.current) {
        containerRef.current.style.cursor = "grab";
      }
    }
  };

  return (
    <div className="w-full pl-6 lg:pl-8 min-h-full bg-[#f2f2f2]">
      <div className="flex-col items-center justify-center py-20 md:py-40">
        <div className="flex flex-col gap-4 md:gap-6">
          <h2 className="md:text-lg font-medium tracking-wide font-rubik">
            SUCCESS STORIES THAT INSPIRE
          </h2>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-medium md:mb-6 sm:max-w-xs md:max-w-none font-rubik">
            SEE WHAT REAL CUSTOMER SAY
          </h1>
        </div>

        <div
          ref={containerRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex space-x-4 overflow-x-hidden scroll-smooth no-scrollbar py-4 cursor-grab select-none"
        >
          {feedbacks.map((feed, i) => (
            <Card
              key={i}
              className="w-96 md:w-98 lg:w-115 shrink-0 rounded-3xl lg:px-4 lg:py-12 bg-white text-black transition-all duration-300 hover:-translate-y-2 hover:border-black hover:border-2"
            >
              <CardContent>
                <div className="">
                  <p className="text-sm lg:text-base font-inter font-medium leading-relaxed mb-4">
                    {feed.text}
                  </p>
                </div>
                <div className="flex items-center gap-5 mt-6 md:mt-8 font-inter">
                  <img
                    src={feed.image}
                    alt={feed.name}
                    className="w-14 h-14 lg:w-16 lg:h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-normal text-base">{feed.name}</p>
                    <p className="text-base font-normal">{feed.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {feedbacks.map((_, i) => (
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
