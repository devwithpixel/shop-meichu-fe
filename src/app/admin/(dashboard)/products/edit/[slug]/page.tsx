import { getAllItem, getSpecificItem } from "@/actions/admin";
import { UpsertProductForm } from "@/components/form/admin/forms";

import type { Category } from "@/types/strapi/models/category";
import type { Product } from "@/types/strapi/models/product";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await getSpecificItem<Product>("products", slug);
  const { data: categories } = await getAllItem<Category>("categories");

  return (
    <UpsertProductForm type="update" data={data} categories={categories} />
  );
}
