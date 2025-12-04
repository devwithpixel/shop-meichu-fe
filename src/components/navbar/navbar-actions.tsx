"use client";

import Link from "next/link";
import SearchLink from "./search-navbar/search-link";
import ShoppingCart from "@/components/sheet/shopping-cart";
import { FaRegUserCircle } from "react-icons/fa";

export default function NavbarActions() {
  return (
    <>
      <SearchLink />

      <Link
        href="/auth/login"
        className="text-white hover:bg-gray-900 p-2 rounded-full hidden lg:flex items-center justify-center"
      >
        <FaRegUserCircle className="h-5 w-5" />
      </Link>

      <ShoppingCart />
    </>
  );
}
