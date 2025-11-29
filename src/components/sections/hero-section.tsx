"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";

const collections = [
  { label: "Men Collections", img: "/men.jpg" },
  { label: "Women Collections", img: "/woman.jpg" },
  { label: "Popular Collections", img: "/popular.jpg" },
];

function NextSection({
  ref,
  timeline,
}: {
  ref: React.RefObject<HTMLElement>;
  timeline: React.RefObject<gsap.core.Timeline>;
}) {
  const collectionsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const buttons = gsap.utils.selector(collectionsRef.current!)("button");

    if (!timeline.current) return;

    timeline.current.fromTo(
      collectionsRef.current!,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: collectionsRef.current!,
        start: "top bottom",
      },
    });

    buttons.forEach((button) =>
      tl.fromTo(
        button,
        {
          y: 20,
        },
        {
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      )
    );
  }, []);

  return (
    <section
      ref={ref}
      className="relative z-20 min-h-[150vh] w-full flex flex-col items-center justify-center text-center"
      style={{
        background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0.8) 10%,
            rgba(0,0,0,1) 18%,
            rgba(0,0,0,1) 100%
            )`,
      }}
    >
      <h2 className="text-white text-4xl font-bold leading-relaxed max-w-5xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        fringilla libero a turpis viverra vehicula. Sed ac pellentesque ligula,
        ac pharetra justo. Donec ut erat vitae tortor accumsan convallis. Aenean
        ornare commodo purus sed semper. Sed fermentum et mi ac condimentum.
        Etiam sed sagittis ex, in imperdiet urna
      </h2>

      <div
        ref={collectionsRef}
        className="flex flex-wrap justify-center gap-6 mt-12"
      >
        {collections.map((item, i) => (
          <Button
            key={i}
            className="relative button-collections h-auto! bg-white border border-white/20 rounded-full backdrop-blur-md hover:bg-white/80 transition-all"
          >
            <img src={item.img} className="size-8 rounded-full object-cover" />
            <span className="text-black text-lg font-medium">{item.label}</span>
          </Button>
        ))}
      </div>
    </section>
  );
}

export default function HeroSection() {
  const bigTextRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLElement>(null);
  const mainSectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: mainSectionRef.current!,
      start: "top top",
      pin: true,
      pinSpacing: false,
      animation: gsap.to(bigTextRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "none",
      }),
    });

    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: nextSectionRef.current!,
        start: "top bottom",
        end: "top top",
      },
    });

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
        duration: 1,
      }
    );
  }, []);

  return (
    <>
      <section
        ref={mainSectionRef}
        className="relative min-h-screen overflow-hidden font-rubik flex items-center"
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source
            src="/assets/video/The 1975 - About You.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative ms-6">
          <h1 className="text-white text-5xl font-medium leading-none">
            TIMELESS FASHION <br /> ESSENCE
          </h1>

          <p className="mt-6 text-white/90 max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            fringilla libero a turpis viverra vehicula.
          </p>

          <div className="mt-10 flex gap-2">
            <Button className="size-14! bg-white text-black rounded-full">
              <ArrowUpRight />
            </Button>
            <Button className="h-14! px-8 bg-white text-black rounded-full">
              EXPLORE NOW
            </Button>
          </div>
        </div>

        <div
          ref={bigTextRef}
          className="font-inter absolute inline-flex bottom-8 left-0 pointer-events-none z-30 text-white text-8xl whitespace-nowrap"
        >
          <p className="w-[260%]">
            LOREM • IPSUM • DOLOR • SIT • AMET • LOREM • IPSUM • DOLOR •
          </p>
          <p className="w-[260%]">
            LOREM • IPSUM • DOLOR • SIT • AMET • LOREM • IPSUM • DOLOR •
          </p>
        </div>
      </section>

      <NextSection
        ref={nextSectionRef as React.RefObject<HTMLElement>}
        timeline={timelineRef as React.RefObject<gsap.core.Timeline>}
      />
    </>
  );
}
