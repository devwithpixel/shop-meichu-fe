"use client";

import { useState } from "react";
import { featuredCategorySectionData } from "@/lib/data/gallery-item";
import { AnimationDirection } from "@/types/gallery";
import GalleryNavigation from "@/components/sections/featured-gallery-section/gallery-navigation";
import DesktopGalleryGrid from "@/components/sections/featured-gallery-section/desktop-galley";
import MobileGalleryGrid from "@/components/sections/featured-gallery-section/mobile-gallery";

export default function FeaturedCategorySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isPosition, setIsPosition] = useState<AnimationDirection>("right");
  const [isAnimating, setIsAnimating] = useState(false);

  const categories = featuredCategorySectionData.categories;

  const getProperIndex = (index: number, length: number) => {
    return ((index % length) + length) % length;
  };

  const handlePrev = () => {
    setIsAnimating(true);
    setIsPosition("left");
    const newIndex = getProperIndex(currentIndex - 1, categories.length);
    setNextIndex(newIndex);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    setIsAnimating(true);
    setIsPosition("right"); 
    const newIndex = getProperIndex(currentIndex + 1, categories.length);
    setNextIndex(newIndex);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 500);
  };

  const getSlideAnimation = () => {
    if (isPosition === "right") {
      return "animate-in slide-in-from-right-full duration-500";
    } else {
      return "animate-in slide-in-from-left-full duration-500";
    }
  };

  const getExitAnimation = () => {
    if (isPosition === "right") {
      return "animate-out slide-out-to-left-full duration-500";
    } else {
      return "animate-out slide-out-to-right-full duration-500";
    }
  };

  return (
    <section className="w-full bg-black text-white py-10 px-4 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4/5 md:w-1/2 h-[300px] md:h-96 bg-lime-500/15 blur-3xl"></div>
      </div>

      <GalleryNavigation onPrev={handlePrev} onNext={handleNext} />

      <div className="group relative z-10 w-full">
        <DesktopGalleryGrid
          categories={categories}
          currentIndex={currentIndex}
          nextIndex={nextIndex}
          isAnimating={isAnimating}
          getSlideAnimation={getSlideAnimation}
          getExitAnimation={getExitAnimation}
        />

        <MobileGalleryGrid
          categories={categories}
          currentIndex={currentIndex}
          nextIndex={nextIndex}
          isAnimating={isAnimating}
          getSlideAnimation={getSlideAnimation}
          getExitAnimation={getExitAnimation}
        />
      </div>
    </section>
  );
}
