import FilterCard from "@/components/card/filter-card";
import TrendingProduct from "@/components/card/trending-product";
import HeaderPage from "@/components/header/header-page";
import { products } from "@/lib/data/product";

export default function CollectionsPage() {
  return (
    <div className="bg-white h-screen md:overflow-x-hidden overflow-y-scroll">
      <HeaderPage
        type="collections"
        img="/assets/gallery/girl3.jpg"
        title="SEASONAL MUST-HAVES"
        desc="Elevate your wardrobe with the latest essentials tailored for the season—handpicked styles
              that blend comfort, trend, and timeless appeal."
      />
      <div className="mx-5 my-10 space-y-6 md:space-y-14 h-full">
        <FilterCard />
        <div className="flex items-center justify-center md:justify-start lg:justify-start flex-wrap gap-y-14 md:gap-y-14 lg:gap-y-14 gap-2 md:gap-5.5 lg:gap-4 mb-6 overflow-x-scroll lg:overflow-x-visible">
          {products.map((p) => (
            <TrendingProduct key={p.id} product={p} size="lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
