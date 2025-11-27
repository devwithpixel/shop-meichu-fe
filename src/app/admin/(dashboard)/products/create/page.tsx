import { UpsertProductForm } from "@/components/form/admin/forms";
import { getAllItem } from "@/actions/admin";

import type { Category } from "@/types/strapi/models/category";

export default async function Page() {
  const { data } = await getAllItem<Category>("categories");

  return <UpsertProductForm type="create" categories={data} />;
}
