import ScrollSmootherWrapper from "@/components/ScrollSmootherWrapper";
import AdvantageSection from "@/components/sections/advantage-section";
import BestSellerSection from "@/components/sections/best-seller-section";
import BundleSection from "@/components/sections/bundle-section";
import FavoriteSection from "@/components/sections/favorite-section";
import GallerySection from "@/components/sections/gallery-section";
import StyleSection from "@/components/sections/style-section";
import HeroSection from "@/components/sections/hero-section";
import AnimatedSection from "@/components/AnimatedSection";
import TrendingSection from "@/components/sections/trending-section";
import WardrobeSection from "@/components/sections/wardrobe-section";

export default function Home() {
  return (
    <ScrollSmootherWrapper>
      <HeroSection />
      <TrendingSection />
      <AdvantageSection />
      <AnimatedSection />
      <StyleSection />
      <BundleSection />
      <WardrobeSection />
      <FavoriteSection />
      <BestSellerSection />
      <GallerySection />
    </ScrollSmootherWrapper>
  );
}
