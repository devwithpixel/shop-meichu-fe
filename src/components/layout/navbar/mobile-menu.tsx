"use client";

import { useState } from "react";
import Link from "next/link";
import { CgMenuLeft } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Navigation } from "@/types/navigation";
import type { Category } from "@/types/strapi/models/category";

export default function MobileMenu({
  navigations,
  categories,
}: {
  navigations: Navigation[];
  categories: Category[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCatalog, setIsOpenCatalog] = useState(false);

  return (
    <div className="lg:hidden ">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="text-white bg-transparent">
            <CgMenuLeft className="h-8 w-8" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          defaultLeft="data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left transition-all duration-300 ease-in-out inset-y-0 h-full w-full"
          className="bg-black text-white w-screen h-screen p-0 fixed inset-0 max-w-none"
        >
          <div className="flex flex-col h-full">
            <SheetHeader>
              <div className="flex items-center justify-between">
                <div
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between gap-4 p-4"
                >
                  <div
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-300 transition-colors p-0 h-auto w-auto flex items-center justify-center bg-transparent shadow-none border-none cursor-pointer"
                  >
                    <IoCloseCircleOutline className="h-8 w-8 md:h-10 md:w-10" />
                  </div>
                  <SheetTitle className="text-3xl md:text-4xl font-light tracking-wide text-white font-albert-sans">
                    <img
                      src="./assets/logo/meichu.png"
                      alt="Meichu"
                      className="w-auto h-8"
                    />
                  </SheetTitle>
                </div>
              </div>
            </SheetHeader>

            <div className="h-0.5">
              <Separator className="opacity-10" orientation="horizontal" />
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="flex flex-col gap-6 text-lg">
                {navigations.map((navigationItem, index) => (
                  <div key={index}>
                    {navigationItem.title === "Catalog" ? (
                      <div>
                        <Sheet
                          open={isOpenCatalog}
                          onOpenChange={setIsOpenCatalog}
                        >
                          <div className="flex items-center justify-between font-albert-sans">
                            <Link
                              href={navigationItem.url || "/collections"}
                              className="w-full text-start"
                              onClick={() => setIsOpen(false)}
                            >
                              <h1 className="font-normal text-lg md:text-xl hover:text-gray-300 transition-colors font-albert-sans">
                                {navigationItem.title}
                              </h1>
                            </Link>
                            <SheetTrigger asChild>
                              <div className="rounded-full p-1.5 border border-white cursor-pointer hover:bg-white hover:text-black transition-colors">
                                <GoArrowUpRight className="w-5 h-5" />
                              </div>
                            </SheetTrigger>
                          </div>
                          <SheetContent
                            side="right"
                            defaultRight="data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right transition-all duration-300 ease-in-out inset-y-0 h-full w-full"
                            className="bg-white text-black"
                          >
                            <SheetHeader
                              onClick={() => setIsOpenCatalog(false)}
                              className="cursor-pointer"
                            >
                              <div className="flex items-center">
                                <MdOutlineKeyboardArrowLeft className="w-8 h-8 mt-1" />
                                <SheetTitle className="font-normal text-xl">
                                  Back
                                </SheetTitle>
                              </div>
                            </SheetHeader>
                            <div className="flex flex-col px-6 gap-6 mt-6">
                              {categories.map((category) => (
                                <Link
                                  key={category.slug}
                                  href={`/collections/${category.slug}`}
                                  className="w-full text-start"
                                  onClick={() => {
                                    setIsOpen(false);
                                    setIsOpenCatalog(false);
                                  }}
                                >
                                  <h1 className="font-semibold font-albert-sans text-lg hover:text-gray-500 transition-colors">
                                    {category.name}
                                  </h1>
                                </Link>
                              ))}
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                    ) : (
                      <Link
                        href={navigationItem.url || "#"}
                        className="font-normal text-lg md:text-xl hover:text-gray-300 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {navigationItem.title}
                      </Link>
                    )}

                    {index < navigations.length - 1 && (
                      <div className="h-0.5 my-4">
                        <Separator
                          className="opacity-10 md:opacity-20"
                          orientation="horizontal"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
