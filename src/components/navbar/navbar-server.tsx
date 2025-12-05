import Navbar from "./navbar";
import { getNavbarData } from "@/lib/api/navbar";
import { getAllCategories } from "@/lib/api/categories";

export default async function NavbarServer() {
  const { data: navbarData } = await getNavbarData();
  const { data: categories } = await getAllCategories();

  return <Navbar data={navbarData} categories={categories} />;
}
