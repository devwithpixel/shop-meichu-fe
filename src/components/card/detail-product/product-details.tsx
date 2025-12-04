import { forwardRef } from "react";
import { Separator } from "@/components/ui/separator";
import { FaCheck } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Product } from "@/types/strapi/models/product";
import VariantSelector from "./variant-selector";
import QuantitySelector from "./quantity-selector";
import SocialMediaLinks from "./social-media-links";

interface ProductDetailsProps {
  product: Product;
  allImages: Array<{ fullUrl: string; name?: string }>;
  activeVariantIndex: number;
  quantity: number;
  socialMedia: Array<{ id: number; media: string; url: string }>;
  onVariantChange: (index: number) => void;
  onQuantityChange: (quantity: number) => void;
}

const ProductDetails = forwardRef<HTMLDivElement, ProductDetailsProps>(
  (
    {
      product,
      allImages,
      activeVariantIndex,
      quantity,
      socialMedia,
      onVariantChange,
      onQuantityChange,
    },
    ref
  ) => {
    return (
      <div className="md:col-span-2 lg:col-span-1 overflow-hidden">
        <div className="h-full md:h-screen lg:h-screen flex flex-col">
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
                ${product.price.toLocaleString()} USD
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

            <QuantitySelector
              quantity={quantity}
              onQuantityChange={onQuantityChange}
            />

            <div className="flex items-center space-x-1.5">
              <FaCheck className="p-1 text-white bg-green-600 rounded-full" />
              <p className="text-xs">{product.stock} in stock</p>
            </div>

            <div className="flex items-center gap-3 p-4 border border-gray-300 bg-gray-100 rounded-md my-4">
              <Checkbox className="border-gray-300" />
              <div className="space-y-2 max-w-1/2">
                <Label className="font-semibold leading-tight">
                  Accept terms and conditions
                </Label>
                <p className="text-sm">Lorem ipsum dolor sit amet</p>
              </div>
            </div>

            <div className="mt-4 mb-16">
              <p className="text-orange-500 text-sm font-semibold">
                Please double check before buying!
              </p>
            </div>

            <SocialMediaLinks socialMedia={socialMedia} />

            <div className="my-4">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
                <button className="w-full py-4 border border-black bg-black text-white hover:bg-gray-200 hover:text-black rounded-full transition-colors">
                  Add to cart
                </button>

                <button className="w-full py-4 border border-black bg-black text-white hover:bg-gray-200 hover:text-black rounded-full transition-colors">
                  Buy it now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProductDetails.displayName = "ProductDetails";

export default ProductDetails;
