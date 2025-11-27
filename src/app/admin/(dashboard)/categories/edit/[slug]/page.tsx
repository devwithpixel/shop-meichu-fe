import { getSpecificItem } from "@/actions/admin";
import { UpsertCategoryForm } from "@/components/form/admin/forms";

import type { Category } from "@/types/strapi/models/category";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await getSpecificItem<Category>("categories", slug);

  return <UpsertCategoryForm type="update" data={data} />;
}
