import { forwardRef, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { FaCheck } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Product } from "@/types/strapi/models/product";
import VariantSelector from "./variant-selector";
import QuantitySelector from "./quantity-selector";
import SocialMediaLinks from "./social-media-links";
import { useCart } from "@/context/cart-provider";

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
    const { addItem, setIsOpen } = useCart();
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);

    useEffect(() => {
      if (product.stock === 0 && quantity !== 0) {
        onQuantityChange(0);
      } else if (product.stock > 0 && quantity === 0) {
        onQuantityChange(1);
      }
    }, [product.stock]);

    const handleAddToCart = () => {
      const cartItem = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price:
          typeof product.price === "string"
            ? parseFloat(product.price)
            : product.price,
        stock: product.stock,
        quantity: quantity,
        images: product.images,
      };

      addItem(cartItem);
      setIsOpen(true);
    };

    const isButtonDisabled = product.stock === 0 || !isTermsAccepted;
    const isOutOfStock = product.stock === 0;

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

            {/* <VariantSelector
              images={allImages}
              activeIndex={activeVariantIndex}
              onVariantChange={onVariantChange}
            /> */}

            <QuantitySelector
              quantity={quantity}
              stock={product.stock}
              onQuantityChange={onQuantityChange}
            />

            <div className="flex items-center space-x-1.5">
              <FaCheck
                className={`p-1 text-white rounded-full ${
                  isOutOfStock ? "bg-gray-400" : "bg-green-600"
                }`}
              />
              <p className="text-xs">
                {isOutOfStock ? "Out of stock" : `${product.stock} in stock`}
              </p>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 bg-gray-100 rounded-md my-4">
              <Checkbox
                checked={isTermsAccepted}
                onCheckedChange={(checked) =>
                  setIsTermsAccepted(checked === true)
                }
                className="border-gray-300"
              />
              <div className="space-y-2 max-w-1/2">
                <Label className="font-semibold leading-tight">
                  Accept terms and conditions
                </Label>
                <p className="text-sm">Lorem ipsum dolor sit amet</p>
              </div>
            </div>

            <div className="mt-4 mb-4">
              <p className="text-orange-500 text-sm font-semibold">
                Please double check before buying!
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 bg-white px-4 md:px-10 py-4">
            <SocialMediaLinks socialMedia={socialMedia} />

            <div className="mt-4">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isButtonDisabled}
                  className="w-full py-4 border border-black bg-black text-white hover:bg-gray-200 hover:text-black rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to cart"}
                </button>

                <button
                  disabled={isButtonDisabled}
                  className="w-full py-4 border border-black bg-black text-white hover:bg-gray-200 hover:text-black rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
                >
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
