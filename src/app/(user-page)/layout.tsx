import Navbar from "@/components/navbar/navbar";
import ScrollSmootherWrapper from "@/components/ScrollSmootherWrapper";

import type { Category } from "@/types/strapi/models/category";
import type { Navbar as NavbarType } from "@/types/strapi/components/shared/navbar";
import type { StrapiResponse } from "@/types/strapi/response";

async function getNavbarData(): Promise<StrapiResponse<NavbarType>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/global/navbar`
  );
  return await response.json();
}

async function getCategoryData(): Promise<StrapiResponse<Category[]>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`
  );
  return await response.json();
}

export default async function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: navbarData } = await getNavbarData();
  const { data: categoryData } = await getCategoryData();

  return (
    <>
      <Navbar data={navbarData} categories={categoryData} />
      <ScrollSmootherWrapper>
        <main className="md:pb-0 pb-16 select-none pt-0">{children}</main>
      </ScrollSmootherWrapper>
    </>
  );
}
