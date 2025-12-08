"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import Image from "@/components/global/image";
import SubHeroSection from "./sub-hero-section";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
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
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
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

      if (data.runningText && timelineRef.current) {
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
      }
    } else {
      if (data.runningText && bigTextRef.current) {
        gsap.to(bigTextRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 25,
          ease: "none",
        });
      }
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [data.runningText]);

  return (
    <>
      <section
        ref={mainSectionRef}
        className="relative min-h-screen overflow-hidden font-albert-sans flex items-center"
      >
        {data.background.mime.startsWith("video/") ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
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

        <div className="relative ms-4 md:ms-14">
          <h1 className="text-white text-5xl md:text-6xl font-bold max-w-2xl leading-none">
            {data.section.title}
          </h1>

          {data.section.description && (
            <p className="mt-6 text-white/90 max-w-xs md:max-w-xl">
              {data.section.description}
            </p>
          )}

          <Link
            href="/collections"
            className="flex items-center gap-0.5 cursor-pointer group mt-12 w-fit"
          >
            <HiOutlineArrowUpRight className="w-10 h-10 z-1 sm:z-0 sm:w-14 sm:h-14 text-white sm:text-black bg-black sm:bg-white border border-black rounded-full p-3 sm:p-4 sm:transition-all sm:duration-300 -mr-11.5 sm:mr-0 sm:group-hover:-mr-14.5 sm:group-hover:bg-black sm:group-hover:text-white sm:group-hover:scale-90" />
            <p className="bg-white px-4 sm:px-8 py-2.5 sm:py-4 border border-black rounded-full whitespace-nowrap pl-14 sm:pl-8 sm:transition-all sm:duration-300 sm:group-hover:pl-22.5 font-medium">
              Explore More
            </p>
          </Link>
        </div>

        {data.runningText && (
          <div
            ref={bigTextRef}
            className="font-jogging absolute inline-flex bottom-8 left-0 pointer-events-none z-30 text-white text-8xl whitespace-nowrap"
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
