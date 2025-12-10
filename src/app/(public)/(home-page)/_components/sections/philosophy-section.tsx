"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import Image from "@/components/global/image";
import Link from "next/link";

import type { PhilosophySection } from "@/types/strapi/components/home-page/philosophy-section";
import type { Category } from "@/types/strapi/models/category";

const sizeClassTemplate = [
  "md:size-36 size-20",
  "md:size-28 size-16",
  "md:size-24 size-12",
];

const cardClassPosition = {
  left: "-mr-4 md:mr-0",
  right: "-ml-4 md:ml-0",
};

function Card({
  category,
  position,
  className,
  style,
}: {
  category: Category;
  position: "left" | "right";
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        asChild
        className={`${position}-card ${cardClassPosition[position]} md:absolute left-1/2`}
        style={style}
      >
        <Link href={`/collections/${category.slug}`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category.thumbnail?.url}`}
            alt={category.name}
            className={cn(
              "bg-white object-cover max-w-20 max-h-20 md:max-h-none md:max-w-none rounded-full border-white border-6 shadow-lg",
              className
            )}
          />
        </Link>
      </TooltipTrigger>
      <TooltipContent className="font-albert-sans text-white">
        {category.name}
      </TooltipContent>
    </Tooltip>
  );
}

export default function PhilosophySection({
  data,
}: {
  data: PhilosophySection;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleBackgroundRef = useRef<HTMLDivElement>(null);
  const svgTextRef = useRef<SVGSVGElement>(null);
  const middle = useMemo(
    () => Math.floor((data.categories?.length || 0) / 2),
    [data.categories]
  );
  const leftCards = useMemo(
    () => data.categories?.slice(0, middle) || [],
    [data.categories, middle]
  );
  const rightCards = useMemo(
    () => data.categories?.slice(middle) || [],
    [data.categories, middle]
  );

  useGSAP(() => {
    const sectionSelector = gsap.utils.selector(sectionRef.current!);
    const leftCardElements = sectionSelector(".left-card");
    const rightCardElements = sectionSelector(".right-card");
    const longestLength = Math.max(
      sectionRef.current!.offsetHeight,
      sectionRef.current!.offsetWidth
    );
    const diagonalLength = Math.sqrt(longestLength ** 2 + longestLength ** 2);
    const circleRadius = circleBackgroundRef.current!.clientHeight / 2;

    gsap.set(circleBackgroundRef.current!, {
      scale: Math.floor(diagonalLength / circleRadius),
    });

    gsap.to(svgTextRef.current!, {
      rotation: 360,
      duration: 10,
      ease: "linear",
      repeat: -1,
    });

    const media = gsap.matchMedia();
    media.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: "top top",
        end: "bottom top",
        pin: true,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top center",
          scrub: true,
        },
      });

      timeline.to(circleBackgroundRef.current!, {
        scale: 1,
        ease: "power2.inOut",
        duration: 0.8,
      });

      const cardTimeline = gsap.timeline();
      let elementCounter = 0;
      leftCardElements.forEach((card, i) => {
        gsap.set(card, { translateX: "-50%" });

        cardTimeline.to(
          card,
          {
            xPercent: (leftCardElements.length - i) * -100 + 10,
            duration: 1,
            ease: "power2.inOut",
            transformOrigin: "center",
          },
          elementCounter && "<"
        );

        elementCounter++;
      });

      rightCardElements.forEach((card, i) => {
        gsap.set(card, { translateX: "-50%" });

        cardTimeline.to(
          card,
          {
            xPercent: (i + 1) * 100 - 10,
            duration: 1,
            ease: "power2.inOut",
            transformOrigin: "center",
          },
          elementCounter && "<"
        );

        elementCounter++;
      });

      timeline.add(cardTimeline);
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-10 flex flex-col items-center lg:justify-start justify-center bg-[#FF8BC6] md:bg-white font-albert-sans py-12 md:min-h-screen overflow-hidden relative"
    >
      <h3 className="text-2xl md:text-3xl font-semibold md:font-bold text-center max-w-5xl w-full mb-5 xl:text-5xl relative z-40 md:z-1000">
        {data.description}
      </h3>

      <div className="flex items-center justify-center md:absolute md:bottom-5 md:left-0 md:w-full">
        {leftCards.slice(0, 3).map((card, index) => (
          <Card
            key={card.id}
            category={card}
            position="left"
            className={sizeClassTemplate[leftCards.length - (index + 1)]}
            style={{
              zIndex: index * 10,
            }}
          />
        ))}
        <div className="size-28 md:size-44 flex items-center justify-center relative rounded-full">
          <svg
            ref={svgTextRef}
            className="absolute w-full h-full z-40 md:z-1000"
            viewBox="0 0 300 300"
          >
            <defs>
              <path
                id="circlePath"
                d="M 150,150 m -120,0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"
              />
            </defs>
            <circle
              cx="150"
              cy="150"
              r="120"
              fill="none"
              stroke="#fff"
              strokeWidth="40"
            />
            <circle
              cx="150"
              cy="150"
              r="100"
              fill="none"
              stroke="#e5e5e5"
              strokeWidth="1"
            />
            <circle
              cx="150"
              cy="150"
              r="140"
              fill="none"
              stroke="#e5e5e5"
              strokeWidth="1"
            />
            <text
              fill="#000000"
              fontSize="20"
              letterSpacing="10"
              fontWeight="800"
            >
              <textPath xlinkHref="#circlePath" startOffset="0%">
                {data.ctaText}
              </textPath>
            </text>
          </svg>
          <div
            ref={circleBackgroundRef}
            className="hidden md:block absolute size-full bg-[#FF8BC6] rounded-full scale-110 will-change-transform z-900"
          ></div>
        </div>
        {rightCards.slice(0, 3).map((card, index) => (
          <Card
            key={card.id}
            category={card}
            position="right"
            className={sizeClassTemplate[index]}
            style={{
              zIndex: (rightCards.length - index) * 10,
            }}
          />
        ))}
      </div>
    </section>
  );
}
