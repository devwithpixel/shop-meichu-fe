import { deleteCategory, getCategoryData } from "@/lib/api/categories";
import { getProductsByCategory } from "@/lib/api/products";
import { UpdateCategoryForm } from "./_components/form";
import {
  DeleteAction,
  UpsertActions,
  UpsertBreadcrumb,
  UpsertHeader,
  UpsertProvider,
  UpsertToolbar,
} from "@/components/resource/upsert";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await getCategoryData(slug);
  const { data: products } = await getProductsByCategory(slug);

  if (!data) {
    notFound();
  }

  return (
    <UpsertProvider
      type="update"
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
        <UpsertActions>
          <Button variant="outline" asChild>
            <Link href={`/collections/${slug}`} target="_blank">
              Preview
            </Link>
          </Button>
          <DeleteAction
            action={deleteCategory}
            id={data.slug}
            disabled={products.length > 0}
          />
        </UpsertActions>
      </UpsertToolbar>

      <UpdateCategoryForm data={data} />
    </UpsertProvider>
  );
}
