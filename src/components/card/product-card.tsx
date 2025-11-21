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

  return (
    <div
      ref={selectRef}
      className="product-card-item rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ease-out cursor-pointer transform-gpu will-change-transform sm:hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!isSelectOpen) {
          setIsHovered(false);
        }
      }}
    >
      <div className="relative w-full h-64 sm:h-80 md:h-96">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-700 ease-out"
        />

        <div className="hidden sm:block absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/80 to-transparent">
          <div
            className={`flex items-end justify-between transition-all duration-500 ease-in-out ${
              isHovered || isSelectOpen
                ? "opacity-0 translate-y-2 pointer-events-none"
                : "opacity-100 translate-y-0"
            }`}
          >
            <div>
              <h3 className="font-semibold text-rubik text-white text-sm">
                {name}
              </h3>
              <p className="text-sm text-slate-300">
                ${price.toLocaleString("en-US")} USD
              </p>
            </div>

            <div className="w-8 h-8 rounded-full bg-emerald-100 backdrop-blur flex items-center justify-center transition-transform duration-300">
              <Check className="w-5 h-5 text-gray-600" />
            </div>
          </div>

          <div
            className={`absolute inset-x-4 bottom-4 transition-all duration-500 ease-in-out ${
              isHovered || isSelectOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <Select
              onValueChange={handleVariantChange}
              onOpenChange={handleSelectOpenChange}
              value={selectedVariant}
            >
              <SelectTrigger className="w-full rounded-full bg-white text-gray-900 font-semibold h-12 border-0 hover:bg-gray-100 transition-colors duration-300">
                <SelectValue placeholder="Select Variant" />
              </SelectTrigger>
              <SelectContent>
                {variants.map((variant, index) => (
                  <SelectItem
                    key={index}
                    value={`${variant.size} / ($${variant.price})`}
                  >
                    {variant.size} / (${variant.price})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="relative md:hidden">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-rubik text-white text-sm">
                {name}
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                ${price.toLocaleString("en-US")} USD
              </p>
            </div>
          </div>
        </div>

        <div className="sm:hidden px-4 pb-4">
          <Select onValueChange={handleVariantChange} value={selectedVariant}>
            <SelectTrigger className="w-full rounded-full bg-white text-gray-900 font-semibold h-10 border-0 hover:bg-gray-100 transition-colors duration-300 text-sm">
              <SelectValue placeholder="Select Variant" />
            </SelectTrigger>
            <SelectContent className="text-sm">
              {variants.map((variant, index) => (
                <SelectItem
                  key={index}
                  value={`${variant.size} / ($${variant.price})`}
                >
                  {variant.size} / (${variant.price})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
