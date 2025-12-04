import FilterCard from "@/components/card/filter-card";
import Footer from "@/components/footer/footer";
import ProductCard from "@/components/card/product-card";
import HeaderPage from "@/components/header/header-page";

import type { Metadata } from "next";
import type { StrapiResponse } from "@/types/strapi/response";
import type { Product } from "@/types/strapi/models/product";
import type { Category } from "@/types/strapi/models/category";

const headerData = {
  type: "collections",
  img: "/assets/gallery/girl3.jpg",
  title: "SEASONAL MUST-HAVES",
  desc: "Elevate your wardrobe with the latest essentials tailored for the season—handpicked styles that blend comfort, trend, and timeless appeal.",
} as const;

async function getProductsByCategory(
  slug: string
): Promise<StrapiResponse<Product[]>> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories/${slug}/products?populate=*`
  );
  return await res.json();
}

async function getCategoryBySlug(
  slug: string
): Promise<StrapiResponse<Category>> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories/${slug}`
  );
  return await res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: category } = await getCategoryBySlug(slug);

  return {
    title: `${category.name} – Shop Meichu`,
  };
}

export default async function CollectionsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: products } = await getProductsByCategory(slug);
  const { data: category } = await getCategoryBySlug(slug);

  return (
    <div className="bg-gray-100">
      <HeaderPage
        type={headerData.type}
        img={headerData.img}
        title={headerData.title}
        desc={headerData.desc}
      />
      <div className="mx-5 my-10 space-y-6 md:space-y-14 h-full">
        <FilterCard />
        <div className="flex items-center justify-center md:justify-start lg:justify-start flex-wrap gap-y-14 md:gap-y-14 lg:gap-y-14 gap-2 md:gap-5.5 lg:gap-4 mb-6 overflow-x-scroll lg:overflow-x-visible">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} size="lg" />
          ))}
        </div>
      </div>

      <Footer backgroundColor={category.backgroundColor} />
    </div>
  );
}
