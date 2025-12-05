import { getCollectionData } from "@/lib/api/collection";
import IconElement from "@/components/element/icon-element";
import Footer from "@/components/footer/footer";
import ProductCard from "@/components/card/product-card";
import HeaderPage from "@/components/header/header-page";
import Link from "next/link";

import type { Metadata } from "next";
import type { StrapiResponse } from "@/types/strapi/response";
import type { Product } from "@/types/strapi/models/product";

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
  const { data: collection } = await getCollectionData();
  const { data: products } = await getAllProducts();

  return (
    <div className="bg-[#D9E4E8]">
      <HeaderPage
        type="collections"
        img={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${collection.heading.thumbnail?.url}`}
        title={collection.heading.title}
        desc={collection.heading.description}
      />

      <div className="relative">
        <IconElement variant={3} />
        <div className="px-5 py-10 space-y-6 md:space-y-14 h-full">
          {/* <FilterCard /> */}
          <Link href="/collections">
            <button className="mb-12 px-5 py-1.5 bg-black text-white flex items-center justify-center gap-2 rounded-full">
              All Collections
            </button>
          </Link>
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
