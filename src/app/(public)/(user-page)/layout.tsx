import { getAllCategories } from "@/lib/api/categories";
import { Suspense } from "react";
import MainLayout from "@/components/layout/main-layout";
import NoScrollSmootherContent from "@/components/no-scroll-smoother-content";
import Search from "@/components/sheet/search";

export default async function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: categories } = await getAllCategories();

  return (
    <MainLayout>
      {children}
      <NoScrollSmootherContent>
        <Suspense>
          <Search categories={categories} />
        </Suspense>
      </NoScrollSmootherContent>
    </MainLayout>
  );
}
