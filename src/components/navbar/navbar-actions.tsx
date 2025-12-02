"use client";

import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import SearchLink from "./search-navbar/search-link";
import ShoppingBag from "./cart-navbar/shopping-bag";

export default function NavActions() {
  return (
    <div className="flex items-center">
      <SearchLink />

      <Link
        href="#"
        className="text-white hover:bg-gray-900 p-2 rounded-full hidden lg:flex items-center justify-center"
      >
        <FaRegUserCircle className="h-5 w-5" />
      </Link>

      <ShoppingBag />
    </div>
  );
}
