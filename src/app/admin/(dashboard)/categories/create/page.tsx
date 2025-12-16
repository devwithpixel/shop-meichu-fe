import { CreateCategoryForm } from "./_components/form";
import {
  UpsertBreadcrumb,
  UpsertHeader,
  UpsertProvider,
  UpsertToolbar,
} from "@/components/resource/upsert";

export default async function Page() {
  return (
    <UpsertProvider
      type="create"
      resourceUrl="/admin/categories"
      model={{
        plural: "Categories",
        singular: "Category",
      }}
    >
      <UpsertBreadcrumb />
      <UpsertToolbar>
        <UpsertHeader />
      </UpsertToolbar>

      <CreateCategoryForm />
    </UpsertProvider>
  );
}
