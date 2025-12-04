"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimationDirection } from "@/types/gallery";
import GalleryNavigation from "@/components/sections/featured-gallery-section/gallery-navigation";
import DesktopGalleryGrid from "@/components/sections/featured-gallery-section/desktop-galley";
import MobileGalleryGrid from "@/components/sections/featured-gallery-section/mobile-gallery";

import type { FeaturedCategorySection } from "@/types/strapi/components/home-page/featured-category-section";

const slideAnimation: Record<AnimationDirection, string> = {
  right: "animate-in slide-in-from-right-full duration-500",
  left: "animate-in slide-in-from-left-full duration-500",
};

const exitAnimation: Record<AnimationDirection, string> = {
  right: "animate-out slide-out-to-left-full duration-500",
  left: "animate-out slide-out-to-right-full duration-500",
};

export default function FeaturedCategorySection({
  data,
}: {
  data: FeaturedCategorySection;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isPosition, setIsPosition] = useState<AnimationDirection>("right");
  const [isAnimating, setIsAnimating] = useState(false);
  const { categories } = data;

  const getProperIndex = useCallback((index: number, length: number) => {
    return ((index % length) + length) % length;
  }, []);

  const handlePrev = useCallback(() => {
    setIsAnimating(true);
    setIsPosition("left");
    const newIndex = getProperIndex(currentIndex - 1, categories.length);
    setNextIndex(newIndex);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 500);
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    setIsAnimating(true);
    setIsPosition("right");
    const newIndex = getProperIndex(currentIndex + 1, categories.length);
    setNextIndex(newIndex);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 500);
  }, [currentIndex]);

  const slideAnimationClassName = useMemo(
    () => slideAnimation[isPosition],
    [isPosition]
  );
  const exitAnimationClassName = useMemo(
    () => exitAnimation[isPosition],
    [isPosition]
  );

  return (
    <section className="w-full bg-black text-white py-10 px-4 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4/5 md:w-1/2 h-[300px] md:h-96 bg-[#9756FF]/40 blur-3xl"></div>
      </div>

      <GalleryNavigation onPrev={handlePrev} onNext={handleNext} />

      <div className="group relative z-10 w-full">
        <DesktopGalleryGrid
          categories={categories}
          currentIndex={currentIndex}
          nextIndex={nextIndex}
          isAnimating={isAnimating}
          slideAnimationClassName={slideAnimationClassName}
          exitAnimationClassName={exitAnimationClassName}
        />

        <MobileGalleryGrid
          categories={categories}
          currentIndex={currentIndex}
          nextIndex={nextIndex}
          isAnimating={isAnimating}
          slideAnimationClassName={slideAnimationClassName}
          exitAnimationClassName={exitAnimationClassName}
        />
      </div>
    </section>
  );
}
