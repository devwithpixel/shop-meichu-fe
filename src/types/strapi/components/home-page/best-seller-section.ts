import type { BaseSection } from "@/types/strapi/components/shared/base-section";
import type { StrapiImage } from "@/types/strapi/media/image";
import type { StrapiVideo } from "@/types/strapi/media/video";

export interface BestSellerSection {
  id: number;
  section: BaseSection;
  media: StrapiImage | StrapiVideo;
  ctaLink: string;
}
