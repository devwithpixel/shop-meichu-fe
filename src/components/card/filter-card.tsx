"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Settings2, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function FilterCard() {
  const isMobile = useIsMobile();
  const MAX_PRICE = 6700;

  const [sortBy, setSortBy] = useState<string | null>(null);
  const [availability, setAvailability] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [productTypes, setProductTypes] = useState<string[]>([]);

  const sortOptions = [
    "Featured",
    "Best Selling",
    "Alphabetically, A-Z",
    "Alphabetically, Z-A",
    "Price, low to high",
    "Price, high to low",
    "Date, old to now",
    "Date, now to old",
  ];

  const availabilityOptions = ["In stock", "Out of stock"];

  const categoryOptions = ["Shirts", "T-Shirts", "Pants", "Jackets", "Shorts"];

  const colors = [
    { name: "Red", color: "bg-red-500" },
    { name: "Blue", color: "bg-blue-500" },
    { name: "Green", color: "bg-green-500" },
    { name: "Yellow", color: "bg-yellow-500" },
    { name: "Black", color: "bg-black" },
  ];

  const productTypeOptions = [
    "Co-ord sets",
    "Gym Wear",
    "Jacket",
    "Sweatshirt",
    "T-Shirts",
  ];

  const toggleCategory = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleProductType = (type: string) => {
    setProductTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const isPriceChanged = priceRange[0] !== 0 || priceRange[1] !== MAX_PRICE;

  const hasActiveFilters =
    sortBy ||
    availability ||
    isPriceChanged ||
    categories.length > 0 ||
    selectedColor ||
    productTypes.length > 0;

  const removeFilter = (type: string, value?: string) => {
    switch (type) {
      case "sortBy":
        setSortBy(null);
        break;
      case "availability":
        setAvailability(null);
        break;
      case "price":
        setPriceRange([0, MAX_PRICE]);
        break;
      case "category":
        if (value) setCategories((prev) => prev.filter((c) => c !== value));
        break;
      case "color":
        setSelectedColor(null);
        break;
      case "productType":
        if (value) setProductTypes((prev) => prev.filter((t) => t !== value));
        break;
    }
  };

  const clearAllFilters = () => {
    setSortBy(null);
    setAvailability(null);
    setPriceRange([0, MAX_PRICE]);
    setCategories([]);
    setSelectedColor(null);
    setProductTypes([]);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="px-5 py-1.5 bg-black text-white flex items-center justify-center gap-2 rounded-full">
          <Settings2 className="w-5 h-5" /> Filter
        </button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "left"}
        className="bg-gray-200 items-start w-full md:w-100 max-w-none! h-[75%] md:h-[95%] md:m-5 rounded-3xl pb-4 flex flex-col"
      >
        <SheetHeader className="w-full px-3 pt-3 pb-0">
          <div className="w-full bg-white rounded-3xl shadow-md overflow-hidden">
            <div className="px-4 flex items-center justify-between gap-2 py-4">
              <div className="flex items-center justify-center">
                <Settings2 className="w-5 h-5" />
                <SheetTitle className="font-rubik font-normal">
                  Filter
                </SheetTitle>
              </div>
              <button
                onClick={clearAllFilters}
                className="text-xs text-gray-600 hover:text-black"
              >
                Clear all
              </button>
            </div>

            {hasActiveFilters && (
              <div className="px-4 pb-3 pt-1">
                <div className="flex flex-wrap gap-2">
                  {sortBy && (
                    <div className="flex items-center gap-1 bg-black text-white text-xs px-3 py-1 rounded-full">
                      <span>{sortBy}</span>
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeFilter("sortBy")}
                      />
                    </div>
                  )}
                  {availability && (
                    <div className="flex items-center gap-1 bg-black text-white text-xs px-3 py-1 rounded-full">
                      <span>{availability}</span>
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeFilter("availability")}
                      />
                    </div>
                  )}
                  {isPriceChanged && (
                    <div className="flex items-center gap-1 bg-black text-white text-xs px-3 py-1 rounded-full">
                      <span>
                        ${priceRange[0]} - ${priceRange[1]}
                      </span>
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeFilter("price")}
                      />
                    </div>
                  )}
                  {categories.map((cat) => (
                    <div
                      key={cat}
                      className="flex items-center gap-1 bg-black text-white text-xs px-3 py-1 rounded-full"
                    >
                      <span>{cat}</span>
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeFilter("category", cat)}
                      />
                    </div>
                  ))}
                  {selectedColor && (
                    <div className="flex items-center gap-1 bg-black text-white text-xs px-3 py-1 rounded-full">
                      <span>{selectedColor}</span>
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeFilter("color")}
                      />
                    </div>
                  )}
                  {productTypes.map((type) => (
                    <div
                      key={type}
                      className="flex items-center gap-1 bg-black text-white text-xs px-3 py-1 rounded-full"
                    >
                      <span>{type}</span>
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeFilter("productType", type)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SheetHeader>

        <div className="flex-1 w-full px-3 pb-3 pt-0 overflow-y-auto">
          <div className="bg-white font-rubik rounded-3xl p-5 space-y-4 shadow-md">
            <h1 className="md:text-md lg:text-lg font-semibold">Sort By</h1>
            <div className="space-x-1 space-y-1">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`text-xs py-1 px-3 rounded-md border ${
                    sortBy === option
                      ? "bg-black text-white border-black"
                      : "bg-gray-100 border-gray-100 hover:border-black"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white font-rubik rounded-3xl p-5 mt-2 shadow-md">
            <h1 className="md:text-md lg:text-lg font-semibold">
              Availability
            </h1>
            <div className="flex items-center gap-1 mt-3">
              {availabilityOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setAvailability(option)}
                  className={`text-xs py-1 px-3 rounded-md border ${
                    availability === option
                      ? "bg-black text-white border-black"
                      : "bg-gray-100 border-gray-100 hover:border-black"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white font-rubik rounded-3xl p-5 mt-2 shadow-md">
            <h1 className="md:text-md lg:text-lg font-semibold">Price</h1>
            <p className="text-xs mt-3">
              The highest price is ${MAX_PRICE.toLocaleString()}
            </p>
            <Slider
              min={0}
              max={MAX_PRICE}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="py-4"
            />

            <div className="grid grid-cols-2 gap-3 pt-3">
              <div className="space-y-1">
                <label className="text-sm">From</label>
                <div className="flex items-center bg-gray-100 rounded-xl border px-3 py-2">
                  <span className="text-xs">$</span>
                  <input
                    type="number"
                    className="w-full bg-transparent outline-none text-xs ps-2"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setPriceRange([
                        Math.min(val, priceRange[1]),
                        priceRange[1],
                      ]);
                    }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm">To</label>
                <div className="flex items-center bg-gray-100 rounded-xl border px-3 py-2">
                  <span className="text-xs">$</span>
                  <input
                    type="number"
                    className="w-full bg-transparent outline-none text-xs ps-2"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setPriceRange([
                        priceRange[0],
                        Math.max(val, priceRange[0]),
                      ]);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white font-rubik rounded-3xl p-5 shadow-md mt-2">
            <h1 className="md:text-md lg:text-lg font-semibold">Category</h1>
            <div className="mt-3 space-y-1 space-x-1">
              {categoryOptions.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`text-xs py-1 px-3 rounded-md border ${
                    categories.includes(cat)
                      ? "bg-black text-white border-black"
                      : "bg-gray-100 border-gray-100 hover:border-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white font-rubik rounded-3xl p-5 shadow-md mt-2">
            <h1 className="md:text-md lg:text-lg font-semibold">Color</h1>
            <div className="mt-3 flex gap-2">
              {colors.map((color) => (
                <Tooltip key={color.name}>
                  <TooltipTrigger asChild>
                    <div
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 ${color.color} rounded-full cursor-pointer ${
                        selectedColor === color.name
                          ? "ring-2 ring-offset-2 ring-black"
                          : ""
                      }`}
                    ></div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{color.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          <div className="bg-white font-rubik rounded-3xl p-5 shadow-md mt-2">
            <h1 className="md:text-md lg:text-lg font-semibold">
              Product Type
            </h1>
            <div className="mt-3 space-y-1 space-x-1">
              {productTypeOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleProductType(type)}
                  className={`text-xs py-1 px-3 rounded-md border ${
                    productTypes.includes(type)
                      ? "bg-black text-white border-black"
                      : "bg-gray-100 border-gray-100 hover:border-black"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <SheetFooter className="px-4 w-full">
            <div className="bg-white w-full px-5 py-4 rounded-3xl shadow-md">
              <button className="bg-black text-white font-rubik w-full py-3 border border-black hover:bg-gray-200 hover:text-black transition-all duration-300 rounded-full">
                Show results
              </button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
