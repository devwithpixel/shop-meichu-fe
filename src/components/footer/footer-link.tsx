"use client";
import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

interface FooterLinkProps {
  href: string;
  title: string;
  icon?: boolean;
}

export function FooterLink({ href, title, icon = false }: FooterLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="block overflow-hidden h-6"
    >
      <div
        className={`transition-transform duration-300 ${
          isHovered ? "-translate-y-6" : "translate-y-0"
        }`}
      >
        <div className="h-6 flex items-center gap-2">
          {title}
          {icon && <FiArrowUpRight className="w-5 h-5" />}
        </div>
        <div className="h-6 flex items-center gap-2">
          {title}
          {icon && <FiArrowUpRight className="w-5 h-5" />}
        </div>
      </div>
    </Link>
  );
}
