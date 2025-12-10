import { Suspense } from "react";
import RequestProductClient from "./_components/sections/request-product-client";
import { getAboutUsData } from "@/lib/api/about-us";
import type { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import HeaderPage from "@/components/header/header-page";

export const metadata: Metadata = {
  title: "Request Product – Shop Meichu",
};

export default async function RequestProductPage() {
  const { data } = await getAboutUsData();
  return (
    <main className="md:min-h-screen bg-white">
      <Suspense fallback={<Skeleton className="w-full h-62 md:h-74" />}>
        <HeaderPage
          type="about"
          image={data.heading.thumbnail}
          title={data.heading.title}
          desc={data.heading.description}
        />
      </Suspense>
      <div className="mx-auto p-4">
        <Suspense>
          <RequestProductClient />
        </Suspense>
      </div>
    </main>
  );
}
