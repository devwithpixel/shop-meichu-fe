import { ChevronLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CheckoutHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-gray-900" />
            <h1 className="text-xl font-semibold text-gray-900 font-rubik">
              Secure Checkout
            </h1>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to cart
          </Link>
        </div>
      </div>
    </header>
  );
}
