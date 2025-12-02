"use client";

import NavLink from "./nav-link";
import { NavLink as NavLinkType } from "@/types/navigation";

interface DesktopNavProps {
  navLinks: NavLinkType[];
}

export default function DesktopNav({ navLinks }: DesktopNavProps) {
  return (
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
  );
}
