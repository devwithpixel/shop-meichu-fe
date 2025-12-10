import { getCollectionData } from "@/lib/api/collection";
import { getAllCategories } from "@/lib/api/categories";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
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
      <Suspense fallback={<Skeleton className="w-full h-62 md:h-74" />}>
        <HeaderPage
          type="collections"
          image={collection.heading.thumbnail}
          title={collection.heading.title}
          desc={collection.heading.description}
        />
      </Suspense>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Suspense fallback={<Skeleton className="w-full h-64" />}>
          {categories.map((category, index) => (
            <CollectionsCard
              key={category.id}
              index={index}
              title={category.name}
              image={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category.thumbnail?.url}`}
              productsCount={
                (category.products as StrapiRelationCount)?.count || 0
              }
              bgColor={category.backgroundColor}
              link={`/collections/${category.slug}`}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
