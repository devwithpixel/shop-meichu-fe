import type { BaseSection } from "@/types/strapi/components/shared/base-section";
import type { CTAButton } from "@/types/strapi/components/shared/cta-button";
import type { StrapiImage } from "@/types/strapi/media/image";

export interface LatestTrendSection {
  id: number;
  section: BaseSection;
  ctaButton?: CTAButton;
  leftImage?: StrapiImage;
  rightImage?: StrapiImage;
}
