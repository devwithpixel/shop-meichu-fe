import { getAboutUsData } from "@/lib/api/about-us";
import {
  UpsertActions,
  UpsertBreadcrumb,
  UpsertHeader,
  UpsertProvider,
  UpsertToolbar,
} from "@/components/resource/upsert";
import { Button } from "@/components/ui/button";
import { AboutUsForm } from "./_components/form";
import Link from "next/link";

export default async function Page() {
  const { data } = await getAboutUsData();

  return (
    <UpsertProvider
      type="update"
      resourceUrl="/admin/about-us"
      model={{
        plural: "About Us",
        singular: "About Us",
      }}
    >
      <UpsertBreadcrumb />
      <UpsertToolbar>
        <UpsertHeader />
        <UpsertActions>
          <Button variant="outline" asChild>
            <Link href="/about-us" target="_blank">
              Preview
            </Link>
          </Button>
        </UpsertActions>
      </UpsertToolbar>

      <AboutUsForm data={data} />
    </UpsertProvider>
  );
}
