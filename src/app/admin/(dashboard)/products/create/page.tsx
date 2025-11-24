import { CreateProductForm } from "@/components/form/admin/create-form";
import { getAllItem } from "@/actions/admin";

import type { Category } from "@/types/strapi/models/category";

export default async function Page() {
  const { data } = await getAllItem<Category>("categories");

  return <CreateProductForm categories={data} />;
}
