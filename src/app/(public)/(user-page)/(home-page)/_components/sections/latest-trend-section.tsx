"use client";

import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import Image from "@/components/global/image";

import type { LatestTrendSection } from "@/types/strapi/components/home-page/latest-trend-section";
import IconElement from "@/components/ui/icon-element";
import Link from "next/link";

export default function LatestTrendSection({
  data,
}: {
  data: LatestTrendSection;
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const leftImageRef = useRef<HTMLImageElement | null>(null);
  const rightImageRef = useRef<HTMLImageElement | null>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (window.innerWidth <= 768) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      gsap.set(leftImageRef.current!, { x: 300 });
      gsap.set(rightImageRef.current!, { x: -300 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 60%",
        scrub: 1,
        toggleActions: "play reverse play reverse",
        animation: gsap.to(leftImageRef.current!, {
          x: -60,
          duration: 0.8,
          ease: "sine.out",
        }),
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 60%",
        scrub: 1,
        toggleActions: "play reverse play reverse",
        animation: gsap.to(rightImageRef.current!, {
          x: 60,
          duration: 0.8,
          ease: "sine.out",
        }),
      });
    });

    mm.add("(min-width: 1024px)", () => {
      gsap.set(leftImageRef.current!, { x: 400 });
      gsap.set(rightImageRef.current!, { x: -400 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 60%",
        scrub: 1,
        toggleActions: "play reverse play reverse",
        animation: gsap.to(leftImageRef.current!, {
          x: -60,
          duration: 0.8,
          ease: "sine.out",
        }),
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 60%",
        scrub: 1,
        toggleActions: "play reverse play reverse",
        animation: gsap.to(rightImageRef.current!, {
          x: 60,
          duration: 0.8,
          ease: "sine.out",
        }),
      });
    });
  }, []);

  return (
    <div className="relative">
      <IconElement variant={2} />
      <div
        ref={sectionRef}
        className="bg-[#D9E4E8] grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-0 md:gap-1.5 h-fit py-10 md:py-26 items-center md:items-start lg:items-center justify-center"
      >
        <div ref={leftImageRef} className="px-3 md:px-0 md:pl-3">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${data.leftImage?.url}`}
            className="h-86 md:h-76 lg:h-106 w-full object-cover rounded-2xl md:rounded-[3rem]"
            alt=""
          />
        </div>
        <div className="font-albert-sans h-86 md:h-86 lg:h-106 flex flex-col items-center justify-center text-center space-y-4">
          <h1 className="font-bold text-3xl md:text-4xl px-6">
            {data.section.title}
          </h1>
          <p className="px-6 text-xs lg:text-sm">{data.section.description}</p>
          <Link
            href="/collections"
            className="flex items-center gap-0.5 cursor-pointer group"
          >
            <HiOutlineArrowUpRight className="w-10 h-10 z-1 lg:z-0 lg:w-14 lg:h-14 text-black lg:text-white bg-white lg:bg-black border border-black rounded-full p-3 lg:p-4 lg:transition-all lg:duration-300 -mr-11.5 lg:mr-0 lg:group-hover:-mr-14.5 lg:group-hover:bg-white lg:group-hover:text-black lg:group-hover:scale-90" />
            <p className="bg-black text-white px-4 lg:px-8 py-2.5 lg:py-4 border border-black rounded-full whitespace-nowrap pl-14 lg:pl-8 lg:transition-all lg:duration-300 lg:group-hover:pl-22.5">
              {data.ctaButton?.title}
            </p>
          </Link>
        </div>
        <div ref={rightImageRef} className="px-3 md:px-0 pr-3 items-stretch">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${data.rightImage?.url}`}
            className="h-86 md:h-76 lg:h-106 w-full object-cover rounded-2xl md:rounded-[3rem]"
          />
        </div>
      </div>
    </div>
  );
}
