import { categoriesColumn } from "@/config/table-column";
import { DataTableFetcher } from "@/components/sections/admin-table-section";

export default async function Page() {
  return (
    <DataTableFetcher
      columns={categoriesColumn}
      model="categories"
      populate={{
        products: {
          count: true,
        },
      }}
      enableDelete
    />
  );
}
