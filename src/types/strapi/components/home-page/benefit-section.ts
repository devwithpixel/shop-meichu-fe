import type { BaseSection } from "@/types/strapi/components/shared/base-section";
import type { CTAButton } from "@/types/strapi/components/shared/cta-button";
import type { BenefitItem } from "@/types/strapi/components/home-page-item/benefit-item";

export interface BenefitSection {
  id: number;
  section: BaseSection;
  ctaButton: CTAButton;
  items: BenefitItem[];
}
