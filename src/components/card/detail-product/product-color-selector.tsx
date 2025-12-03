"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProductColor } from "@/types/detail-product/product";

interface ProductColorSelectorProps {
  colors: ProductColor[];
  activeColorIndex: number;
  onColorClick: (img: string, index: number) => void;
}

export default function ProductColorSelector({
  colors,
  activeColorIndex,
  onColorClick,
}: ProductColorSelectorProps) {
  return (
    <div className="my-5">
      <p className="font-rubik font-bold text-xs mb-2">
        COLOR: {colors[activeColorIndex].label.toUpperCase()}
      </p>

      <div className="flex items-center gap-1.5 py-1 max-w-full">
        {colors.map((color, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <div
                className={`bg-gray-400 cursor-pointer rounded-sm shrink-0 transition-all ${
                  activeColorIndex === index
                    ? "border-2 border-black scale-110"
                    : "border border-gray-300 hover:border-gray-500"
                }`}
                onClick={() => onColorClick(color.bgImg, index)}
              >
                <img
                  src={color.bgImg}
                  className="w-10 h-11 md:w-13 md:h-14 object-cover rounded-sm"
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
  );
}
