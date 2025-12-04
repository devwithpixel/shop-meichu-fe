"use client";

import { useGSAP } from "@gsap/react";
import { useMemo, useRef } from "react";
import gsap from "gsap";

import type { RunningText } from "@/types/strapi/components/shared/running-text";

interface FooterRunningTextProps {
  data: RunningText;
  fadeColor?: string;
}

export default function FooterRunningText({
  data,
  fadeColor,
}: FooterRunningTextProps) {
  const footerRunningTextRef = useRef<HTMLDivElement>(null);
  const color = fadeColor || "#1C1C1C";

  useGSAP(() => {
    gsap.to(footerRunningTextRef.current, {
      xPercent: -100,
      repeat: -1,
      ease: "none",
      duration: 22,
    });
  });

  const leftFade = useMemo(
    () => ({
      background: `linear-gradient(to right, ${fadeColor} ?? bg-carbon, transparent)`,
    }),
    [color]
  );

  const rightFade = useMemo(
    () => ({
      background: `linear-gradient(to left, ${fadeColor}, transparent)`,
    }),
    [color]
  );

  return (
    <div className="relative w-full overflow-hidden mb-16">
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-24 z-20"
        style={leftFade}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-24 z-20"
        style={rightFade}
      />

      <div
        ref={footerRunningTextRef}
        className="flex whitespace-nowrap font-jogging"
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
