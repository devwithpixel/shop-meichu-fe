import { getAllCategories } from "@/lib/api/categories";
import { Suspense } from "react";
import AdminBreadcrumb from "@/components/breadcrumb/admin-breadcrumb";
import CreateProductForm from "./_components/form";

export default async function Page() {
  const { data } = await getAllCategories();

  return (
    <Suspense>
      <AdminBreadcrumb
        type="create"
        modelRoute="/admin/products"
        modelName="Products"
      />

      <CreateProductForm categories={data} />
    </Suspense>
  );
}
