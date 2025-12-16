import { getAllCategories } from "@/lib/api/categories";
import {
  UpsertBreadcrumb,
  UpsertHeader,
  UpsertProvider,
  UpsertToolbar,
} from "@/components/resource/upsert";
import CreateProductForm from "./_components/form";

export default async function Page() {
  const { data } = await getAllCategories({
    init: {
      next: {
        revalidate: 0,
      },
    },
  });

  return (
    <UpsertProvider
      type="create"
      resourceUrl="/admin/products"
      model={{
        plural: "Products",
        singular: "Product",
      }}
    >
      <UpsertBreadcrumb />
      <UpsertToolbar>
        <UpsertHeader />
      </UpsertToolbar>

      <CreateProductForm categories={data} />
    </UpsertProvider>
  );
}
