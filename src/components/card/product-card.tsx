"use client";

import { useCallback, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import Link from "next/link";
import Image from "@/components/global/image";

import type { Product } from "@/types/strapi/models/product";

const sizeClassTemplate = {
  sm: {
    width: "w-75",
    wrapper: "lg:max-w-35 xl:max-w-35",
    dekstop: "lg:w-35 xl:w-35 lg:h-45",
    mobile: "w-75 h-90",
    quickView: "w-71.5 md:w-55 lg:w-32",
    sizeP: "px-2",
    colorImg: "w-8 h-8",
  },
  md: {
    width: "w-75",
    wrapper: "md:max-w-48 lg:max-w-38 xl:max-w-48",
    dekstop: "md:w-48 md:h-65 lg:w-38 lg:h-50 xl:w-48 xl:h-70",
    mobile: "w-75 h-96",
    quickView: "w-71.5 md:w-43 lg:w-50 xl:w-45",
    sizeP: "px-4",
    colorImg: "w-10 h-10",
  },
  lg: {
    width: "w-42",
    wrapper: "md:max-w-48 lg:max-w-38 xl:max-w-48",
    dekstop: "md:w-48 md:h-65 lg:w-38 lg:h-50 xl:w-48 xl:h-70",
    mobile: "w-42 h-62",
    quickView: "w-38.5 md:w-43 lg:w-50 xl:w-45",
    sizeP: "px-4",
    colorImg: "w-10 h-10",
  },
};

interface TrendingProductProps {
  product: Product;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function ProductCard({
  product,
  className,
  size = "md",
}: TrendingProductProps) {
  const images = useMemo(
    () =>
      (product?.images ?? []).map((image) => ({
        ...image,
        url: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${image.url}`,
      })),
    [product?.images]
  );
  const sizeClass = useMemo(() => sizeClassTemplate[size], [size]);

  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    images?.[activeColorIndex]?.url
  );

  const changeQuickViewImage = useCallback(
    (index: number, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setActiveColorIndex(index);
      setSelectedImage(images?.[index]?.url);
    },
    [images]
  );


  return (
    <div
      className={cn(
        `${sizeClass.width} md:w-60 ${sizeClass.wrapper} space-y-3 shrink-0 `,
        className
      )}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative bg-gray-400 w-fit border border-gray-500 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden group cursor-pointer">
          {images.length > 0 && (
            <img
              src={selectedImage}
              className={`${sizeClass.mobile}  ${sizeClass.dekstop} object-cover rounded-xl md:rounded-3xl transition-all duration-700 ease-out hover:scale-105`}
            />
          )}

          <div
            className="h-fit bottom-0 absolute left-1/2 -translate-x-1/2 flex items-end justify-center text-black text-[10px] font-medium font-inter opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-full transition-all duration-400 ease-out lg:group-hover:opacity-100 lg:group-hover:translate-y-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div
              className={`${sizeClass.quickView} group/quickview transition-all duration-300 ease-out lg:group-hover/quickview:-translate-y-16`}
            >

              <div className="hidden lg:block bg-gray-100 rounded-b-xl px-3 pb-2 max-h-0 transition-all duration-800 ease-out group-hover/quickview:max-h-20 group-hover/quickview:mb-2">
                <div className="pt-2">
                  <Separator className="mb-3" />
                  <div className="flex gap-1.5 flex-nowrap overflow-x-auto scrollbar-hide">
                    {images.map((image, index) => (
                      <Button
                        key={image.id}
                        variant="outline"
                        className={cn(
                          "size-8! p-0 overflow-hidden",
                          activeColorIndex === index
                            ? "border-black scale-110"
                            : "border-gray-300"
                        )}
                        onClick={(e) => changeQuickViewImage(index, e)}
                      >
                        <Image
                          src={image.url}
                          className="object-cover size-full"
                        />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="font-albert-sans text-center px-1.5 space-y-1.5 transition-all duration-300 ease-out relative mt-2">
        <h1 className="text-xs font-semibold">{product.name}</h1>
        <p className="text-xs">{formatCurrency(product.price)}</p>
      </div>
    </div>
  );
}
