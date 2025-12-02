"use client";

import { HiOutlineArrowUpRight } from "react-icons/hi2";
import gsap from "gsap/all";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FashionHighlightsSection() {
  const sectionHighlights = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!sectionHighlights.current) return;
    if (window.innerWidth <= 768) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      gsap.set(".imgLeft", { x: 300 });
      gsap.set(".imgRight", { x: -300 });

      ScrollTrigger.create({
        trigger: sectionHighlights.current,
        start: "top 85%",
        end: "bottom 60%",
        scrub: 1,
        toggleActions: "play reverse play reverse",
        animation: gsap.to(".imgLeft", {
          x: -60,
          duration: 0.8,
          ease: "sine.out",
        }),
      });

      ScrollTrigger.create({
        trigger: sectionHighlights.current,
        start: "top 85%",
        end: "bottom 60%",
        scrub: 1,
        toggleActions: "play reverse play reverse",
        animation: gsap.to(".imgRight", {
          x: 60,
          duration: 0.8,
          ease: "sine.out",
        }),
      });
    });

    mm.add("(min-width: 1024px)", () => {
      gsap.set(".imgLeft", { x: 400 });
      gsap.set(".imgRight", { x: -400 });

      ScrollTrigger.create({
        trigger: sectionHighlights.current,
        start: "top 85%",
        end: "bottom 60%",
        scrub: 1,
        toggleActions: "play reverse play reverse",
        animation: gsap.to(".imgLeft", {
          x: -60,
          duration: 0.8,
          ease: "sine.out",
        }),
      });

      ScrollTrigger.create({
        trigger: sectionHighlights.current,
        start: "top 85%",
        end: "bottom 60%",
        scrub: 1,
        toggleActions: "play reverse play reverse",
        animation: gsap.to(".imgRight", {
          x: 60,
          duration: 0.8,
          ease: "sine.out",
        }),
      });
    });
  }, []);

  return (
    <div
      ref={sectionHighlights}
      className="bg-white grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-0 md:gap-1.5 h-fit py-10 md:py-26 items-center md:items-start lg:items-center justify-center"
    >
      <div className="imgLeft px-3 md:px-0 md:pl-3 ">
        <img
          src="/assets/gallery/girl3.jpg"
          className="h-86 md:h-76 lg:h-106 w-full object-cover rounded-2xl md:rounded-[3rem]"
          alt=""
        />
      </div>
      <div className="font-rubik h-86 md:h-86 lg:h-106 flex flex-col items-center justify-center text-center space-y-4">
        <h1 className="font-medium text-3xl md:text-4xl px-6">
          SHOP THE LATEST FASHION TRENDS
        </h1>
        <p className="px-6 text-xs lg:text-sm">
          There was something about you that now I can't remember It's the same
          damn thing that made my heart surrender And I'll miss you on a train
          I'll miss you in the morning I never know what to think about, so
          think about you (I think about you) About you
        </p>
        <div className="flex items-center gap-0.5 cursor-pointer group">
          <HiOutlineArrowUpRight className="w-10 h-10 z-1 lg:z-0 lg:w-14 lg:h-14 text-black lg:text-white bg-white lg:bg-black border border-black rounded-full p-3 lg:p-4 lg:transition-all lg:duration-300 -mr-11.5 lg:mr-0 lg:group-hover:-mr-14.5 lg:group-hover:bg-white lg:group-hover:text-black lg:group-hover:scale-90" />
          <p className="bg-black text-white px-4 lg:px-8 py-2.5 lg:py-4 border border-black rounded-full whitespace-nowrap pl-14 lg:pl-8 lg:transition-all lg:duration-300 lg:group-hover:pl-22.5">
            VIEW MORE
          </p>
        </div>
      </div>
      <div className="imgRight px-3 md:px-0 pr-3 items-stretch">
        <img
          src="/assets/gallery/girl4.jpg"
          className="h-86 md:h-76 lg:h-106 w-full object-cover rounded-2xl md:rounded-[3rem]"
          alt=""
        />
      </div>
    </div>
  );
}
