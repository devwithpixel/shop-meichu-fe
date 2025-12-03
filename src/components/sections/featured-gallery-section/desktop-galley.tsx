import { FeaturedCategoryItem } from "@/types/strapi/components/home-page-item/featured-category-item";
import CategoryCard from "@/components/sections/featured-gallery-section/text-card";
import CategoryImageCard from "@/components/sections/featured-gallery-section/image-card";

interface DesktopGalleryGridProps {
  categories: FeaturedCategoryItem[];
  currentIndex: number;
  nextIndex: number;
  isAnimating: boolean;
  getSlideAnimation: () => string;
  getExitAnimation: () => string;
}

export default function DesktopGalleryGrid({
  categories,
  currentIndex,
  nextIndex,
  isAnimating,
  getSlideAnimation,
  getExitAnimation,
}: DesktopGalleryGridProps) {
  const getIndex = (offset: number) => {
    return (currentIndex + offset) % categories.length;
  };

  const getNextIndexFor = (offset: number) => {
    return (nextIndex + offset) % categories.length;
  };

  return (
    <div className="hidden md:grid grid-cols-4 grid-rows-4 gap-5 w-full">
      <CategoryImageCard
        item={categories[getIndex(0)]}
        nextItem={categories[getNextIndexFor(0)]}
        isAnimating={isAnimating}
        getSlideAnimation={getSlideAnimation}
        getExitAnimation={getExitAnimation}
        className="col-span-2 row-span-2"
      />

      <CategoryCard
        item={categories[getIndex(1)]}
        nextItem={categories[getNextIndexFor(1)]}
        isAnimating={isAnimating}
        getSlideAnimation={getSlideAnimation}
        getExitAnimation={getExitAnimation}
        className="col-start-3"
      />

      <CategoryCard
        item={categories[getIndex(2)]}
        nextItem={categories[getNextIndexFor(2)]}
        isAnimating={isAnimating}
        getSlideAnimation={getSlideAnimation}
        getExitAnimation={getExitAnimation}
        className="row-span-2 col-start-3 row-start-2"
      />

      <CategoryImageCard
        item={categories[getIndex(3)]}
        nextItem={categories[getNextIndexFor(3)]}
        isAnimating={isAnimating}
        getSlideAnimation={getSlideAnimation}
        getExitAnimation={getExitAnimation}
        className="row-span-2 col-start-2 row-start-3"
      />

      <CategoryCard
        item={categories[getIndex(4)]}
        nextItem={categories[getNextIndexFor(4)]}
        isAnimating={isAnimating}
        getSlideAnimation={getSlideAnimation}
        getExitAnimation={getExitAnimation}
        className="row-span-2 col-start-1 row-start-3"
      />

      <CategoryCard
        item={categories[getIndex(5)]}
        nextItem={categories[getNextIndexFor(5)]}
        isAnimating={isAnimating}
        getSlideAnimation={getSlideAnimation}
        getExitAnimation={getExitAnimation}
        className="row-span-2 col-start-4 row-start-1"
      />

      <CategoryImageCard
        item={categories[getIndex(6)]}
        nextItem={categories[getNextIndexFor(6)]}
        isAnimating={isAnimating}
        getSlideAnimation={getSlideAnimation}
        getExitAnimation={getExitAnimation}
        className="row-span-2 col-start-4 row-start-3"
      />

      <CategoryCard
        item={categories[getIndex(7)]}
        nextItem={categories[getNextIndexFor(7)]}
        isAnimating={isAnimating}
        getSlideAnimation={getSlideAnimation}
        getExitAnimation={getExitAnimation}
        className="col-start-3 row-start-4"
      />
    </div>
  );
}
