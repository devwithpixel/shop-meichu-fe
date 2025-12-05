import ProductDetailSection from "@/components/sections/detail-product/product-detail-section";

import type { StrapiResponse } from "@/types/strapi/response";
import type { Product } from "@/types/strapi/models/product";

async function getProductData(slug: string): Promise<StrapiResponse<Product>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${slug}`
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

  const [productData, otherProductsData] = await Promise.all([
    getProductData(slug),
    getOtherProduct(),
  ]);

  if (!productData.data) {
    return <div>Product not found.</div>;
  }

  return (
    <ProductDetailSection
      product={productData.data}
      relatedProducts={otherProductsData.data || []}
      // productDesc={[]}
    />
  );
}
