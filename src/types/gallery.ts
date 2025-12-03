import type { FeaturedCategorySection } from "@/types/strapi/components/home-page/featured-category-section";

export type AnimationDirection = "left" | "right";

export interface GallerySectionProps {
    data: FeaturedCategorySection;
}