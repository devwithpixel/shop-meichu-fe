"use client";

import { ChevronLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CheckoutHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            <h1 className="text-base md:text-xl font-semibold text-gray-900 font-rubik">
              Secure Checkout
            </h1>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Back to cart</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
