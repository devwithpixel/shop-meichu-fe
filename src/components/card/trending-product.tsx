"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TrendingProductProps {
  className: string;
  product: {
    id: number;
    title: string;
    price: number;
    images: { front: string; hover: string };
    sizes: string[];
    colors: { label: string; img: string }[];
  };
}

export default function TrendingProduct({
  product,
  className,
}: TrendingProductProps) {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [activeColorIndex, setActiveColorIndex] = useState<number | null>(null);

  const handleColorClick = (img: string, index: number) => {
    setSelectedImage(img);
    setActiveColorIndex(index);
  };

  return (
    <div className={`w-75 lg:max-w-37 space-y-3 shrink-0 ${className || ""}`}>
      <div className="bg-gray-400 w-fit border border-gray-500 rounded-xl lg:rounded-3xl relative overflow-hidden group">
        <img
          src={selectedImage || product.images.front}
          className="w-75 h-96 lg:w-37 lg:h-45 object-cover rounded-xl lg:rounded-3xl transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-105"
          alt=""
        />
        <img
          src={product.images.hover}
          className="w-75 h-96 lg:w-37 lg:h-45 object-cover rounded-xl lg:rounded-3xl absolute inset-0 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
          alt=""
        />

        <div className="absolute inset-0 flex items-end justify-center text-black text-[10px] font-medium font-inter opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-full transition-all duration-400 ease-out lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
          <div className="w-71.5 lg:w-32 group/quickview transition-all duration-300 ease-out lg:group-hover/quickview:-translate-y-16">
            <div className="flex items-center justify-between gap-2 py-2 px-2 rounded-t-md rounded-b-md lg:rounded-b-none lg:rounded-t-xl bg-gray-100 cursor-pointer mb-1.5 lg:mb-0">
              <h1 className="lg:-mb-2">QUICK VIEW</h1>
              <FaPlus className="lg:-mb-2" />
            </div>

            <div className="hidden lg:block bg-gray-100 rounded-b-xl px-3 pb-2 max-h-0 transition-all duration-800 ease-out group-hover/quickview:max-h-20 group-hover/quickview:mb-2">
              <div className="pt-2">
                <Separator className="mb-3" />
                <div className="flex gap-1.5 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className="px-2 py-1 text-[10px] border border-gray-300 rounded hover:bg-black hover:text-white transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center px-1.5 space-y-1.5 font-inter group/info relative">
        <div className="transition-all text-center space-y-1.5 duration-300 ease-out lg:group-hover/info:opacity-0">
          <h1 className="text-xs font-semibold">{product.title}</h1>
          <p className="text-xs">${product.price.toLocaleString()} USD</p>
        </div>

        <div className="flex justify-center lg:absolute lg:inset-x-0 lg:top-0 lg:opacity-0 transition-all duration-300 ease-out lg:group-hover/info:opacity-100">
          <div className="flex items-center gap-1.5 overflow-x-auto px-2 py-1 max-w-full scrollbar-hide">
            {product.colors.map((color, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className={`bg-gray-400 cursor-pointer rounded-sm shrink-0 transition-colors ${
                      activeColorIndex === index
                        ? "border border-black scale-110"
                        : "border border-gray-300"
                    }`}
                    onClick={() => handleColorClick(color.img, index)}
                  >
                    <img
                      src={color.img}
                      className="w-8 h-8 object-cover rounded-sm"
                      alt=""
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-white">{color.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
