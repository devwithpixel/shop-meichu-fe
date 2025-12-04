"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import NavbarActions from "./navbar-actions";
import NavLink from "./nav-link";
import BottomNav from "./bottom-navbar";
import { cn } from "@/lib/utils";
import {
  homeCategories,
  catalogCategories,
  bottomNavItems,
} from "@/lib/data/navbar";
import { usePathname } from "next/navigation";

import type { Navbar } from "@/types/strapi/components/shared/navbar";
import type { Category } from "@/types/strapi/models/category";
import type { Navigation } from "@/types/navigation";

export default function Navbar({
  data,
  categories,
}: {
  data: Navbar;
  categories: Category[];
}) {
  const pathname = usePathname();
  const isCatalogAdded = useRef(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigations: Navigation[] = useMemo(() => {
    const navs = data.navigations as Navigation[];
    if (!isCatalogAdded.current) {
      navs.splice(1, 0, {
        title: "Catalog",
        subNavigation: {
          type: "single",
          items: categories.map((category) => ({
            title: category.name,
            url: `/collections/${category.slug}`,
          })),
        },
      });
      isCatalogAdded.current = true;
    }
    return navs;
  }, []);
  const lastScrollY = useRef(0);

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
          "fixed top-0 left-0 right-0 z-50 font-inter transition-all duration-300 text-white select-none",
          isVisible ? "translate-y-0" : "-translate-y-full",
          pathname === "/"
            ? isScrolled
              ? "bg-black border-b border-[#222121]"
              : "bg-transparent border-b border-[#222121]/20"
            : "bg-black border-b border-[#222121]"
        )}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-6 lg:py-1">
          <div className="flex justify-between items-center h-16">
            <div className="flex item-center">
              <MobileMenu
                homeCategories={homeCategories}
                catalogCategories={catalogCategories}
              />

              <div className="shrink-0 lg:ml-0 ml-4">
                <Link href="/" className="text-3xl font-light tracking-wide">
                  MEICHU
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex items-center px-6 flex-1 gap-1">
              {navigations.map((navigation, index) => (
                <NavLink key={index} {...navigation} />
              ))}
            </div>

            <div className="flex items-center">
              <NavbarActions />
            </div>
          </div>
        </div>
      </nav>

      <BottomNav items={bottomNavItems} isVisible={isVisible} />
    </>
  );
}
