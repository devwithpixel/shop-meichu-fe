import { productsColumn } from "@/config/table-column";
import { TableActionProvider } from "@/context/table-action-provider";
import { AdminTable } from "@/components/table/admin-table";
import { deleteProduct, getAllProducts } from "@/lib/api/products";

import type { ExtendedParams } from "@/lib/api/base";

async function getAllProductsWithImage(params?: ExtendedParams) {
  "use server";
  const response = await getAllProducts({
    populate: {
      images: true,
    },
    init: {
      next: {
        revalidate: 0,
      },
    },
    ...params,
  });

  return response;
}

export default async function Page() {
  return (
    <TableActionProvider
      getAction={getAllProductsWithImage}
      deleteAction={deleteProduct}
    >
      <AdminTable
        columns={productsColumn}
        routes={{ create: "/admin/products/create" }}
      />
    </TableActionProvider>
  );
}
