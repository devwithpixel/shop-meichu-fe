import { getAllItem } from "@/actions/admin";
import AdminOnly from "@/components/middleware/admin-only";
import AdminTableSection from "@/components/sections/admin-table-section";
import { categoriesColumn } from "@/config/table-column";

import type { Category } from "@/types/strapi/models/category";

export default async function Page() {
  const { data, meta } = await getAllItem<Category>("categories");

  console.log(data, meta);

  return (
    <AdminOnly>
      <AdminTableSection
        data={data}
        columns={categoriesColumn}
        pageCount={meta!.pageCount}
      />
    </AdminOnly>
  );
}
