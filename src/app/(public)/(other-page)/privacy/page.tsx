import { getPrivacyPolicyData } from "@/lib/api/privacy-policy";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default async function Page() {
  const privacyPolicy = await getPrivacyPolicyData();

  return (
    <main className="bg-white font-rubik">
      <section className="max-w-6xl mx-auto py-18">
        <h1 className="text-center text-6xl md:text-8xl font-medium mb-12">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none px-4">
          <Suspense fallback={<Skeleton className="w-full h-96" />}>
            <BlocksRenderer content={privacyPolicy.data.content} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
