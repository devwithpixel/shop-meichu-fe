"use client";

import { useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import { RecentSearch } from "@/types/search";

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSearchClick: (searchText: string) => void;
}

export default function RecentSearches({
  searches,
  onSearchClick,
}: RecentSearchesProps) {
  const [hoveredSearchId, setHoveredSearchId] = useState<number | null>(null);

  return (
    <div className="lg:mt-10 p-4 lg:p-0 flex flex-col gap-4 text-left bg-white lg:bg-transparent">
      <div>
        <h1 className="font-medium text-xl font-rubik text-left">
          Recent search
        </h1>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex gap-4 text-left flex-wrap">
        {searches.map((search) => (
          <div
            key={search.id}
            onClick={() => onSearchClick(search.text)}
            onMouseEnter={() => setHoveredSearchId(search.id)}
            onMouseLeave={() => setHoveredSearchId(null)}
            className="rounded-full bg-transparent border border-gray-300 py-1 px-3 cursor-pointer transition-colors text-left overflow-hidden"
          >
            <div className="flex items-center justify-between gap-2 text-left">
              <MdOutlineArrowOutward className="w-3 h-3" />
              <div className="relative overflow-hidden h-5">
                <div
                  className={`transition-transform duration-300 ${
                    hoveredSearchId === search.id
                      ? "-translate-y-5"
                      : "translate-y-0"
                  }`}
                >
                  <div className="h-5 flex items-center">
                    <h1 className="font-inter text-sm font-light text-left">
                      {search.text}
                    </h1>
                  </div>
                  <div className="h-5 flex items-center">
                    <h1 className="font-inter text-sm font-light text-left">
                      {search.text}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="flex lg:hidden flex-col-reverse text-left">
        {searches.map((search) => (
          <div
            key={search.id}
            onClick={() => onSearchClick(search.text)}
            onMouseEnter={() => setHoveredSearchId(search.id)}
            onMouseLeave={() => setHoveredSearchId(null)}
            className="rounded-full cursor-pointer transition-colors text-left"
          >
            <div>
              <div className="flex items-center justify-between gap-2 text-left pb-2">
                <div className="relative overflow-hidden h-5 ">
                  <div
                    className={`transition-transform duration-300 ${
                      hoveredSearchId === search.id
                        ? "-translate-y-5"
                        : "translate-y-0"
                    }`}
                  >
                    <div className="h-5 flex items-center">
                      <h1 className="font-inter text-xs lg:text-sm font-light text-left">
                        {search.text}
                      </h1>
                    </div>
                    <div className="h-5 flex items-center">
                      <h1 className="font-inter text-xs lg:text-sm font-light text-left">
                        {search.text}
                      </h1>
                    </div>
                  </div>
                </div>
                <MdOutlineArrowOutward className="w-3 h-3" />
              </div>
              <Separator orientation="horizontal" className="h-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
