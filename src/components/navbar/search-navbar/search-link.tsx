"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { IoClose } from "react-icons/io5";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchInput from "./search-input";
import RecentSearches from "./recent-searches";
import ProductResults from "./product-result";
import PopularCollections from "./popular-collections";
import {
  popularCollections,
  initialRecentSearches,
  sampleProducts,
} from "@/lib/data/search";
import { RecentSearch, Product } from "@/types/search";

export default function SearchLink() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(
    initialRecentSearches
  );
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(sampleProducts);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredProducts(sampleProducts);
    } else {
      const filtered = sampleProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      const searchExists = recentSearches.some(
        (search) =>
          search.text.toLowerCase() === searchQuery.trim().toLowerCase()
      );

      if (!searchExists) {
        const newSearch = {
          id: recentSearches.length + 1,
          text: searchQuery.trim(),
        };
        setRecentSearches([newSearch, ...recentSearches]);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredProducts(sampleProducts);
  };

  const handleRecentSearchClick = (searchText: string) => {
    setSearchQuery(searchText);
    const filtered = sampleProducts.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <Sheet open={isOpenSearch} onOpenChange={setIsOpenSearch}>
      <SheetTrigger asChild>
        <button className="text-white border-none hover:bg-gray-900 p-2 rounded-full flex items-center justify-center">
          <Search className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="top"
        className="border-none data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top transition-all duration-300 ease-in-out inset-y-0 h-full w-full bg-[#f2f2f2] p-0"
        onInteractOutside={(e) => {
          if (e.type === "wheel" || e.type === "touchmove") {
            e.preventDefault();
          }
        }}
      >
        <div className="hidden lg:block fixed top-0 left-0 h-full bg-white px-3.5 py-3.5 w-14 z-50">
          <SheetTitle
            className="group cursor-pointer p-1 transition-all duration-200 rounded-none hover:bg-[#f2f2f2] hover:rounded-full"
            onClick={() => setIsOpenSearch(false)}
          >
            <IoClose className="w-5 h-5 transition-all duration-200 group-hover:rotate-180" />
          </SheetTitle>
        </div>

        <div
          className="h-screen overflow-y-scroll lg:flex lg:overflow-hidden"
          onScroll={handleScroll}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="lg:h-156 lg:ml-24 lg:mt-20 lg:w-1/2 flex flex-col overflow-hidden">
            <div className="shrink-0">
              <SearchInput
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                onClearSearch={handleClearSearch}
                onClose={() => setIsOpenSearch(false)}
              />
            </div>

            <div
              className="flex-1 overflow-y-auto overflow-x-hidden"
              onScroll={handleScroll}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <div className="lg:pr-4">
                <RecentSearches
                  searches={recentSearches}
                  onSearchClick={handleRecentSearchClick}
                />

                {/* <ProductResults
                  products={filteredProducts}
                  searchQuery={searchQuery}
                /> */}
              </div>
            </div>
          </div>

          <PopularCollections collections={popularCollections} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
