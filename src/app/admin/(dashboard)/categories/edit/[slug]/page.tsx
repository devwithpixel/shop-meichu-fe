import { getCategoryData } from "@/lib/api/categories";
import { UpdateCategoryForm } from "./_components/form";
import { Suspense } from "react";
import AdminBreadcrumb from "@/components/breadcrumb/admin-breadcrumb";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await getCategoryData(slug);

  return (
    <>
      <AdminBreadcrumb
        type="update"
        modelRoute="/admin/categories"
        modelName="Categories"
        title={data.name}
      />

      <Suspense>
        <UpdateCategoryForm data={data} />
      </Suspense>
    </>
  );
}
