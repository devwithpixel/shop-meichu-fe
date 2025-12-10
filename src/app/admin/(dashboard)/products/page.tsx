import { productsColumn } from "@/config/table-column";
import { TableActionProvider } from "@/context/table-action-provider";
import { AdminTable } from "@/components/table/admin-table";
import { deleteProduct, getAllProducts } from "@/lib/api/products";

import type { ExtendedParams } from "@/lib/api/base";

async function extendedGetAllProducts(params?: ExtendedParams) {
  "use server";
  const response = await getAllProducts({
    populate: {
      images: true,
    },
    ...params,
  });

  return response;
}

export default async function Page() {
  return (
    <TableActionProvider
      getAction={extendedGetAllProducts}
      deleteAction={deleteProduct}
      filters={{ name: "$contains" }}
    >
      <AdminTable
        columns={productsColumn}
        routes={{ create: "/admin/products/create" }}
      />
    </TableActionProvider>
  );
}
