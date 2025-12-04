import CategoryCard from "@/components/sections/featured-gallery-section/text-card";
import CategoryImageCard from "@/components/sections/featured-gallery-section/image-card";

import type { GalleryGridProps } from "./types";

export default function MobileGalleryGrid({
  categories,
  currentIndex,
  nextIndex,
  isAnimating,
  slideAnimationClassName,
  exitAnimationClassName,
}: GalleryGridProps) {
  const getIndex = (offset: number) => {
    return (currentIndex + offset) % categories.length;
  };

  const getNextIndexFor = (offset: number) => {
    return (nextIndex + offset) % categories.length;
  };

  return (
    <div className="grid grid-cols-1 gap-5 md:hidden">
      <CategoryImageCard
        item={categories[getIndex(0)]}
        nextItem={categories[getNextIndexFor(0)]}
        isAnimating={isAnimating}
        slideAnimationClassName={slideAnimationClassName}
        exitAnimationClassName={exitAnimationClassName}
        className="min-h-[280px]"
      />

      <div className="grid grid-cols-2 gap-4">
        <CategoryCard
          item={categories[getIndex(1)]}
          nextItem={categories[getNextIndexFor(1)]}
          isAnimating={isAnimating}
          slideAnimationClassName={slideAnimationClassName}
          exitAnimationClassName={exitAnimationClassName}
          className="min-h-[200px]"
          index={getIndex(1)}
          nextIndex={getNextIndexFor(1)}
        />

        <CategoryImageCard
          item={categories[getIndex(2)]}
          nextItem={categories[getNextIndexFor(2)]}
          isAnimating={isAnimating}
          slideAnimationClassName={slideAnimationClassName}
          exitAnimationClassName={exitAnimationClassName}
          className="min-h-[200px]"
        />
      </div>

      <CategoryImageCard
        item={categories[getIndex(3)]}
        nextItem={categories[getNextIndexFor(3)]}
        isAnimating={isAnimating}
        slideAnimationClassName={slideAnimationClassName}
        exitAnimationClassName={exitAnimationClassName}
        className="min-h-[220px]"
      />

      <div className="grid grid-cols-2 gap-4">
        <CategoryCard
          item={categories[getIndex(4)]}
          nextItem={categories[getNextIndexFor(4)]}
          isAnimating={isAnimating}
          slideAnimationClassName={slideAnimationClassName}
          exitAnimationClassName={exitAnimationClassName}
          className="min-h-[220px]"
          index={getIndex(4)}
          nextIndex={getNextIndexFor(4)}
        />

        <CategoryImageCard
          item={categories[getIndex(5)]}
          nextItem={categories[getNextIndexFor(5)]}
          isAnimating={isAnimating}
          slideAnimationClassName={slideAnimationClassName}
          exitAnimationClassName={exitAnimationClassName}
          className="min-h-[220px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CategoryCard
          item={categories[getIndex(6)]}
          nextItem={categories[getNextIndexFor(6)]}
          isAnimating={isAnimating}
          slideAnimationClassName={slideAnimationClassName}
          exitAnimationClassName={exitAnimationClassName}
          className="min-h-[200px]"
          index={getIndex(6)}
          nextIndex={getNextIndexFor(6)}
        />

        <CategoryCard
          item={categories[getIndex(7)]}
          nextItem={categories[getNextIndexFor(7)]}
          isAnimating={isAnimating}
          slideAnimationClassName={slideAnimationClassName}
          exitAnimationClassName={exitAnimationClassName}
          className="min-h-[200px]"
          index={getIndex(7)}
          nextIndex={getNextIndexFor(7)}
        />
      </div>
    </div>
  );
}
