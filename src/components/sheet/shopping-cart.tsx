"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCallback } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useCart } from "@/context/cart-provider";
import useSWR from "swr";

import type { StrapiResponse } from "@/types/strapi/response";
import type { Product } from "@/types/strapi/models/product";

import CartItem from "./shopping-cart/cart-item";
import CartSummary from "./shopping-cart/cart-summary";
import RecommendedProducts from "./shopping-cart/recommended-products";

const fetcher = (url: string) =>
  fetch(url).then((r) => r.json() as Promise<StrapiResponse<Product[]>>);

export default function ShoppingCart() {
  const isMobile = useIsMobile();
  const { data: response } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/recommended-product`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const { isOpen, setIsOpen, items, updateQuantity, removeItem } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="text-white border-none hover:bg-gray-900 p-2 rounded-full flex items-center justify-center relative">
          <FiShoppingBag className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent
        side={isMobile ? "top" : "right"}
        className={`${
          isMobile
            ? "data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top inset-x-0 top-0 w-full h-full rounded-b-3xl"
            : "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right inset-y-0 right-0 h-[95%] md:w-[60%] lg:w-[35%] max-w-none! md:rounded-3xl md:mr-8 md:my-6"
        }  bg-[#f2f2f2] border-none shadow-xl p-0 overflow-hidden flex flex-col`}
        onInteractOutside={(e) => {
          if (e.type === "wheel" || e.type === "touchmove") {
            e.preventDefault();
          }
        }}
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="sticky top-0 px-6 py-5 border-b z-20 shrink-0">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-bold font-rubik ">
                Shopping bag ({items.length})
              </SheetTitle>
              <div
                className="group cursor-pointer p-1 transition-all duration-200 rounded-none hover:bg-[#f2f2f2] hover:rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <IoClose className="w-5 h-5 transition-all duration-200 group-hover:rotate-180" />
              </div>
            </div>
          </SheetHeader>

          <div
            className="flex-1 overflow-y-auto bg-[#f2f2f2]"
            onScroll={handleScroll}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div className="py-6">
              {items.length === 0 ? (
                <div className="space-y-8 min-h-125 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center text-center">
                    <FiShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Your bag is empty
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Add items to get started
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="px-6">
                    {items.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                      />
                    ))}
                  </div>

                  {response && (
                    <RecommendedProducts products={response.data || []} />
                  )}
                </>
              )}
            </div>
          </div>

          {items.length > 0 && (
            <CartSummary subtotal={subtotal} grandTotal={subtotal} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
