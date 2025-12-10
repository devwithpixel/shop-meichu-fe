import { forwardRef } from "react";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/types/strapi/models/product";
import VariantSelector from "./variant-selector";
import SocialMediaLinks from "./social-media-links";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

interface ProductDetailsProps {
  product: Product;
  allImages: Array<{ fullUrl: string; name?: string; url?: string }>;
  activeVariantIndex: number;
  quantity: number;
  socialMedia: Array<{ id: number; media: string; url: string }>;
  onVariantChange: (index: number) => void;
  onQuantityChange: (quantity: number) => void;
}

const ProductDetails = forwardRef<HTMLDivElement, ProductDetailsProps>(
  (
    { product, allImages, activeVariantIndex, socialMedia, onVariantChange },
    ref
  ) => {
    return (
      <div className="md:col-span-2 lg:col-span-1 overflow-hidden">
        <div className="h-fit lg:h-[91vh] flex flex-col">
          <div
            ref={ref}
            className="flex-1 overflow-y-auto scrollbar-hide py-8 px-4 md:px-10"
            style={{
              overscrollBehavior: "none",
              touchAction: "pan-y",
            }}
          >
            <div>
              <h1 className="font-medium text-xl font-rubik cursor-pointer hover:text-gray-400">
                {product.name}
              </h1>

              <p className="text-xl font-bold leading-9 font-inter">
                {formatCurrency(product.price)}
              </p>
              <p className="text-xs font-medium text-gray-800">
                Taxes included. <span className="underline">Shipping</span>{" "}
                calculated at checkout.
              </p>
            </div>

            <Separator className="my-5" />

            <VariantSelector
              images={allImages}
              activeIndex={activeVariantIndex}
              onVariantChange={onVariantChange}
            />
          </div>

          <div className="border-t border-gray-200 bg-white px-4 md:px-10 py-4">
            <SocialMediaLinks socialMedia={socialMedia} />

            <div className="mt-4 pb-3 md:pb-2 text-center">
              <Link
                href={product.origin || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="w-full py-4 border border-black bg-black text-white hover:bg-gray-200 hover:text-black rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white">
                  Go to imvu
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProductDetails.displayName = "ProductDetails";

export default ProductDetails;
