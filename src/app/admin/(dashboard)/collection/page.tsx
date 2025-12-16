import { getCollectionData } from "@/lib/api/collection";
import {
  UpsertActions,
  UpsertBreadcrumb,
  UpsertHeader,
  UpsertProvider,
  UpsertToolbar,
} from "@/components/resource/upsert";
import { Button } from "@/components/ui/button";
import { CollectionForm } from "./_components/form";
import Link from "next/link";

export default async function Page() {
  const { data } = await getCollectionData();

  return (
    <UpsertProvider
      type="update"
      resourceUrl="/admin/collection"
      model={{
        plural: "Collection",
        singular: "Collection",
      }}
    >
      <UpsertBreadcrumb />
      <UpsertToolbar>
        <UpsertHeader />
        <UpsertActions>
          <Button variant="outline" asChild>
            <Link href="/collections" target="_blank">
              Preview
            </Link>
          </Button>
        </UpsertActions>
      </UpsertToolbar>

      <CollectionForm data={data} />
    </UpsertProvider>
  );
}
