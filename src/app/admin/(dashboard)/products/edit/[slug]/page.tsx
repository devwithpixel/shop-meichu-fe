import { getAllCategories } from "@/lib/api/categories";
import { getProductData } from "@/lib/api/products";
import { Suspense } from "react";
import AdminBreadcrumb from "@/components/breadcrumb/admin-breadcrumb";
import UpdateProductForm from "./_components/form";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: productData } = await getProductData(slug);
  const { data: categoryData } = await getAllCategories();

  return (
    <Suspense>
      <AdminBreadcrumb
        type="update"
        modelRoute="/admin/products"
        modelName="Products"
        title={productData.name}
      />

      <UpdateProductForm data={productData} categories={categoryData} />
    </Suspense>
  );
}
