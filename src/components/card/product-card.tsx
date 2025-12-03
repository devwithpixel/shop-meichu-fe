"use client";

import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useRef, useEffect } from "react";

interface Variant {
  size: string;
  price: number;
}

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  variants?: Variant[];
  onSelectVariant?: (variant: string, variantPrice: number) => void;
}

export function ProductCard({
  name,
  price,
  image,
  variants = [],
  onSelectVariant,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
        if (!selectRef.current.parentElement?.matches(":hover")) {
          setIsHovered(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectOpenChange = (open: boolean) => {
    setIsSelectOpen(open);
    if (open) {
      setIsHovered(true);
    }
  };

  const handleVariantChange = (value: string) => {
    setSelectedVariant(value);
    const selectedVariantData = variants.find(
      (v) => `${v.size} / ($${v.price})` === value
    );
    if (selectedVariantData && onSelectVariant) {
      onSelectVariant(selectedVariantData.size, selectedVariantData.price);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      ref={selectRef}
      className="product-card-item rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ease-out cursor-pointer transform-gpu will-change-transform lg:hover:scale-105 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!isSelectOpen) {
          setIsHovered(false);
        }
      }}
    >
      <div className="relative w-full h-64 sm:h-80 md:h-96 shrink-0">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-700 ease-out rounded-2xl"
        />

        {/* Desktop */}
        <div className="hidden lg:block absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/90 via-black/50 to-transparent">
          <div
            className={`flex items-end justify-between transition-all duration-500 ease-in-out ${
              isHovered || isSelectOpen
                ? "opacity-0 translate-y-2 pointer-events-none"
                : "opacity-100 translate-y-0"
            }`}
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold font-rubik text-white text-sm line-clamp-2">
                {name}
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                {formatPrice(price)}
              </p>
            </div>

            <div className="w-8 h-8 rounded-full opacity-80 bg-emerald-100 backdrop-blur flex items-center justify-center transition-transform duration-300 ml-2 shrink-0">
              <Check className="w-4 h-4 text-gray-700" />
            </div>
          </div>

          <div
            className={`absolute inset-x-4 bottom-4 transition-all duration-500 ease-in-out ${
              isHovered || isSelectOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <Select
              onValueChange={handleVariantChange}
              onOpenChange={handleSelectOpenChange}
              value={selectedVariant}
            >
              <SelectTrigger className="w-full rounded-full bg-white text-gray-900 font-semibold h-12 border-0 hover:bg-gray-100 transition-colors duration-300 text-sm font-inter placeholder:text-sm">
                <SelectValue placeholder="Select Size" />
              </SelectTrigger>
              <SelectContent className="bg-white font-inter">
                {variants.map((variant, index) => (
                  <SelectItem
                    key={index}
                    value={`${variant.size} / ${formatPrice(variant.price)}`}
                    className="bg-white hover:bg-blue-500! rounded-sm hover:text-white!"
                  >
                    {variant.size} / {formatPrice(variant.price)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tablet  */}
        <div className="hidden md:block lg:hidden absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/90 via-black/50 to-transparent">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold font-rubik text-white text-sm line-clamp-2">
                {name}
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                {formatPrice(price)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Select
              onValueChange={handleVariantChange}
              onOpenChange={handleSelectOpenChange}
              value={selectedVariant}
            >
              <SelectTrigger className="w-full rounded-full bg-white text-gray-900 font-semibold h-12 border-0 hover:bg-gray-100 transition-colors duration-300 text-sm font-inter placeholder:text-sm">
                <SelectValue placeholder="Select Size" />
              </SelectTrigger>
              <SelectContent className="bg-white font-inter">
                {variants.map((variant, index) => (
                  <SelectItem
                    key={index}
                    value={`${variant.size} / ${formatPrice(variant.price)}`}
                    className="bg-white hover:bg-blue-500! rounded-sm hover:text-white!"
                  >
                    {variant.size} / {formatPrice(variant.price)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="w-12 h-12 rounded-full opacity-80 bg-emerald-100 backdrop-blur flex items-center justify-center transition-transform duration-300 shrink-0">
              <Check className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="block md:hidden flex-1 flex-col bg-transparent">
        <div className="p-4 flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold font-rubik text-white text-sm line-clamp-2 leading-tight">
                {name}
              </h3>
              <p className="text-xs text-gray-300 mt-1">{formatPrice(price)}</p>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4 mt-auto">
          <Select
            onValueChange={handleVariantChange}
            value={selectedVariant}
            onOpenChange={handleSelectOpenChange}
          >
            <SelectTrigger className="w-full rounded-full bg-white text-gray-900 font-semibold h-12 border-0 hover:bg-gray-100 transition-colors duration-300 text-xs font-inter placeholder:text-xs">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent className="text-xs bg-white">
              {variants.map((variant, index) => (
                <SelectItem
                  key={index}
                  value={`${variant.size} / ${formatPrice(variant.price)}`}
                  className="bg-white hover:bg-blue-500! rounded-sm hover:text-white!"
                >
                  {variant.size} / {formatPrice(variant.price)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
