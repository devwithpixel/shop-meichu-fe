import { getCategoryData } from "@/lib/api/categories";
import { getProductsByCategory } from "@/lib/api/products";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import IconElement from "@/components/ui/icon-element";
import ProductCard from "@/components/card/product-card";
import HeaderPage from "@/components/header/header-page";
import SetFooter from "./_components/set-footer";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: category } = await getCategoryData(slug);

  if (!category)
    return {
      title: "Not Found",
    };

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
  const { data: products } = await getProductsByCategory(slug, {
    populate: "*",
  });
  const { data: category } = await getCategoryData(slug);

  if (!category || !products) {
    return notFound();
  }

  return (
    <div className="bg-[#D9E4E8]">
      <Suspense fallback={<Skeleton className="w-full h-62 md:h-74" />}>
        <HeaderPage
          type="collections"
          image={category.heading?.thumbnail}
          title={category.heading!.title}
          desc={category.heading!.description}
        />
        <SetFooter backgroundColor={category.backgroundColor} />
      </Suspense>

      <div className="relative">
        <IconElement variant={2} />
        <div className="px-5 py-10 space-y-6 md:space-y-14 h-full">
          <Link href="/collections">
            <button className="mb-12 px-5 py-1.5 bg-black text-white flex items-center justify-center gap-2 rounded-full">
              All Collections
            </button>
          </Link>

          <div className="flex items-center justify-center md:justify-start lg:justify-start flex-wrap gap-y-14 md:gap-y-14 lg:gap-y-14 gap-2 md:gap-5.5 lg:gap-4 pb-6 overflow-x-scroll lg:overflow-x-visible">
            <Suspense fallback={<Skeleton className="w-full h-64" />}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} size="lg" />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
