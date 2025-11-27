"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface NavLinkProps {
  href?: string;
  text: string;
  items?: { title: string; href: string }[];
  isDropdown?: boolean;
  className?: string;
}

export default function NavLink({
  href,
  text,
  items,
  isDropdown = false,
  className = "",
}: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

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

  if (isDropdown && items) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Link
            href="/"
            className={`flex items-center space-x-1 hover:bg-transparent hover:text-gray-300 transition-colors outline-none px-4 ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <AnimatedText text={text} isHovered={isHovered} />
            <ChevronDown className="h-4 w-4" />
          </Link>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white text-black mt-4 rounded-2xl">
          {/* {items.map((item) => (
            <DropdownMenuItem key={item.title} asChild>
              <Link
                href={item.href}
                className="cursor-pointer hover:bg-gray-900 focus:bg-gray-900 focus:text-white"
              >
                {item.title}
              </Link>
            </DropdownMenuItem>
          ))} */}
          <div className="py-10 px-20">
            <div className="flex items-center gap-10">
              <div className="flex flex-col gap-2">
                <h1 className="text-base font-rubik font-medium">
                  SUMMER ESSENTIALS
                </h1>
                <Link href="#" className="font-inter text-sm font-normal">
                  Loose T-shirt
                </Link>
                <Link href="#" className="font-inter text-sm font-normal">
                  Loose T-shirt
                </Link>
                <Link href="#" className="font-inter text-sm font-normal">
                  Loose T-shirt
                </Link>
                <Link href="#" className="font-inter text-sm font-normal">
                  Loose T-shirt
                </Link>
                <Link href="#" className="font-inter text-sm font-normal">
                  Loose T-shirt
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-base font-rubik font-medium">
                  SUMMER ESSENTIALS
                </h1>
                <Link href="#" className="font-inter text-sm font-normal">
                  Loose T-shirt
                </Link>
                <Link href="#" className="font-inter text-sm font-normal">
                  Loose T-shirt
                </Link>
                <Link href="#" className="font-inter text-sm font-normal">
                  Loose T-shirt
                </Link>
                <Link href="#" className="font-inter text-sm font-normal">
                  Loose T-shirt
                </Link>
                <Link href="#" className="font-inter text-sm font-normal">
                  Loose T-shirt
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-base font-rubik font-medium">
                  SUMMER ESSENTIALS
                </h1>
                <Link href="#" className="font-inter text-sm font-normal">
                  Loose T-shirt
                </Link>
                <Link href="#" className="font-inter text-sm font-normal">
                  Loose T-shirt
                </Link>
                <Link href="#" className="font-inter text-sm font-normal">
                  Loose T-shirt
                </Link>
                <Link href="#" className="font-inter text-sm font-normal">
                  Loose T-shirt
                </Link>
                <Link href="#" className="font-inter text-sm font-normal">
                  Loose T-shirt
                </Link>
              </div>
            </div>
          </div>
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
