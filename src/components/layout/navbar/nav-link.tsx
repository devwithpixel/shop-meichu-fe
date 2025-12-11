"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Navigation } from "@/types/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

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

export default function NavLink({ title, url, subNavigation }: Navigation) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  if (subNavigation && subNavigation.items && subNavigation.items.length > 0) {
    return (
      <div
        className="relative"
        onMouseEnter={() => {
          handleMouseEnter();
          setIsOpen(true);
        }}
        onMouseLeave={() => {
          handleMouseLeave();
          setIsOpen(false);
        }}
      >
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Link
              href={url || "#"}
              className="flex items-center space-x-1 hover:bg-transparent hover:text-gray-300 transition-colors outline-none px-4 cursor-pointer"
              onClick={(e) => {
                if (isOpen) {
                  e.preventDefault();
                }
              }}
            >
              <AnimatedText text={title} isHovered={isHovered} />
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </Link>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-72 bg-white text-black mt-4 rounded-2xl border-none shadow-lg"
            align="start"
            sideOffset={10}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {subNavigation.type === "grouped" ? (
              <div className="py-10 px-20">
                <div className="flex items-start gap-10">
                  {subNavigation.items?.map((group, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <h1 className="text-base font-albert-sans font-bold mb-1">
                        {group.title}
                      </h1>
                      {group.items.map((item, index) => (
                        <Link
                          key={index}
                          href={item.url}
                          className="group relative font-albert-sans text-sm font-normal hover:text-gray-600 transition-colors flex items-center gap-2 py-1"
                        >
                          <span>{item.title}</span>
                          <ArrowRight className="h-3 w-3 transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-600 transition-all duration-300 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100" />
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-2">
                <ScrollArea className="h-90 w-full">
                  <div className="flex flex-col gap-1">
                    {subNavigation.items?.map((navigationItem, index) => (
                      <Link
                        key={index}
                        href={navigationItem.url}
                        className="group font-albert-sans text-base font-bold text-black hover:text-white hover:bg-black transition-colors px-4 py-2 rounded-lg"
                      >
                        {navigationItem.title}
                      </Link>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <Link
      href={url || "#"}
      className="hover:text-white text-base text-gray-300 transition-colors px-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatedText text={title} isHovered={isHovered} />
    </Link>
  );
}
