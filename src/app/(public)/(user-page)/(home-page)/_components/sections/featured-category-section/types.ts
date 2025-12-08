import type { FeaturedCategoryItem } from "@/types/strapi/components/home-page-item/featured-category-item";

export interface GalleryGridProps {
  categories: FeaturedCategoryItem[];
  currentIndex: number;
  nextIndex: number;
  isAnimating: boolean;
  slideAnimationClassName: string;
  exitAnimationClassName: string;
}
