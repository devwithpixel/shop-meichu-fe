import { CreateCategoryForm } from "./_components/form";
import { Suspense } from "react";
import AdminBreadcrumb from "@/components/breadcrumb/admin-breadcrumb";

export default async function Page() {
  return (
    <>
      <AdminBreadcrumb
        type="create"
        modelRoute="/admin/categories"
        modelName="Categories"
      />

      <Suspense>
        <CreateCategoryForm />
      </Suspense>
    </>
  );
}
