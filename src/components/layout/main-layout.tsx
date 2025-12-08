import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import ScrollSmootherLayout from "@/components/layout/scroll-smoother-layout";
import { getFooterData } from "@/lib/api/footer";
import { getAllCategories } from "@/lib/api/categories";
import { getNavbarData } from "@/lib/api/navbar";

export default async function MainLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [{ data: navbarData }, { data: footerData }, { data: categoriesData }] =
    await Promise.all([getNavbarData(), getFooterData(), getAllCategories()]);

  return (
    <>
      <Navbar data={navbarData} categories={categoriesData} />
      <ScrollSmootherLayout>
        {children}
        <Footer data={footerData} />
      </ScrollSmootherLayout>
    </>
  );
}
