"use client";

import { FaCheck } from "react-icons/fa6";
import { LuBox } from "react-icons/lu";
import { LiaShippingFastSolid } from "react-icons/lia";
import { BsBoxSeam } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";

export default function ProductStockInfo() {
  return (
    <>
      <div className="flex items-center space-x-1.5">
        <FaCheck className="p-1 text-white bg-green-600 rounded-full" />
        <p className="text-xs">30 in stock</p>
      </div>

      <div className="my-5 bg-cyan-50 p-2 border border-gray-300 flex flex-col md:flex-row items-start justify-between lg:justify-evenly gap-4">
        <div className="flex items-center gap-4">
          <LuBox size={22} className="shrink-0" />
          <div>
            <p className="font-medium text-xs">
              Pickup available at Pakis Warehouse
            </p>
            <p className="text-xs">Usually ready in 24 hours</p>
          </div>
        </div>

        <p className="text-xs underline text-start md:text-end">
          Check availability at other stores
        </p>
      </div>

      <div className="flex flex-col md:flex-row h-auto md:h-5 items-start md:items-center gap-3 mb-5">
        <div className="flex items-center gap-2">
          <LiaShippingFastSolid size={20} />
          <p className="text-xs">Free delivery on February 7th - 13th</p>
        </div>

        <Separator
          orientation="vertical"
          className="hidden md:block h-6 w-px bg-gray-400"
        />

        <div className="flex items-center gap-2">
          <BsBoxSeam />
          <p className="text-xs">Free + easy returns</p>
        </div>
      </div>
    </>
  );
}
