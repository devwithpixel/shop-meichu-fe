import type { StrapiImage } from "@/types/strapi/media/image";
import type { Category } from "@/types/strapi/models/category";

export interface SubHeroItem {
  icon: StrapiImage;
  category: Category;
}
