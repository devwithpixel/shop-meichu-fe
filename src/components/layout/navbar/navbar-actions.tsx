"use client";

// import Link from "next/link";
import ShoppingCart from "@/components/sheet/shopping-cart";
import { useSearch } from "@/context/search-provider";
import { SearchIcon } from "lucide-react";
// import { FaRegUserCircle } from "react-icons/fa";

export default function NavbarActions() {
  const { setIsSearchOpen } = useSearch();

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(true)}
        className="text-white border-none hover:bg-gray-900 p-2 rounded-full flex items-center justify-center"
      >
        <SearchIcon className="h-5 w-5" />
      </button>

      {/* <Link
        href="/auth/login"
        className="text-white hover:bg-gray-900 p-2 rounded-full hidden lg:flex items-center justify-center"
      >
        <FaRegUserCircle className="h-5 w-5" />
      </Link> */}

      <ShoppingCart />
    </>
  );
}
