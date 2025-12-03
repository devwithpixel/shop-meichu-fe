"use client";

import { RefObject } from "react";
import { ProductColor } from "@/types/detail-product/product";

interface ProductImageGalleryProps {
  colors: ProductColor[];
  activeColorIndex: number;
  imageListRef: RefObject<HTMLDivElement | null>;
  onImageClick: (img: string, index: number) => void;
}

export default function ProductImageGallery({
  colors,
  activeColorIndex,
  imageListRef,
  onImageClick,
}: ProductImageGalleryProps) {
  return (
    <>
      {/* Main Large Image */}
      <div className="bg-gray-300 md:row-span-2 lg:row-span-1">
        <div className="h-126 md:h-screen lg:h-screen relative">
          {colors.map((color, index) => (
            <img
              key={index}
              src={color.bgImg}
              className={`h-126 md:h-full w-full object-cover absolute inset-0 cursor-pointer ${
                activeColorIndex === index ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
              alt=""
              onClick={() => onImageClick(color.bgImg, index)}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail List */}
      <div className="md:relative lg:row-span-1">
        <div
          ref={imageListRef}
          className="h-fit md:h-screen lg:h-screen flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-y-scroll lg:overflow-y-scroll scrollbar-hide"
          style={{
            overscrollBehavior: "none",
            touchAction: "pan-y",
          }}
        >
          {colors.map((color, index) => (
            <img
              key={index}
              src={color.bgImg}
              className="h-40 w-32 md:h-84 md:w-full lg:h-160 lg:w-full object-cover bg-gray-300 shrink-0 cursor-pointer transition-opacity"
              alt=""
              onClick={() => onImageClick(color.bgImg, index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
