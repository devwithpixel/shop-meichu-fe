import { getCollectionData } from "@/lib/api/collection";
import { getAllProducts } from "@/lib/api/products";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import IconElement from "@/components/ui/icon-element";
import ProductCard from "@/components/card/product-card";
import HeaderPage from "@/components/header/header-page";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections – Shop Meichu",
};

export default async function CollectionsAllProductsPage() {
  const { data: collection } = await getCollectionData();
  const { data: products } = await getAllProducts({
    populate: {
      images: true,
    },
  });

  return (
    <div className="bg-[#D9E4E8]">
      <Suspense fallback={<Skeleton className="w-full h-62 md:h-74" />}>
        <HeaderPage
          type="collections"
          image={collection.heading.thumbnail}
          title={collection.heading.title}
          desc={collection.heading.description}
        />
      </Suspense>

      <div className="relative">
        <IconElement variant={3} />
        <div className="px-5 py-10 space-y-6 md:space-y-14 h-full">
          <Link href="/collections">
            <button className="mb-12 px-5 py-1.5 bg-black text-white flex items-center justify-center gap-2 rounded-full">
              All Collections
            </button>
          </Link>
          <div className="flex items-center justify-center md:justify-start lg:justify-start flex-wrap gap-y-14 md:gap-y-14 lg:gap-y-14 gap-2 md:gap-5.5 lg:gap-4 pb-6 overflow-x-scroll lg:overflow-x-visible">
            <Suspense fallback={<Skeleton className="w-full h-64" />}>
              {products.map((p) => (
                <ProductCard key={p.id} product={p} size="lg" />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
