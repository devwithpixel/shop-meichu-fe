"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import NavLink from "./nav-link";
import StrapiImage from "@/components/global/strapi-image";

import type { Navbar } from "@/types/strapi/components/shared/navbar";
import type { Category } from "@/types/strapi/models/category";
import type { Navigation } from "@/types/navigation";
import Search from "@/components/sheet/search";

export default function Navbar({
  data,
  categories,
}: {
  data: Navbar;
  categories: Category[];
}) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = pathname === "/";
  const isAboutPage = pathname === "/about-us";

  const hasScrollEffect = isHomePage || isAboutPage;

  const navigations: Navigation[] = useMemo(() => {
    return [
      ...(data.navigations as Navigation[]).slice(0, 1),
      {
        title: "Catalog",
        subNavigation: {
          type: "single",
          items: categories.map((category) => ({
            title: category.name,
            url: `/collections/${category.slug}`,
          })),
        },
      },
      ...(data.navigations as Navigation[]).slice(1),
    ];
  }, [data.navigations, categories]);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      setIsScrolled(current > 100);

      if (hasScrollEffect) {
        if (current > lastScrollY.current && current > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrollEffect]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 font-inter transition-all duration-300 text-white select-none",
          hasScrollEffect && !isVisible ? "-translate-y-full" : "translate-y-0",
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
              <MobileMenu
                brandData={data.brand}
                navigations={navigations}
                categories={categories}
              />

              <div className="shrink-0">
                <Link href="/" className="text-3xl font-light tracking-wide">
                  <StrapiImage
                    src={data.brand?.icon}
                    alt={data.brand?.name}
                    size="small"
                    className="object-cover w-auto h-10"
                  />
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex items-center px-6 flex-1 gap-4">
              {navigations.map((navigation, index) => (
                <NavLink
                  key={index}
                  title={navigation.title}
                  url={navigation.url}
                  subNavigation={navigation.subNavigation}
                />
              ))}
            </div>

            <div className="flex items-center">
              <Search categories={categories} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
