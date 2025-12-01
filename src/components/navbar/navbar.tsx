"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  Search,
  User,
  ShoppingCart,
  Home,
  Grid3x3,
  Package,
} from "lucide-react";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { CgMenuLeft } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";
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
import Link from "next/link";
import NavLink from "./nav-link";
import SearchLink from "./search-link";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenHome, setIsOpenHome] = useState(false);
  const [isOpenHomeCategory, setIsOpenHomeCategory] = useState(false);
  const [isOpenCatalog, setIsOpenCatalog] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const [selectedHomeCategory, setSelectedHomeCategory] = useState<{
    title: string;
    href: string;
    subcategories: { title: string; href: string }[];
  } | null>(null);

  const isHomePage = pathname === "/";

  const homeItems = [
    { title: "Home 1", href: "/" },
    { title: "Home 2", href: "/home-2" },
    { title: "Home 3", href: "/home-3" },
  ];

  const catalogItems = [
    { title: "All Products", href: "/catalog" },
    { title: "New Arrivals", href: "/catalog/new-arrivals" },
    { title: "Best Sellers", href: "/catalog/best-sellers" },
    { title: "Sale", href: "/catalog/sale" },
  ];

  const homeCategories = [
    {
      title: "SUMMER ESSENTIALS",
      href: "/collections/summer",
      subcategories: [
        { title: "Summer Dresses", href: "/collections/summer/dresses" },
        { title: "Beachwear", href: "/collections/summer/beachwear" },
        { title: "Sandals & Slides", href: "/collections/summer/footwear" },
        { title: "Sun Hats", href: "/collections/summer/accessories" },
      ],
    },
    {
      title: "FALL COLLECTION",
      href: "/collections/fall",
      subcategories: [
        { title: "Sweaters & Cardigans", href: "/collections/fall/sweaters" },
        { title: "Coats & Jackets", href: "/collections/fall/outerwear" },
        { title: "Boots", href: "/collections/fall/boots" },
        { title: "Scarves", href: "/collections/fall/scarves" },
      ],
    },
    {
      title: "CASUAL WEAR",
      href: "/collections/casual",
      subcategories: [
        { title: "T-Shirts & Tops", href: "/collections/casual/tops" },
        { title: "Jeans & Denim", href: "/collections/casual/denim" },
        { title: "Sneakers", href: "/collections/casual/sneakers" },
        { title: "Bags", href: "/collections/casual/bags" },
      ],
    },
    {
      title: "FORMAL ATTIRE",
      href: "/collections/formal",
      subcategories: [
        { title: "Blazers & Suits", href: "/collections/formal/blazers" },
        { title: "Dress Shirts", href: "/collections/formal/shirts" },
        { title: "Dress Shoes", href: "/collections/formal/shoes" },
        {
          title: "Ties & Accessories",
          href: "/collections/formal/accessories",
        },
      ],
    },
  ];

  const catalogCategories = [
    { title: "WOMEN'S CLOTHING", href: "/catalog/women" },
    { title: "MEN'S CLOTHING", href: "/catalog/men" },
    { title: "SHOES & FOOTWEAR", href: "/catalog/shoes" },
    { title: "ACCESSORIES", href: "/catalog/accessories" },
    { title: "BAGS & WALLETS", href: "/catalog/bags" },
    { title: "JEWELRY", href: "/catalog/jewelry" },
    { title: "SPORTSWEAR", href: "/catalog/sportswear" },
    { title: "OUTERWEAR", href: "/catalog/outerwear" },
  ];

  const navLinks = [
    {
      text: "Home",
      items: homeItems,
      isDropdown: true,
      categories: homeCategories,
    },
    {
      text: "Catalog",
      items: catalogItems,
      isDropdown: true,
      categories: catalogCategories,
    },
    { text: "About", href: "/about" },
    { text: "Blogs", href: "/blogs" },
    { text: "Privacy", href: "/privacy" },
  ];

  const bottomNavItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/menu", icon: Grid3x3, label: "Menu" },
    { href: "/search", icon: Search, label: "Search" },
    { href: "/shop", icon: Package, label: "Shop" },
    { href: "/account", icon: User, label: "Account" },
    { href: "/cart", icon: ShoppingCart, label: "Cart" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      setIsScrolled(current > 1000);

      if (current > lastScrollY.current && current > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 font-inter transition-all duration-300 text-white",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isHomePage
            ? isScrolled
              ? "bg-black border-b border-[#222121]"
              : "bg-transparent border-b border-[#222121]/20"
            : "bg-black border-b border-[#222121]"
        )}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-6 lg:py-1">
          <div className="flex justify-between items-center h-16">
            <div className="flex item-center">
              {/* Mobile Menu */}
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
                        <Separator
                          className="opacity-10"
                          orientation="horizontal"
                        />
                      </div>

                      <div className="flex-1 overflow-y-auto p-8">
                        <div className="flex flex-col gap-6 text-lg">
                          {/* Home Link */}
                          <div>
                            <Sheet
                              open={isOpenHome}
                              onOpenChange={setIsOpenHome}
                            >
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
                                        selectedHomeCategory?.title ===
                                          category.title
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
                                          onClick={() =>
                                            setIsOpenHomeCategory(false)
                                          }
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
                                          {selectedHomeCategory?.subcategories.map(
                                            (sub: any) => (
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
                            <Separator
                              className="opacity-10"
                              orientation="horizontal"
                            />
                          </div>

                          {/* Catalog Link */}
                          <div>
                            <Sheet
                              open={isOpenCatalog}
                              onOpenChange={setIsOpenCatalog}
                            >
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
                            <Separator
                              className="opacity-10"
                              orientation="horizontal"
                            />
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

              {/* Logo */}
              <div className="shrink-0 lg:ml-0 ml-4">
                <Link href="/" className="text-3xl font-light tracking-wide">
                  MEICHU
                </Link>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center px-6 flex-1 gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.text}
                  text={link.text}
                  href={link.href}
                  items={link.items}
                  categories={link.categories}
                  isDropdown={link.isDropdown}
                />
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center">
              <div className="">
                <SearchLink />
              </div>

              <Link
                href="#"
                className="text-white hover:bg-gray-900 p-2 rounded-full hidden lg:flex items-center justify-center"
              >
                <FaRegUserCircle className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="text-white hover:bg-gray-900 p-2 rounded-full flex items-center justify-center"
              >
                <FiShoppingBag className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Nav */}
      <nav
        className={`sm:hidden font-inter fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="grid grid-cols-6 h-16">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Icon className="h-5 w-5 text-black" />
                <span className="text-xs text-black mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
