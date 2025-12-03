"use client";

import Link from "next/link";
import {
  Home,
  Grid3x3,
  Package,
  Search,
  User,
  ShoppingCart,
} from "lucide-react";
import { BottomNavItem } from "@/types/navigation";

interface BottomNavProps {
  items: BottomNavItem[];
  isVisible: boolean;
}

const iconMap = {
  Home,
  Grid3x3,
  Package,
  Search,
  User,
  ShoppingCart,
};

export default function BottomNav({ items, isVisible }: BottomNavProps) {
  return (
    <nav
      className={`sm:hidden font-inter fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="grid grid-cols-3 h-16">
        {items.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
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
  );
}
