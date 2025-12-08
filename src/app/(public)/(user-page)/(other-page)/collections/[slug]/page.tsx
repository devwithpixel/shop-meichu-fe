import { getCategoryData } from "@/lib/api/categories";
import { getProductsByCategory } from "@/lib/api/products";
import CollectionDetailPage from "./_components/collection-detail-page";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: category } = await getCategoryData(slug);

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

  return <CollectionDetailPage category={category} products={products} />;
}
