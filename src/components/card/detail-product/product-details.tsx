"use client";

import { RefObject, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Product, RelatedProduct } from "@/types/detail-product/product";
import ProductColorSelector from "./product-color-selector";
import ProductSizeSelector from "./product-size-selector";
import ProductQuantitySelector from "./product-quantity-selector";
import ProductStockInfo from "./product-stock-info";
import ProductSocialShare from "./product-social-share";
import ProductActions from "./product-actions";
import RelatedProducts from "./related-product";

interface ProductDetailsProps {
  product: Product;
  relatedProducts: RelatedProduct[];
  detailRef: RefObject<HTMLDivElement | null>;
  activeColorIndex: number;
  onColorClick: (img: string, index: number) => void;
}

export default function ProductDetails({
  product,
  relatedProducts,
  detailRef,
  activeColorIndex,
  onColorClick,
}: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="md:col-span-2 lg:col-span-1 overflow-hidden">
      <div className="h-full md:h-screen lg:h-screen flex flex-col">
        <div
          ref={detailRef}
          className="flex-1 overflow-y-auto scrollbar-hide py-8 px-4 md:px-10"
          style={{
            overscrollBehavior: "none",
            touchAction: "pan-y",
          }}
        >
          <div>
            <h1 className="font-bold text-lg font-rubik cursor-pointer hover:text-gray-400">
              {product.title}
            </h1>

            <p className="text-xl font-bold leading-9 font-inter">
              ${product.price.toLocaleString()} USD
            </p>
            <p className="text-xs font-medium text-gray-800">
              Taxes included. <span className="underline">Shipping</span>{" "}
              calculated at checkout.
            </p>
          </div>

          <Separator className="my-5" />

          <ProductColorSelector
            colors={product.colors}
            activeColorIndex={activeColorIndex}
            onColorClick={onColorClick}
          />

          <ProductSizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
          />

          <ProductQuantitySelector
            quantity={quantity}
            onQuantityChange={setQuantity}
          />

          <ProductStockInfo />

          <ProductSocialShare />

          <ProductActions />

          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  );
}
