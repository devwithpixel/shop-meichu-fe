import type { HeroSection } from "@/types/strapi/components/home-page/hero-section";
import type { SubHeroSection } from "@/types/strapi/components/home-page/sub-hero-section";
import type { TrendingProductSection } from "@/types/strapi/components/home-page/trending-product-section";
import type { BenefitSection } from "@/types/strapi/components/home-page/benefit-section";
import type { PhilosophySection } from "@/types/strapi/components/home-page/philosophy-section";
import type { CollectionSection } from "@/types/strapi/components/home-page/collection-section";
import type { BundleSection } from "@/types/strapi/components/home-page/bundle-section";
import type { RecommendationSection } from "@/types/strapi/components/home-page/recommendation-section";
import type { TrendingStyleSection } from "@/types/strapi/components/home-page/trending-style-section";
import type { BestSellerSection } from "@/types/strapi/components/home-page/best-seller-section";
import type { FeaturedCategorySection } from "@/types/strapi/components/home-page/featured-category-section";
import type { ReviewSection } from "@/types/strapi/components/home-page/review-section";
import type { LatestTrendSection } from "@/types/strapi/components/home-page/latest-trend-section";
import type { FAQSection } from "@/types/strapi/components/home-page/faq-section";

export interface HomePage {
  heroSection: HeroSection;
  subHeroSection: SubHeroSection;
  trendingProductSection: TrendingProductSection;
  benefitSection: BenefitSection;
  philosophySection: PhilosophySection;
  collectionSection?: CollectionSection;
  bundleSection?: BundleSection;
  recommendationSection?: RecommendationSection;
  trendingStyleSection?: TrendingStyleSection;
  bestSellerSection?: BestSellerSection;
  featuredCategorySection?: FeaturedCategorySection;
  reviewSection?: ReviewSection;
  latestTrendSection?: LatestTrendSection;
  faqSection?: FAQSection;
}
