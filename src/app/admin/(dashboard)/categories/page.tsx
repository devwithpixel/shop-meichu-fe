import { categoriesColumn } from "@/config/table-column";
import { getAllCategories, deleteCategory } from "@/lib/api/categories";
import { TableActionProvider } from "@/context/table-action-provider";
import { AdminHeader } from "@/components/layout/header/admin-header";
import { AdminTable } from "@/components/table/admin-table";

import type { ExtendedParams } from "@/lib/api/base";

export async function getAllCategoriesWithProductCount(
  params?: ExtendedParams
) {
  "use server";
  const response = await getAllCategories({
    populate: {
      thumbnail: true,
      products: {
        count: true,
      },
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
    <>
      <AdminHeader title="Categories" />
      <TableActionProvider
        getAction={getAllCategoriesWithProductCount}
        deleteAction={deleteCategory}
        filters={{ name: "$contains" }}
      >
        <AdminTable
          columns={categoriesColumn}
          routes={{ create: "/admin/categories/create" }}
        />
      </TableActionProvider>
    </>
  );
}
