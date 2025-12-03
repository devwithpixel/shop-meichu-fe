"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

import type { RunningText } from "@/types/strapi/components/shared/running-text";

export default function FooterRunningText({ data }: { data: RunningText }) {
  const footerRunningTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(footerRunningTextRef.current, {
      xPercent: -100,
      repeat: -1,
      ease: "none",
      duration: 22,
    });
  });

  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-linear-to-r from-carbon to-transparent z-20" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-linear-to-l from-carbon to-transparent z-20" />

      <div
        ref={footerRunningTextRef}
        className="flex whitespace-nowrap font-rubik pt-5"
      >
        <p className="text-7xl md:text-8xl font-medium">
          {data.firstText} &nbsp;
        </p>

        {data.secondText && (
          <p className="text-7xl md:text-8xl font-medium text-transparent text-outline-white">
            {data.secondText} &nbsp;
          </p>
        )}

        <p className="text-7xl md:text-8xl font-medium">
          {data.firstText} &nbsp;
        </p>
        {data.secondText && (
          <p className="text-7xl md:text-8xl font-medium text-transparent text-outline-white">
            {data.secondText} &nbsp;
          </p>
        )}
      </div>
    </div>
  );
}
