import { getAllCategories } from "@/lib/api/categories";
import { deleteProduct, getProductData } from "@/lib/api/products";
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
import UpdateProductForm from "./_components/form";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: productData } = await getProductData(slug, {
    init: {
      next: {
        revalidate: 0,
      },
    },
  });
  const { data: categoryData } = await getAllCategories({
    init: {
      next: {
        revalidate: 0,
      },
    },
  });

  if (!productData) {
    notFound();
  }

  return (
    <UpsertProvider
      type="update"
      resourceUrl="/admin/products"
      model={{
        plural: "Products",
        singular: "Product",
      }}
      title={productData.name}
    >
      <UpsertBreadcrumb />
      <UpsertToolbar>
        <UpsertHeader />
        <UpsertActions>
          <Button variant="outline" asChild>
            <Link href={`/products/${slug}`} target="_blank">
              Preview
            </Link>
          </Button>
          <DeleteAction action={deleteProduct} id={productData.slug} />
        </UpsertActions>
      </UpsertToolbar>

      <UpdateProductForm data={productData} categories={categoryData} />
    </UpsertProvider>
  );
}
