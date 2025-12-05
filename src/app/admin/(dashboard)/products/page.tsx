import { productsColumn } from "@/config/table-column";
import { DataTableFetcher } from "@/components/sections/admin-table-section";

export default async function Page() {
  return (
    <DataTableFetcher
      columns={productsColumn}
      model="products"
      populate={{
        images: true,
      }}
      enableDelete={true}
    />
  );
}
