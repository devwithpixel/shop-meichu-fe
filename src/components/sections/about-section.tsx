"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Image from "@/components/global/image";

interface CardProps {
  id: number;
  sizeClass: string;
  image: string;
  title: string;
}

const leftCards: CardProps[] = [
  {
    id: 1,
    sizeClass: "size-12 md:size-28",
    image: "/assets/image/my.png",
    title: "Elektronik",
  },
  {
    id: 2,
    sizeClass: "size-20 md:size-36",
    image: "/assets/image/my.png",
    title: "Smartwatch",
  },
];
const rightCards: CardProps[] = [
  {
    id: 1,
    sizeClass: "size-20 md:size-36",
    image: "/assets/image/my.png",
    title: "Kebutuhan Rumah Tangga",
  },
  {
    id: 2,
    sizeClass: "size-12 md:size-28",
    image: "/assets/image/my.png",
    title: "Tiket Pesawat",
  },
];

export default function AboutSection() {
  "use no memo";
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleBackgroundRef = useRef<HTMLDivElement>(null);
  const svgTextRef = useRef<SVGSVGElement>(null);

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
      className="px-6 md:px-10 flex flex-col items-center lg:justify-start justify-center bg-[#C8F51D] md:bg-white font-rubik py-12 md:min-h-screen overflow-hidden relative"
    >
      <h3 className="text-2xl md:text-3xl font-semibold md:font-medium text-center max-w-5xl w-full mb-5 xl:text-5xl relative z-1000">
        MAYA BLENDS TIMELESS ELEGANCE WITH MODERN TRENDS, CRAFTING FASHION THAT
        EMPOWERS CONFIDENCE AND GRACE. WITH PREMIUM FABRICS AND UNIQUE DESIGNS,
        WE CREATE STYLES THAT REDEFINE BEAUTY, ENSURING YOU SHINE EFFORTLESSLY
        IN EVERY MOMENT.
      </h3>

      <div className="flex items-center justify-center md:absolute md:bottom-5 md:left-0 md:w-full">
        {leftCards.map((card, index) => (
          <Tooltip key={card.id}>
            <TooltipTrigger
              asChild
              className="left-card -mr-4 md:mr-0 md:absolute left-1/2"
            >
              <Image
                src={card.image}
                className={`object-cover ${card.sizeClass} rounded-full border-white border-6 shadow-md z-${index * 10}`}
              />
            </TooltipTrigger>
            <TooltipContent className="font-rubik text-white">
              {card.title}
            </TooltipContent>
          </Tooltip>
        ))}
        <div className="size-28 md:size-44 flex items-center justify-center relative rounded-full">
          <svg
            ref={svgTextRef}
            className="absolute w-full h-full z-1000"
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
            <text fill="#000" fontSize="17" letterSpacing="5" fontWeight="500">
              <textPath xlinkHref="#circlePath" startOffset="0%">
                PREMIUM DESIGN • ELEVATED EXPERIENCE • PREMIUM DESIGN •
              </textPath>
            </text>
          </svg>
          <div
            ref={circleBackgroundRef}
            className="hidden md:block absolute size-full bg-[#C8F51D] rounded-full scale-110 will-change-transform z-900"
          ></div>
        </div>
        {rightCards.map((card, index) => (
          <Tooltip key={card.id}>
            <TooltipTrigger
              asChild
              className="right-card -ml-4 md:ml-0 md:absolute md:left-1/2"
            >
              <Image
                src={card.image}
                className={`object-cover ${card.sizeClass} rounded-full border-white border-6 shadow-md z-${(rightCards.length - index) * 10}`}
              />
            </TooltipTrigger>
            <TooltipContent className="font-rubik text-white">
              {card.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </section>
  );
}
