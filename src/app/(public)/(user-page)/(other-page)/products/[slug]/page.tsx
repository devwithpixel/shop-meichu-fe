import ProductDetailSection from "./_components/product-detail-section";
import { getProductData, getRecommendedProducts } from "@/lib/api/products";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [productData, otherProductsData] = await Promise.all([
    getProductData(slug),
    getRecommendedProducts(),
  ]);

  return (
    <ProductDetailSection
      product={productData.data}
      relatedProducts={otherProductsData.data || []}
    />
  );
}
