import { FeaturedCategoryItem } from "@/types/strapi/components/home-page-item/featured-category-item";
import CategoryCard from "@/components/sections/featured-gallery-section/text-card";
import CategoryImageCard from "@/components/sections/featured-gallery-section/image-card";

interface MobileGalleryGridProps {
  categories: FeaturedCategoryItem[];
  currentIndex: number;
  nextIndex: number;
  isAnimating: boolean;
  getSlideAnimation: () => string;
  getExitAnimation: () => string;
}

export default function MobileGalleryGrid({
  categories,
  currentIndex,
  nextIndex,
  isAnimating,
  getSlideAnimation,
  getExitAnimation,
}: MobileGalleryGridProps) {
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
        getSlideAnimation={getSlideAnimation}
        getExitAnimation={getExitAnimation}
        className="min-h-[280px]"
      />

      <div className="grid grid-cols-2 gap-4">
        <CategoryCard
          item={categories[getIndex(1)]}
          nextItem={categories[getNextIndexFor(1)]}
          isAnimating={isAnimating}
          getSlideAnimation={getSlideAnimation}
          getExitAnimation={getExitAnimation}
          className="min-h-[200px]"
        />

        <CategoryImageCard
          item={categories[getIndex(2)]}
          nextItem={categories[getNextIndexFor(2)]}
          isAnimating={isAnimating}
          getSlideAnimation={getSlideAnimation}
          getExitAnimation={getExitAnimation}
          className="min-h-[200px]"
        />
      </div>

      <CategoryImageCard
        item={categories[getIndex(3)]}
        nextItem={categories[getNextIndexFor(3)]}
        isAnimating={isAnimating}
        getSlideAnimation={getSlideAnimation}
        getExitAnimation={getExitAnimation}
        className="min-h-[220px]"
      />

      <div className="grid grid-cols-2 gap-4">
        <CategoryCard
          item={categories[getIndex(4)]}
          nextItem={categories[getNextIndexFor(4)]}
          isAnimating={isAnimating}
          getSlideAnimation={getSlideAnimation}
          getExitAnimation={getExitAnimation}
          className="min-h-[220px]"
        />

        <CategoryImageCard
          item={categories[getIndex(5)]}
          nextItem={categories[getNextIndexFor(5)]}
          isAnimating={isAnimating}
          getSlideAnimation={getSlideAnimation}
          getExitAnimation={getExitAnimation}
          className="min-h-[220px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CategoryCard
          item={categories[getIndex(6)]}
          nextItem={categories[getNextIndexFor(6)]}
          isAnimating={isAnimating}
          getSlideAnimation={getSlideAnimation}
          getExitAnimation={getExitAnimation}
          className="min-h-[200px]"
        />

        <CategoryCard
          item={categories[getIndex(7)]}
          nextItem={categories[getNextIndexFor(7)]}
          isAnimating={isAnimating}
          getSlideAnimation={getSlideAnimation}
          getExitAnimation={getExitAnimation}
          className="min-h-[200px]"
        />
      </div>
    </div>
  );
}
