import CollectionsCard from "@/components/card/collections-card";
import Footer from "@/components/footer/footer";
import HeaderPage from "@/components/header/header-page";
import { StrapiRelationCount } from "@/types/strapi/count-relation";

import type { Metadata } from "next";
import type { Category } from "@/types/strapi/models/category";
import type { StrapiResponse } from "@/types/strapi/response";

async function getAllCategories(): Promise<StrapiResponse<Category[]>> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories?populate[products][count]=true&populate[thumbnail]=true&sort[0]=name:asc`
  );
  return await res.json();
}

export const metadata: Metadata = {
  title: "Collections – Shop Meichu",
};

export default async function CollectionsAllPage() {
  const { data: categories } = await getAllCategories();

  return (
    <div className="bg-white">
      <HeaderPage
        type="collections"
        img="/assets/gallery/girl3.jpg"
        title="SEASONAL MUST-HAVES"
        desc="Elevate your wardrobe with the latest essentials tailored for the season—handpicked styles that blend comfort, trend, and timeless appeal."
      />

      <div className="flex flex-wrap">
        {categories.map((category, index) => (
          <CollectionsCard
            key={category.id}
            index={index}
            title={category.name}
            image={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category.thumbnail?.url}`}
            productsCount={
              (category.products as StrapiRelationCount)?.count || 0
            }
            bgColor="bg-gray-200"
            link={`/collections/${category.slug}`}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
