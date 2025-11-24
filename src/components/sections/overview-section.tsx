"use client";

import { useState, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { FaCheck, FaFacebookF, FaMinus, FaPlus } from "react-icons/fa6";
import { LuBox } from "react-icons/lu";
import { LiaShippingFastSolid } from "react-icons/lia";
import { BsBoxSeam } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

export default function OverviewSection({
  product,
  relatedProducts,
}: {
  product: any;
  relatedProducts: any[];
}) {
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images.front
  );
  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const sectionRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const imageListRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !detailRef.current || !imageListRef.current)
      return;

    const section = sectionRef.current!;
    const detailContent = detailRef.current!;
    const imageList = imageListRef.current!;

    const detailScroll =
      detailContent.scrollHeight - detailContent.clientHeight;
    const imageScroll = imageList.scrollHeight - imageList.clientHeight;
    const totalScroll = Math.max(detailScroll, imageScroll);

    gsap.to([detailContent, imageList], {
      scrollTop: (i: number) => (i === 0 ? detailScroll : imageScroll),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalScroll * 1.5}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }, []);

  const handleColorClick = (img: string, index: number) => {
    setSelectedImage(img);
    setActiveColorIndex(index);
  };

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 5);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 5
    );
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const itemWidth = 140;
    container.scrollBy({
      left: direction === "left" ? -itemWidth : itemWidth,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={sectionRef}
      className="grid grid-cols-3 grid-rows-1 gap-1 bg-white"
    >
      {/* LEFT IMAGE BACKGROUND */}
      <div className="bg-gray-300">
        <div className="h-screen relative">
          {product.colors.map((color: any, index: number) => (
            <img
              key={index}
              src={color.bgImg}
              className={`h-full w-full object-cover absolute inset-0 ${
                activeColorIndex === index
                  ? "opacity-100"
                  : activeColorIndex === null && index === 0
                  ? "opacity-100"
                  : "opacity-0"
              } transition-opacity duration-500`}
              alt=""
            />
          ))}
        </div>
      </div>

      {/* MID SCROLL IMAGES */}
      <div className="relative">
        <div
          ref={imageListRef}
          className="h-screen flex flex-col gap-1 overflow-y-scroll"
        >
          {product.colors.map((color: any, index: number) => (
            <img
              key={index}
              src={color.bgImg}
              className="h-166 w-full object-cover bg-gray-300"
              alt=""
            />
          ))}
        </div>
      </div>

      {/* RIGHT DETAIL */}
      <div className="overflow-hidden">
        <div className="h-screen flex flex-col">
          <div
            ref={detailRef}
            className="flex-1 overflow-y-scroll scrollbar-hide py-8 px-10"
          >
            {/* TITLE + PRICE */}
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

            {/* COLORS */}
            <div className="my-5">
              <p className="font-rubik font-bold text-xs mb-2">
                COLOR: {product.colors[activeColorIndex].label.toUpperCase()}
              </p>

              <div className="flex items-center gap-1.5 py-1 max-w-full">
                {product.colors.map((color: any, index: number) => (
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
                          className="w-13 h-14 object-cover rounded-sm"
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

            {/* SIZE SELECTOR */}
            <div className="my-5">
              <p className="font-rubik font-bold text-xs mb-2">
                SIZE: {selectedSize}
              </p>

              <div className="flex gap-1.5 flex-wrap">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 text-[10px] border rounded transition-colors ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:bg-black hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="my-5">
              <p className="font-rubik font-bold text-xs mb-2">Quantity</p>

              <div className="w-fit flex items-center justify-start gap-8 border border-black px-4 py-2.5 rounded-sm">
                <FaMinus
                  size={14}
                  className={`cursor-pointer ${
                    quantity === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-black hover:text-gray-600"
                  }`}
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                />

                <p className="font-medium">{quantity}</p>

                <FaPlus
                  size={14}
                  className="cursor-pointer hover:text-gray-600"
                  onClick={() => setQuantity(quantity + 1)}
                />
              </div>
            </div>

            {/* STOCK + PICKUP */}
            <div className="flex items-center space-x-1.5">
              <FaCheck className="p-1 text-white bg-green-600 rounded-full" />
              <p className="text-xs">30 in stock</p>
            </div>

            <div className="my-5 bg-cyan-50 p-2 border border-gray-300 flex items-start justify-evenly gap-4">
              <div className="flex items-center gap-4">
                <LuBox size={22} />
                <div>
                  <p className="font-medium text-xs">
                    Pickup available at Pakis Warehouse
                  </p>
                  <p className="text-xs">Usually ready in 24 hours</p>
                </div>
              </div>

              <p className="text-xs underline text-end">
                Check availability at other stores
              </p>
            </div>

            {/* SHIPPING + RETURNS */}
            <div className="flex h-5 items-center gap-3 mb-5">
              <div className="flex items-center gap-2">
                <LiaShippingFastSolid size={20} />
                <p className="text-xs">Free delivery on February 7th - 13th</p>
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

            {/* SOCIAL */}
            <div className="my-5 flex items-center">
              <p className="font-rubik font-bold text-xs">Social</p>
              <div className="flex items-center gap-3">
                <FaFacebookF />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="my-4">
              <div className="flex items-center justify-center gap-4">
                <button className="px-14 py-4 border border-black bg-black text-white hover:bg-gray-200 hover:text-black rounded-full transition-colors">
                  Add to cart
                </button>

                <button className="px-14 py-4 border border-black bg-black text-white hover:bg-gray-200 hover:text-black rounded-full transition-colors">
                  Buy it now
                </button>
              </div>
            </div>

            {/* RELATED PRODUCTS */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="font-rubik font-bold">PAIRS WELL WITH</p>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => scroll("left")}
                    className={`p-2 rounded-full transition-colors cursor-pointer ${
                      !canScrollLeft
                        ? "bg-gray-400 text-white"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    <IoIosArrowBack size={18} />
                  </button>

                  <button
                    onClick={() => scroll("right")}
                    className={`p-2 rounded-full transition-colors cursor-pointer ${
                      !canScrollRight
                        ? "bg-gray-400 text-white"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    <IoIosArrowForward size={18} />
                  </button>
                </div>
              </div>

              <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex items-center gap-2 overflow-x-scroll scrollbar-hide"
              >
                {relatedProducts.map((item) => (
                  <div
                    key={item.id}
                    className="w-33 shrink-0 space-y-2 text-center"
                  >
                    <img
                      src={item.images.hover}
                      className="w-33 h-35 object-cover rounded-3xl bg-gray-300"
                      alt={item.title}
                    />
                    <h1 className="text-xs font-semibold font-rubik">
                      {item.title}
                    </h1>
                    <p className="text-xs font-rubik">
                      ${item.price.toLocaleString()} USD
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
