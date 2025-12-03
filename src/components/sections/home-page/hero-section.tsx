"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import Image from "@/components/global/image";
import SubHeroSection from "@/components/sections/home-page/sub-hero-section";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";

import type { HeroSection } from "@/types/strapi/components/home-page/hero-section";
import type { SubHeroSection as SubHeroSectionType } from "@/types/strapi/components/home-page/sub-hero-section";

export default function HeroSection({
  data,
  subHeroData,
}: {
  data: HeroSection;
  subHeroData: SubHeroSectionType;
}) {
  const bigTextRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLElement>(null);
  const mainSectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>(null);

  useGSAP(() => {
    const textAnimation = bigTextRef.current
      ? gsap.to(bigTextRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 20,
          ease: "none",
        })
      : undefined;

    ScrollTrigger.create({
      trigger: mainSectionRef.current!,
      start: "top top",
      pin: true,
      pinSpacing: false,
      animation: textAnimation,
    });

    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: nextSectionRef.current!,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    if (data.runningText)
      timelineRef.current.fromTo(
        bigTextRef.current,
        {
          xPercent: 0,
          y: 0,
        },
        {
          xPercent: -100,
          y: `-${mainSectionRef.current!.offsetHeight}px`,
          ease: "none",
          duration: 10,
        }
      );
  }, []);

  return (
    <>
      <section
        ref={mainSectionRef}
        className="relative min-h-screen overflow-hidden font-rubik flex items-center"
      >
        {data.background.mime.startsWith("video/") ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
          >
            <source
              src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${data.background.url}`}
              type={data.background.mime}
            />
          </video>
        ) : (
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${data.background.url}`}
            alt="Background image for hero section"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative ms-6">
          <h1 className="text-white text-5xl font-medium leading-none">
            {data.section.title}
          </h1>

          {data.section.description && (
            <p className="mt-6 text-white/90 max-w-xl">
              {data.section.description}
            </p>
          )}

          <div className="flex items-center gap-0.5 cursor-pointer group mt-4">
            <HiOutlineArrowUpRight className="w-10 h-10 z-1 sm:z-0 sm:w-14 sm:h-14 text-white sm:text-black bg-black sm:bg-white border border-black rounded-full p-3 sm:p-4 sm:transition-all sm:duration-300 -mr-11.5 sm:mr-0 sm:group-hover:-mr-14.5 sm:group-hover:bg-black sm:group-hover:text-white sm:group-hover:scale-90" />
            <p className="bg-white px-4 sm:px-8 py-2.5 sm:py-4 border border-black rounded-full whitespace-nowrap pl-14 sm:pl-8 sm:transition-all sm:duration-300 sm:group-hover:pl-22.5">
              Explore More
            </p>
          </div>
        </div>

        {data.runningText && (
          <div
            ref={bigTextRef}
            className="font-inter absolute inline-flex bottom-8 left-0 pointer-events-none z-30 text-white text-8xl whitespace-nowrap"
          >
            <p className="w-[260%]">{data.runningText}</p>
            <p className="w-[260%]">{data.runningText}</p>
          </div>
        )}
      </section>

      <SubHeroSection
        ref={nextSectionRef as React.RefObject<HTMLElement>}
        data={subHeroData}
      />
    </>
  );
}
