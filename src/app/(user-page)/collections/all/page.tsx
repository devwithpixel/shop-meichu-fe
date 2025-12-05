import FilterCard from "@/components/card/filter-card";
import ProductCard from "@/components/card/product-card";
import Footer from "@/components/footer/footer";
import HeaderPage from "@/components/header/header-page";

import type { Metadata } from "next";
import type { StrapiResponse } from "@/types/strapi/response";
import type { Product } from "@/types/strapi/models/product";
import IconElement from "@/components/element/icon-element";

async function getAllProducts(): Promise<StrapiResponse<Product[]>> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products?populate=*`
  );
  return await res.json();
}

export const metadata: Metadata = {
  title: "Collections – Shop Meichu",
};

export default async function CollectionsAllProductsPage() {
  const { data: products } = await getAllProducts();

  return (
    <div className="bg-[#D9E4E8]">
      <HeaderPage
        type="collections"
        img="/assets/gallery/girl3.jpg"
        title="SEASONAL MUST-HAVES"
        desc="Elevate your wardrobe with the latest essentials tailored for the season—handpicked styles that blend comfort, trend, and timeless appeal."
      />
      <div className="relative">
        <IconElement variant={3} />
        <div className="px-5 py-10 space-y-6 md:space-y-14 h-full">
          <FilterCard />
          <div className="flex items-center justify-center md:justify-start lg:justify-start flex-wrap gap-y-14 md:gap-y-14 lg:gap-y-14 gap-2 md:gap-5.5 lg:gap-4 pb-6 overflow-x-scroll lg:overflow-x-visible">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} size="lg" />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
