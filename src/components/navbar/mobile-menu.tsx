"use client";

import { useState } from "react";
import Link from "next/link";
import { CgMenuLeft } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Category } from "@/types/navigation";

interface MobileMenuProps {
  homeCategories: Category[];
  catalogCategories: Category[];
}

export default function MobileMenu({
  homeCategories,
  catalogCategories,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenHome, setIsOpenHome] = useState(false);
  const [isOpenHomeCategory, setIsOpenHomeCategory] = useState(false);
  const [isOpenCatalog, setIsOpenCatalog] = useState(false);
  const [selectedHomeCategory, setSelectedHomeCategory] =
    useState<Category | null>(null);

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="text-white bg-transparent">
            <CgMenuLeft className="h-7 w-7" />
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
                  className="flex items-center gap-4 p-4"
                >
                  <div
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-300 transition-colors p-0 h-auto w-auto flex items-center justify-center bg-transparent shadow-none border-none cursor-pointer"
                  >
                    <IoCloseCircleOutline className="h-8 w-8 md:h-10 md:w-10" />
                  </div>
                  <SheetTitle className="text-3xl md:text-4xl font-light tracking-wide text-white font-rubik">
                    MEICHU
                  </SheetTitle>
                  <div className="w-6"></div>
                </div>
                <div className="pr-4">
                  <Link
                    href="#"
                    className="text-white hover:bg-gray-900 p-2 rounded-full flex items-center justify-center"
                  >
                    <FaRegUserCircle className="h-7 w-7" />
                  </Link>
                </div>
              </div>
            </SheetHeader>

            <div className="h-0.5">
              <Separator className="opacity-10" orientation="horizontal" />
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="flex flex-col gap-6 text-lg">
                {/* Home Link */}
                <div>
                  <Sheet open={isOpenHome} onOpenChange={setIsOpenHome}>
                    <div className="flex items-center justify-between">
                      <Link
                        href="/"
                        className="w-full text-start"
                        onClick={() => setIsOpen(false)}
                      >
                        <h1 className="font-normal text-lg md:text-xl hover:text-gray-300 transition-colors">
                          Home
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
                        onClick={() => setIsOpenHome(false)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center">
                          <MdOutlineKeyboardArrowLeft className="w-8 h-8 mt-1" />
                          <SheetTitle className="font-normal text-xl">
                            Back
                          </SheetTitle>
                        </div>
                      </SheetHeader>
                      <div className="px-6 flex flex-col gap-6 mt-6">
                        {homeCategories.map((category) => (
                          <Sheet
                            key={category.title}
                            open={
                              isOpenHomeCategory &&
                              selectedHomeCategory?.title === category.title
                            }
                            onOpenChange={(open) => {
                              setIsOpenHomeCategory(open);
                              if (open) {
                                setSelectedHomeCategory(category);
                              }
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <Link
                                href={category.href}
                                className="w-full text-start"
                                onClick={() => {
                                  setIsOpen(false);
                                  setIsOpenHome(false);
                                }}
                              >
                                <h1 className="font-semibold font-rubik text-lg hover:text-gray-500 transition-colors">
                                  {category.title}
                                </h1>
                              </Link>
                              <SheetTrigger asChild>
                                <div className="rounded-full p-1.5 border border-black cursor-pointer hover:bg-black hover:text-white transition-colors">
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
                                onClick={() => setIsOpenHomeCategory(false)}
                                className="cursor-pointer"
                              >
                                <div className="flex items-center">
                                  <MdOutlineKeyboardArrowLeft className="w-8 h-8 mt-1" />
                                  <SheetTitle className="font-normal text-xl">
                                    Back
                                  </SheetTitle>
                                </div>
                              </SheetHeader>
                              <div className="flex flex-col px-6 gap-4 mt-6">
                                {selectedHomeCategory?.subcategories?.map(
                                  (sub) => (
                                    <Link
                                      key={sub.title}
                                      href={sub.href}
                                      className="w-full text-start"
                                      onClick={() => {
                                        setIsOpen(false);
                                        setIsOpenHome(false);
                                        setIsOpenHomeCategory(false);
                                      }}
                                    >
                                      <h1 className="font-normal font-rubik text-lg hover:text-gray-500 transition-colors">
                                        {sub.title}
                                      </h1>
                                    </Link>
                                  )
                                )}
                              </div>
                            </SheetContent>
                          </Sheet>
                        ))}
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="h-0.5">
                  <Separator className="opacity-10" orientation="horizontal" />
                </div>

                {/* Catalog Link */}
                <div>
                  <Sheet open={isOpenCatalog} onOpenChange={setIsOpenCatalog}>
                    <div className="flex items-center justify-between">
                      <Link
                        href="/catalog"
                        className="w-full text-start"
                        onClick={() => setIsOpen(false)}
                      >
                        <h1 className="font-normal text-lg md:text-xl hover:text-gray-300 transition-colors">
                          Catalog
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
                        {catalogCategories.map((category) => (
                          <Link
                            key={category.title}
                            href={category.href}
                            className="w-full text-start"
                            onClick={() => {
                              setIsOpen(false);
                              setIsOpenCatalog(false);
                            }}
                          >
                            <h1 className="font-semibold font-rubik text-lg hover:text-gray-500 transition-colors">
                              {category.title}
                            </h1>
                          </Link>
                        ))}
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="h-0.5">
                  <Separator className="opacity-10" orientation="horizontal" />
                </div>

                {/* Other Links */}
                <Link
                  href="/about"
                  className="font-normal text-lg md:text-xl hover:text-gray-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>

                <Separator
                  className="opacity-10 md:opacity-30"
                  orientation="horizontal"
                />

                <Link
                  href="/blogs"
                  className="font-normal text-lg md:text-xl hover:text-gray-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Blogs
                </Link>

                <Separator
                  className="opacity-10 md:opacity-30"
                  orientation="horizontal"
                />

                <Link
                  href="/privacy"
                  className="font-normal text-lg md:text-xl hover:text-gray-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Privacy
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
