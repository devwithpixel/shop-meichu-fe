import type { SubHeroItem } from "@/types/strapi/components/home-page-item/sub-hero-item";

export interface SubHeroSection {
  id: number;
  description: string;
  items: SubHeroItem[];
}
