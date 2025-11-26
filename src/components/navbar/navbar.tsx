"use client";

import { useState, useEffect } from "react";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  ChevronDown,
  Home,
  Grid3x3,
  Package,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileHomeOpen, setMobileHomeOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoverStates, setHoverStates] = useState({
    home: false,
    catalog: false,
    about: false,
    blogs: false,
    privacy: false,
  });

  const homeItems = [
    { title: "Home v1", href: "/" },
    { title: "Home v2", href: "/home-v2" },
    { title: "Home v3", href: "/home-v3" },
  ];

  const catalogItems = [
    { title: "All Products", href: "/catalog" },
    { title: "New Arrivals", href: "/catalog/new" },
    { title: "Best Sellers", href: "/catalog/best-sellers" },
    { title: "Sale", href: "/catalog/sale" },
  ];

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const handleMouseEnter = (item: string) => {
    setHoverStates((prev) => ({ ...prev, [item]: true }));
  };

  const handleMouseLeave = (item: string) => {
    setHoverStates((prev) => ({ ...prev, [item]: false }));
  };

  const AnimatedText = ({
    text,
    isHovered,
  }: {
    text: string;
    isHovered: boolean;
  }) => (
    <div className="relative h-6 overflow-hidden">
      <div
        className={`transition-transform duration-300 ${
          isHovered ? "-translate-y-6" : "translate-y-0"
        }`}
      >
        <div className="h-6 flex items-center">{text}</div>
        <div className="h-6 flex items-center">{text}</div>
      </div>
    </div>
  );

  return (
    <>
      <nav
        className={`bg-black font-inter text-white border-b border-gray-800 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="bg-black text-white w-full h-full p-0 fixed inset-0"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-gray-800">
                      <span className="text-2xl font-bold tracking-tight">
                        MEICHU
                      </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8">
                      <div className="flex flex-col space-y-8 text-lg">
                        <div className="space-y-4">
                          <Button
                            variant="ghost"
                            onClick={() => setMobileHomeOpen(!mobileHomeOpen)}
                            className="flex items-center justify-between w-full text-left font-medium text-xl"
                          >
                            Home
                            <ChevronDown
                              className={`h-5 w-5 transition-transform ${
                                mobileHomeOpen ? "rotate-180" : ""
                              }`}
                            />
                          </Button>
                          {mobileHomeOpen && (
                            <div className="pl-6 space-y-3">
                              {homeItems.map((item) => (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  className="block py-2 text-gray-400 hover:text-white transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <Button
                            variant="default"
                            onClick={() =>
                              setMobileCatalogOpen(!mobileCatalogOpen)
                            }
                            className="flex items-center justify-between w-full text-left font-medium text-xl"
                          >
                            Catalog
                            <ChevronDown
                              className={`h-5 w-5 transition-transform ${
                                mobileCatalogOpen ? "rotate-180" : ""
                              }`}
                            />
                          </Button>
                          {mobileCatalogOpen && (
                            <div className="pl-6 space-y-3">
                              {catalogItems.map((item) => (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  className="block py-2 text-gray-400 hover:text-white transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>

                        <Link
                          href="/about"
                          className="font-medium text-xl hover:text-gray-300 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          About
                        </Link>
                        <Link
                          href="/blogs"
                          className="font-medium text-xl hover:text-gray-300 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Blogs
                        </Link>
                        <Link
                          href="/privacy"
                          className="font-medium text-xl hover:text-gray-300 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Privacy
                        </Link>
                      </div>
                    </div>

                    <div className="p-8 border-t border-gray-800">
                      <div className="flex items-center justify-center space-x-6">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:text-gray-300 h-12 w-12"
                        >
                          <Search className="h-6 w-6" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:text-gray-300 h-12 w-12"
                        >
                          <User className="h-6 w-6" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:text-gray-300 h-12 w-12"
                        >
                          <ShoppingCart className="h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="shrink-0 lg:ml-0 ml-4">
              <Link href="/" className="text-2xl font-bold tracking-tight">
                MEICHU
              </Link>
            </div>

            <div className="hidden lg:flex items-center px-8 flex-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1 hover:bg-transparent hover:text-gray-300 transition-colors outline-none px-4"
                    onMouseEnter={() => handleMouseEnter("home")}
                    onMouseLeave={() => handleMouseLeave("home")}
                  >
                    <AnimatedText text="Home" isHovered={hoverStates.home} />
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black border-gray-800 text-white">
                  {homeItems.map((item) => (
                    <DropdownMenuItem key={item.title} asChild>
                      <Link
                        href={item.href}
                        className="cursor-pointer hover:bg-gray-900 focus:bg-gray-900 focus:text-white"
                      >
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1 hover:bg-transparent hover:text-gray-300 transition-colors outline-none px-4"
                    onMouseEnter={() => handleMouseEnter("catalog")}
                    onMouseLeave={() => handleMouseLeave("catalog")}
                  >
                    <AnimatedText
                      text="Catalog"
                      isHovered={hoverStates.catalog}
                    />
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black border-gray-800 text-white">
                  {catalogItems.map((item) => (
                    <DropdownMenuItem key={item.title} asChild>
                      <Link
                        href={item.href}
                        className="cursor-pointer hover:bg-gray-900 focus:bg-gray-900 focus:text-white"
                      >
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/about"
                className="hover:text-gray-300 transition-colors px-4"
                onMouseEnter={() => handleMouseEnter("about")}
                onMouseLeave={() => handleMouseLeave("about")}
              >
                <AnimatedText text="About" isHovered={hoverStates.about} />
              </Link>
              <Link
                href="/blogs"
                className="hover:text-gray-300 transition-colors px-4"
                onMouseEnter={() => handleMouseEnter("blogs")}
                onMouseLeave={() => handleMouseLeave("blogs")}
              >
                <AnimatedText text="Blogs" isHovered={hoverStates.blogs} />
              </Link>
              <Link
                href="/privacy"
                className="hover:text-gray-300 transition-colors px-4"
                onMouseEnter={() => handleMouseEnter("privacy")}
                onMouseLeave={() => handleMouseLeave("privacy")}
              >
                <AnimatedText text="Privacy" isHovered={hoverStates.privacy} />
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-2 ml-auto">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-300 hover:bg-gray-900"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-300 hover:bg-gray-900"
              >
                <User className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-300 hover:bg-gray-900"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <nav className="sm:hidden font-inter fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-6 h-16">
          <Link
            href="/"
            className="flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Home className="h-5 w-5 text-black" />
            <span className="text-xs text-black mt-1">Home</span>
          </Link>

          <Link
            href="/menu"
            className="flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Grid3x3 className="h-5 w-5 text-black" />
            <span className="text-xs text-black mt-1">Menu</span>
          </Link>

          <Link
            href="/search"
            className="flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Search className="h-5 w-5 text-black" />
            <span className="text-xs text-black mt-1">Search</span>
          </Link>

          <Link
            href="/shop"
            className="flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Package className="h-5 w-5 text-black" />
            <span className="text-xs text-black mt-1">Shop</span>
          </Link>

          <Link
            href="/account"
            className="flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <User className="h-5 w-5 text-black" />
            <span className="text-xs text-black mt-1">Account</span>
          </Link>

          <Link
            href="/cart"
            className="flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart className="h-5 w-5 text-black" />
            <span className="text-xs text-black mt-1">Cart</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
