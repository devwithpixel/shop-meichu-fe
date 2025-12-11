"use client";

import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
  MarqueeEdge,
} from "@/components/ui/marquee";

import type { RunningText } from "@/types/strapi/components/shared/running-text";

interface FooterRunningTextProps {
  data: RunningText;
  fadeColor?: string;
}

export default function FooterRunningText({
  data,
  fadeColor,
}: FooterRunningTextProps) {
  const defaultColor = "#1C1C1C";
  const bgColor = fadeColor || defaultColor;

  const textItems = [
    { text: data.firstText, outlined: false },
    ...(data.secondText ? [{ text: data.secondText, outlined: true }] : []),
  ];

  return (
    <div className="relative w-full mb-16">
      <Marquee speed={100}>
        <MarqueeContent className="pb-4">
          {[...Array(4)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex font-jogging">
              {textItems.map((item, index) => (
                <MarqueeItem key={`${groupIndex}-${index}`} asChild>
                  <p
                    className={`text-7xl md:text-8xl font-medium ${
                      item.outlined ? "text-transparent text-outline-white" : ""
                    }`}
                  >
                    {item.text}&nbsp;
                  </p>
                </MarqueeItem>
              ))}
            </div>
          ))}
        </MarqueeContent>
        <MarqueeEdge
          side="left"
          style={{
            background: `linear-gradient(to right, ${bgColor}, transparent)`,
          }}
        />
        <MarqueeEdge
          side="right"
          style={{
            background: `linear-gradient(to left, ${bgColor}, transparent)`,
          }}
        />
      </Marquee>
    </div>
  );
}
