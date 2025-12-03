import Footer from "@/components/footer/footer";
import ScrollSmootherWrapper from "@/components/ScrollSmootherWrapper";
import HeroSection from "@/components/sections/home-page/hero-section";
import TrendingProductSection from "@/components/sections/home-page/trending-product-section";
import BenefitSection from "@/components/sections/home-page/benefit-section";
import PhilosophySection from "@/components/sections/home-page/philosophy-section";
import CollectionSection from "@/components/sections/home-page/collection-section";
import BundleSection from "@/components/sections/home-page/bundle-section";
import RecommendationSection from "@/components/sections/home-page/recommendation-section";
import TrendingStyleSection from "@/components/sections/home-page/trending-style-section";
import BestSellerSection from "@/components/sections/home-page/best-seller-section";
import FeaturedCategorySection from "@/components/sections/home-page/featured-category-section";
import LatestTrendSection from "@/components/sections/home-page/latest-trend-section";
import FAQSection from "@/components/sections/home-page/faq-section";

import type { StrapiResponse } from "@/types/strapi/response";
import type { HomePage } from "@/types/strapi/single-type/home-page";

async function getHomePageData(): Promise<StrapiResponse<HomePage>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/home-page`
  );
  return await response.json();
}

export default async function Home() {
  const homePageData = await getHomePageData();

  return (
    <ScrollSmootherWrapper>
      <HeroSection
        data={homePageData.data.heroSection}
        subHeroData={homePageData.data.subHeroSection}
      />
      <TrendingProductSection data={homePageData.data.trendingProductSection} />
      <BenefitSection data={homePageData.data.benefitSection} />
      <PhilosophySection data={homePageData.data.philosophySection} />
      {homePageData.data.collectionSection && (
        <CollectionSection data={homePageData.data.collectionSection} />
      )}
      {homePageData.data.bundleSection && (
        <BundleSection data={homePageData.data.bundleSection} />
      )}
      {homePageData.data.recommendationSection && (
        <RecommendationSection data={homePageData.data.recommendationSection} />
      )}
      {homePageData.data.trendingStyleSection && (
        <TrendingStyleSection data={homePageData.data.trendingStyleSection} />
      )}
      {homePageData.data.bestSellerSection && (
        <BestSellerSection data={homePageData.data.bestSellerSection} />
      )}
      {homePageData.data.reviewSection && null}
      {homePageData.data.featuredCategorySection && (
        <FeaturedCategorySection
          data={homePageData.data.featuredCategorySection}
        />
      )}
      {homePageData.data.latestTrendSection && (
        <LatestTrendSection data={homePageData.data.latestTrendSection} />
      )}
      {homePageData.data.faqSection && (
        <FAQSection data={homePageData.data.faqSection} />
      )}
      <Footer />
    </ScrollSmootherWrapper>
  );
}
