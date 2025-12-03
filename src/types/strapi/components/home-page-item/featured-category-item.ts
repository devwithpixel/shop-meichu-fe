import type { Category } from "@/types/strapi/models/category";

export interface FeaturedCategoryItem {
    id: number;
    category?: Category;
    title: string;
    description: string;
}