import { getCollectionData } from "@/lib/api/collection";
import { getAllCategories } from "@/lib/api/categories";
import CollectionsCard from "@/components/card/collections-card";
import HeaderPage from "@/components/header/header-page";

import type { Metadata } from "next";
import type { StrapiRelationCount } from "@/types/strapi/count-relation";

export const metadata: Metadata = {
  title: "Collections – Shop Meichu",
};

export default async function CollectionsAllPage() {
  const { data: collection } = await getCollectionData();
  const { data: categories } = await getAllCategories({
    populate: {
      products: {
        count: true,
      },
      thumbnail: true,
    },
    sort: ["name:asc"],
  });

  return (
    <div className="bg-white">
      <HeaderPage
        type="collections"
        img={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${collection.heading.thumbnail?.url}`}
        title={collection.heading.title}
        desc={collection.heading.description}
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
    </div>
  );
}
