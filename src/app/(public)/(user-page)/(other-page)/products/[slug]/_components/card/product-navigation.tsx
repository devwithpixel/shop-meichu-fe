"use client";

import { RefObject, ReactNode } from "react";

interface ProductSection {
  label: string;
  component: ReactNode;
}

interface ProductNavigationCardProps {
  sections: ProductSection[];
  activeSection: number;
  navRef: RefObject<HTMLElement | null>;
  indicatorRef: RefObject<HTMLDivElement | null>;
  buttonsRef: RefObject<(HTMLButtonElement | null)[]>;
  onSectionClick: (index: number) => void;
}

export default function ProductNavigationCard({
  sections,
  activeSection,
  navRef,
  indicatorRef,
  buttonsRef,
  onSectionClick,
}: ProductNavigationCardProps) {
  return (
    <nav
      ref={navRef}
      className="fixed bottom-8 left-1/2 md:left-6 lg:left-8 -translate-x-1/2 md:translate-x-6 lg:translate-x-8 backdrop-blur-md bg-white/60 rounded-full shadow-lg px-1 py-1 z-50"
    >
      <div className="relative flex gap-1">
        <div
          ref={indicatorRef}
          className="absolute h-full bg-black rounded-full"
        />

        {sections.map((section, index) => (
          <button
            key={index}
            ref={(el) => {
              if (buttonsRef.current) {
                buttonsRef.current[index] = el;
              }
            }}
            onClick={() => onSectionClick(index)}
            className={`relative z-10 px-5 lg:px-6 py-2.5 text-xs font-semibold rounded-full transition-colors ${
              activeSection === index ? "text-white" : "text-gray-800"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
