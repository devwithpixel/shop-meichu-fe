import { notFound } from "next/navigation";
import ProductDetailSection from "@/components/sections/detail-product/product-detail-section";
import { products } from "@/lib/data/product";
import { productDesc } from "@/lib/data/descProduct";
import Footer from "@/components/footer/footer";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const productId = parseInt(slug);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter((p) => p.id !== product.id);

  return (
    <>
      <ProductDetailSection
        product={product}
        relatedProducts={relatedProducts}
        productDesc={productDesc}
      />
      <Footer />
    </>
  );
}
