import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getHomePageData } from "@/lib/api/homepage";
import HeroSection from "./_components/sections/hero-section";
import TrendingProductSection from "./_components/sections/trending-product-section";
import BenefitSection from "./_components/sections/benefit-section";
import PhilosophySection from "./_components/sections/philosophy-section";
import CollectionSection from "./_components/sections/collection-section";
import BundleSection from "./_components/sections/bundle-section";
import RecommendationSection from "./_components/sections/recommendation-section";
import TrendingStyleSection from "./_components/sections/trending-style-section";
import ReviewSection from "@/components/sections/review-section";
import BestSellerSection from "./_components/sections/best-seller-section";
import FeaturedCategorySection from "./_components/sections/featured-category-section";
import LatestTrendSection from "./_components/sections/latest-trend-section";
import FAQSection from "./_components/sections/faq-section";

export default async function Home() {
  const homePageData = await getHomePageData();

  return (
    <Suspense fallback={<Skeleton className="w-full h-96" />}>
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
      {homePageData.data.reviewSection && (
        <ReviewSection data={homePageData.data.reviewSection} />
      )}
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
    </Suspense>
  );
}
