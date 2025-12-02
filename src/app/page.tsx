import Footer from "@/components/footer/footer";
import ScrollSmootherWrapper from "@/components/ScrollSmootherWrapper";
import HeroSection from "@/components/sections/hero-section";
import TrendingProductSection from "@/components/sections/trending-product-section";
import BenefitSection from "@/components/sections/benefit-section";
import PhilosophySection from "@/components/sections/philosophy-section";
import BundleSection from "@/components/sections/bundle-section";
import RecommendationSection from "@/components/sections/recommendation-section";
import TrendingStyleSection from "@/components/sections/trending-style-section";
import BestSellerSection from "@/components/sections/best-seller-section";
import LatestTrendSection from "@/components/sections/latest-trend-section";
import FAQSection from "@/components/sections/faq-section";
// import FavoriteSection from "@/components/sections/favorite-section";
// import GallerySection from "@/components/sections/gallery-section";

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
      {homePageData.data.latestTrendSection && (
        <LatestTrendSection data={homePageData.data.latestTrendSection} />
      )}
      {homePageData.data.faqSection && (
        <FAQSection data={homePageData.data.faqSection} />
      )}
      {/*
      
      <FavoriteSection />
      <GallerySection />
       */}
      <Footer />
    </ScrollSmootherWrapper>
  );
}
