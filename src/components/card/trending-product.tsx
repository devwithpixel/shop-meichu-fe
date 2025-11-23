"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { LuBox } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsBoxSeam } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface TrendingProductProps {
  className: string;
  product: {
    id: number;
    title: string;
    price: number;
    images: { front: string; hover: string };
    sizes: string[];
    colors: { label: string; bgImg: string; bgColor: string }[];
  };
}

export default function TrendingProduct({
  product,
  className,
}: TrendingProductProps) {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [activeColorIndex, setActiveColorIndex] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const allImages = [
    product.images.front,
    product.images.hover,
    ...product.colors.map((color) => color.bgImg),
  ];

  const handleColorClick = (img: string, index: number) => {
    setSelectedImage(img);
    setActiveColorIndex(index);
    setCurrentImageIndex(index + 2);
  };

  const handleQuickViewClick = () => {
    setIsDrawerOpen(true);
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  const prevImage = () => {
    const newIndex =
      activeColorIndex === null || activeColorIndex === 0
        ? product.colors.length - 1
        : activeColorIndex - 1;

    setActiveColorIndex(newIndex);
    setSelectedImage(product.colors[newIndex].bgImg);
  };

  const nextImage = () => {
    const newIndex =
      activeColorIndex === null
        ? 0
        : (activeColorIndex + 1) % product.colors.length;

    setActiveColorIndex(newIndex);
    setSelectedImage(product.colors[newIndex].bgImg);
  };

  return (
    <>
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
              <div
                className="flex items-center justify-between gap-2 py-2 px-2 rounded-t-md rounded-b-md lg:rounded-b-none lg:rounded-t-xl bg-gray-100 cursor-pointer mb-1.5 lg:mb-0"
                onClick={handleQuickViewClick}
              >
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
                      onClick={() => handleColorClick(color.bgImg, index)}
                    >
                      <img
                        src={color.bgImg}
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

      <Drawer open={isDrawerOpen} direction="right" onOpenChange={handleClose}>
        <DrawerContent className="h-170 min-w-[76vw] ml-auto rounded-3xl bg-transparent p-0 mr-6 flex items-center">
          <div className="h-170 w-full rounded-3xl bg-white p-0 flex">
            <div className="w-1/2 h-170 bg-gray-300 rounded-l-3xl relative overflow-hidden">
              <div className="h-full relative">
                {product.colors.map((color, index) => (
                  <img
                    key={index}
                    src={color.bgImg}
                    className={`h-170 w-[38vw] object-cover rounded-l-3xl absolute inset-0 transition-all duration-500 ease-in-out ${
                      activeColorIndex === index
                        ? "opacity-100 translate-x-0"
                        : activeColorIndex === null && index === 0
                        ? "opacity-100 translate-x-0"
                        : index < (activeColorIndex || 0)
                        ? "opacity-0 -translate-x-full"
                        : "opacity-0 translate-x-full"
                    }`}
                    alt=""
                  />
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 rounded-bl-3xl">
                <div className="flex items-center justify-evenly gap-3">
                  <button
                    onClick={prevImage}
                    className="bg-black text-white p-4 rounded-full transition-all duration-300 shadow-lg shrink-0"
                  >
                    <IoIosArrowBack size={20} />
                  </button>

                  <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                    {product.colors.map((color, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <div
                            className={`cursor-pointer rounded-lg shrink-0 transition-all duration-300 ${
                              activeColorIndex === index
                                ? "border-2 border-black scale-105"
                                : "border-2 border-gray-300 hover:border-gray-400"
                            }`}
                            onClick={() => handleColorClick(color.bgImg, index)}
                          >
                            <img
                              src={color.bgImg}
                              className="w-20 h-20 object-cover bg-gray-300 rounded-lg"
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

                  <button
                    onClick={nextImage}
                    className="bg-black text-white p-4 rounded-full transition-all duration-300 shadow-lg shrink-0"
                  >
                    <IoIosArrowForward size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-1/2 h-170 bg-white rounded-r-3xl border border-white flex flex-col">
              <div className="flex-1 overflow-y-auto scrollbar-hide py-6 px-8">
                <div>
                  <h1 className="font-semibold text-lg font-rubik cursor-pointer hover:text-gray-400">
                    {product.title}
                  </h1>
                  <p className="text-md text-gray-800 ">SDZ1056</p>
                  <p className="text-xl leading-9 font-inter">
                    ${product.price.toLocaleString()} USD
                  </p>
                </div>

                <Separator className="my-5" />

                <div className="flex items-center space-x-1.5">
                  <FaCheck className="p-1 text-white bg-green-600 rounded-full" />
                  <p className="text-xs">30 in stock</p>
                </div>

                <div className="my-5">
                  <p className="font-rubik font-bold text-xs mb-2">
                    COLOR:{" "}
                    {activeColorIndex !== null
                      ? product.colors[activeColorIndex].label.toUpperCase()
                      : product.colors[0].label.toUpperCase()}
                  </p>
                  <div className="flex items-center gap-1.5 py-1 max-w-full">
                    {product.colors.map((color, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <div
                            className={`w-7 h-7 ${
                              color.bgColor
                            } cursor-pointer rounded-sm shrink-0 transition-colors ${
                              activeColorIndex === index
                                ? "border border-black scale-110"
                                : "border border-gray-300"
                            }`}
                            onClick={() => handleColorClick(color.bgImg, index)}
                          ></div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-white">{color.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>

                <div className="my-5">
                  <p className="font-rubik font-bold text-xs mb-2">
                    SIZE: {selectedSize || product.sizes[0]}
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-1 text-[10px] border rounded transition-colors ${
                          selectedSize === size ||
                          (!selectedSize && size === product.sizes[0])
                            ? "bg-black text-white border-black"
                            : "border-gray-300 hover:bg-black hover:text-white"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="my-5">
                  <p className="font-rubik font-bold text-xs mb-2">Quantity</p>
                  <div className="w-fit flex items-center justify-start gap-8 border border-black px-4 py-2.5 rounded-sm">
                    <FaMinus
                      size={14}
                      className={`cursor-pointer transition-colors ${
                        quantity === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-black hover:text-gray-600"
                      }`}
                      onClick={() => {
                        if (quantity > 1) {
                          setQuantity(quantity - 1);
                        }
                      }}
                    />
                    <p className="font-medium">{quantity}</p>
                    <FaPlus
                      size={14}
                      className="cursor-pointer hover:text-gray-600 transition-colors"
                      onClick={() => setQuantity(quantity + 1)}
                    />
                  </div>
                </div>

                <div className="my-5 bg-cyan-50 p-2 border border-gray-300 flex items-start justify-evenly gap-16">
                  <div className="flex items-center gap-4">
                    <LuBox size={22} />
                    <div>
                      <p className="font-medium text-xs">
                        Pickup available at Pakis Warehouse
                      </p>
                      <p className="text-xs">Usually ready in 24 hours</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs underline">
                      Check availability at other stores
                    </p>
                  </div>
                </div>

                <div className="flex h-5 items-center gap-3">
                  <div className="flex items-center gap-2">
                    <LiaShippingFastSolid size={20} />
                    <p className="text-xs">
                      Free delivery on February 7th - 13th
                    </p>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="h-6 w-px bg-gray-400"
                  />
                  <div className="flex items-center gap-2">
                    <BsBoxSeam />
                    <p className="text-xs">Free + easy returns</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 p-6 bg-white rounded-br-3xl">
                <div className="flex items-center justify-center gap-4">
                  <button className="px-20 py-4 border border-black bg-black text-white hover:bg-gray-200 hover:text-black transition-all duration-300 ease-in-out rounded-full">
                    Add to cart
                  </button>
                  <button className="px-20 py-4 border border-black bg-black text-white hover:bg-gray-200 hover:text-black transition-all duration-300 ease-in-out rounded-full">
                    Buy it now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
