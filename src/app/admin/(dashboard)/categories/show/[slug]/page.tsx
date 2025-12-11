import { getCategoryData } from "@/lib/api/categories";
import { ShowCategoryForm } from "./_components/section";
import { Suspense } from "react";
import AdminBreadcrumb from "@/components/breadcrumb/admin-breadcrumb";
import { getProductsByCategory } from "@/lib/api/products";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await getCategoryData(slug, {
    init: {
      next: {
        revalidate: 0,
      },
    },
  });
  const { data: products } = await getProductsByCategory(slug, {
    init: {
      next: {
        revalidate: 0,
      },
    },
    populate: "*",
  });

  return (
    <>
      <AdminBreadcrumb
        type="show"
        modelRoute="/admin/categories"
        modelName="Categories"
        title={data.name}
      />

      <Suspense>
        <ShowCategoryForm data={data} products={products} />
      </Suspense>
    </>
  );
}
