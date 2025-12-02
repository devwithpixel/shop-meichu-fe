"use client";

import { Input } from "@/components/ui/input";
import { IoClose } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";

interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  onClose: () => void;
}

export default function SearchInput({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onClearSearch,
  onClose,
}: SearchInputProps) {
  return (
    <div className="flex items-center lg:items-start bg-white lg:bg-transparent lg:border-b lg:border-gray-300 text-left py-3 lg:px-0 px-6 mb-3 lg:mb-0">
      <Input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        onKeyDown={onSearchSubmit}
        className="border-none shadow-none rounded-none w-full h-12 text-base lg:text-2xl lg:placeholder:text-2xl placeholder:text-base px-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-left"
        placeholder="Search"
      />
      <div className="gap-4 flex items-center">
        {searchQuery ? (
          <button
            onClick={onClearSearch}
            className="text-xs font-medium hover:underline cursor-pointer"
          >
            Clear
          </button>
        ) : (
          <IoSearchOutline className="w-6 h-6 lg:w-7 lg:h-7" />
        )}
        <button
          onClick={onClose}
          className="lg:hidden block group cursor-pointer p-1 transition-all duration-200 bg-[#f2f2f2] rounded-full"
        >
          <IoClose className="w-5 h-5 transition-all duration-200 group-hover:rotate-180" />
        </button>
      </div>
    </div>
  );
}
