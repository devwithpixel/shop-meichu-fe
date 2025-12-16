import { getCategoryData } from "@/lib/api/categories";
import { ShowCategoryForm } from "./_components/section";
import {
  UpsertBreadcrumb,
  UpsertHeader,
  UpsertProvider,
  UpsertToolbar,
} from "@/components/resource/upsert";
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
    <UpsertProvider
      type="show"
      resourceUrl="/admin/categories"
      model={{
        plural: "Categories",
        singular: "Category",
      }}
      title={data.name}
    >
      <UpsertBreadcrumb />
      <UpsertToolbar>
        <UpsertHeader />
      </UpsertToolbar>

      <ShowCategoryForm data={data} products={products} />
    </UpsertProvider>
  );
}
