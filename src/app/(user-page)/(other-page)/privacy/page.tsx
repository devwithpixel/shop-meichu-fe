import { StrapiResponse } from "@/types/strapi/response";
import { PrivacyPolicy } from "@/types/strapi/single-type/privacy-policy";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

async function getPrivacyPolicy(): Promise<StrapiResponse<PrivacyPolicy>> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/privacy-policy`,
    {
      next: {
        revalidate: 60 * 15,
      },
    }
  );
  return await res.json();
}

export default async function Page() {
  const privacyPolicy = await getPrivacyPolicy();

  return (
    <main className="bg-white font-rubik">
      <section className="max-w-6xl mx-auto py-18">
        <h1 className="text-center text-6xl md:text-8xl font-medium mb-12">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none">
          <BlocksRenderer content={privacyPolicy.data.content} />
        </div>
      </section>
    </main>
  );
}
