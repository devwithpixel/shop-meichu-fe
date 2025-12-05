import Navbar from "@/components/navbar/navbar";
import ProductDetailSection from "@/components/sections/detail-product/product-detail-section";

import type { StrapiResponse } from "@/types/strapi/response";
import type { Product } from "@/types/strapi/models/product";
import type { Category } from "@/types/strapi/models/category";
import type { Navbar as NavbarType } from "@/types/strapi/components/shared/navbar";

async function getNavbarData(): Promise<StrapiResponse<NavbarType>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/global/navbar`
  );
  return await response.json();
}

async function getProductData(slug: string): Promise<StrapiResponse<Product>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${slug}`
  );
  return await response.json();
}

async function getCategoryData(): Promise<StrapiResponse<Category[]>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`
  );
  return await response.json();
}

async function getOtherProduct(): Promise<StrapiResponse<Product[]>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/recommended-product`
  );
  return await response.json();
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [productData, otherProductsData, navbarData, categoryData] =
    await Promise.all([
      getProductData(slug),
      getOtherProduct(),
      getNavbarData(),
      getCategoryData(),
    ]);

  if (!productData.data) {
    return <div>Product not found.</div>;
  }

  return (
    <>
      <Navbar data={navbarData.data} categories={categoryData.data || []} />
      <ProductDetailSection
        product={productData.data}
        relatedProducts={otherProductsData.data || []}
      />
    </>
  );
}
