import type { FeaturedCategoryItem } from "@/types/strapi/components/home-page-item/featured-category-item";

export interface FeaturedCategorySection {
    id: number;
    categories: FeaturedCategoryItem[];
}