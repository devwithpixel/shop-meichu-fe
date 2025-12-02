"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavItem, Category } from "@/types/navigation";

interface NavLinkProps {
  href?: string;
  text: string;
  items?: NavItem[];
  categories?: Category[];
  isDropdown?: boolean;
  className?: string;
  isHome?: boolean;
}

export default function NavLink({
  href,
  text,
  items,
  categories,
  isDropdown = false,
  className = "",
  isHome = false,
}: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const AnimatedText = ({
    text,
    isHovered,
  }: {
    text: string;
    isHovered: boolean;
  }) => (
    <div className="relative h-6 overflow-hidden text-base text-gray-300 hover:text-white transition-colors">
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

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  if (isHome) {
    return (
      <Link
        href={href || "#"}
        className={`relative group px-4 ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center gap-2">
          <span className="text-base text-gray-300 group-hover:text-white transition-colors">
            {text}
          </span>
          <ArrowRight
            className={`h-4 w-4 text-white transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2"
            }`}
          />
        </div>
        <div
          className={`absolute bottom-0 left-4 right-4 h-0.5 bg-white transition-all duration-300 ${
            isHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        />
      </Link>
    );
  }

  if (isDropdown && items) {
    const isCatalogMenu =
      categories && categories.length > 0 && !categories[0].subcategories;

    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <div
            className={`relative group flex items-center space-x-1 hover:bg-transparent hover:text-gray-300 transition-colors outline-none px-4 cursor-pointer ${className}`}
            onMouseEnter={() => {
              handleMouseEnter();
              setIsOpen(true);
            }}
            onMouseLeave={() => {
              handleMouseLeave();
            }}
          >
            <AnimatedText text={text} isHovered={isHovered} />
            <ChevronDown className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-white text-black mt-4 rounded-2xl"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {isCatalogMenu ? (
            <div className="p-6">
              <div className="flex flex-col gap-1">
                {categories?.map((category) => (
                  <Link
                    key={category.title}
                    href={category.href}
                    className="group font-rubik text-base font-medium text-black hover:text-white hover:bg-black transition-colors px-4 py-2 rounded-lg"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-10 px-20">
              <div className="flex items-start gap-10">
                {categories && categories.length > 0
                  ? categories.map((category) => (
                      <div
                        key={category.title || category.href}
                        className="flex flex-col gap-2"
                      >
                        <h1 className="text-base font-rubik font-medium mb-1">
                          {category.title}
                        </h1>
                        {category.subcategories &&
                          category.subcategories.map((sub) => (
                            <Link
                              key={sub.title}
                              href={sub.href}
                              className="group relative font-inter text-sm font-normal hover:text-gray-600 transition-colors flex items-center gap-2 py-1"
                            >
                              <span>{sub.title}</span>
                              <ArrowRight className="h-3 w-3 transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-600 transition-all duration-300 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100" />
                            </Link>
                          ))}
                      </div>
                    ))
                  : items?.map((item) => (
                      <div key={item.title} className="flex flex-col gap-2">
                        <Link
                          href={item.href}
                          className="group relative font-inter text-base font-medium hover:text-gray-600 transition-colors flex items-center gap-2 py-1"
                        >
                          <span>{item.title}</span>
                          <ArrowRight className="h-4 w-4 transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-600 transition-all duration-300 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100" />
                        </Link>
                      </div>
                    ))}
              </div>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      href={href || "#"}
      className={`hover:text-white text-base text-gray-300 transition-colors px-4 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatedText text={text} isHovered={isHovered} />
    </Link>
  );
}
