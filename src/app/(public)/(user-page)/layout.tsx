import { getAllCategories } from "@/lib/api/categories";
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
        <Search categories={categories} />
      </NoScrollSmootherContent>
    </MainLayout>
  );
}
