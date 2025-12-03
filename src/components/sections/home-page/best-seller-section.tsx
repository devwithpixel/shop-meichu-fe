"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoIosArrowRoundUp } from "react-icons/io";
import Image from "@/components/global/image";

import type { BestSellerSection } from "@/types/strapi/components/home-page/best-seller-section";

export default function BestSellerSection({
  data,
}: {
  data: BestSellerSection;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const spacer = spacerRef.current;
    if (!section || !video || !spacer) return;

    const mm = gsap.matchMedia();

    gsap.to(".running-left", {
      xPercent: -100,
      repeat: -1,
      ease: "none",
      duration: 22,
    });

    gsap.to(".running-right", {
      xPercent: 100,
      repeat: -1,
      ease: "none",
      duration: 20,
    });

    mm.add("(max-width: 767px)", () => {
      video.play();
      gsap.set(".arrow-btn", { opacity: 1, scale: 1 });
      gsap.set(spacer, { height: 0 });
    });

    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      gsap.set(".arrow-btn", { opacity: 0, scale: 0 });
      gsap.set(".running-wrapper", { y: 1200 });

      gsap.set(spacer, { height: "100vh" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: section,
          pinSpacing: false,
          scrub: 1,
          onEnter: () => video.play(),
        },
      });

      tl.to(".videoContainer", {
        scale: 0.7,
        rotation: -3,
        duration: 1,
      })
        .to(
          ".arrow-btn",
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
          },
          "-=1"
        )
        .to(
          ".running-wrapper",
          {
            y: 350,
            duration: 0.7,
          },
          "-=1"
        );
    });

    mm.add("(min-width: 1024px)", () => {
      gsap.set(".arrow-btn", { opacity: 0, scale: 0 });
      gsap.set(".running-wrapper", { y: 700 });

      gsap.set(spacer, { height: "100vh" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: section,
          pinSpacing: false,
          scrub: 1,
          onEnter: () => video.play(),
        },
      });

      tl.to(".videoContainer", {
        scale: 0.6,
        rotation: -5,
        duration: 1,
      })
        .to(
          ".arrow-btn",
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
          },
          "-=1"
        )
        .to(
          ".running-wrapper",
          {
            y: 80,
            duration: 0.7,
          },
          "-=1"
        );
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <div
        ref={sectionRef}
        className="relative w-screen h-screen bg-black overflow-hidden"
      >
        <div className="md:absolute inset-0 px-4 pt-20 flex pointer-events-none z-20">
          <div className="w-full md:w-1/2 space-y-4 mt-0 md:mt-10 lg:mt-0">
            <h1 className="text-white font-rubik text-4xl md:text-5xl font-semibold">
              {data.section.title}
            </h1>
            <p className="text-white font-inter text-xs">
              {data.section.description}
            </p>
          </div>
        </div>
        <div className="videoContainer relative md:h-screen lg:w-full lg:h-full md:z-10 flex justify-center items-start md:items-center mt-8 md:mt-0">
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="w-9/11 md:w-3/4 h-120 md:h-196 lg:h-206 bg-lime-500/20 blur-3xl rounded-full"></div>
          </div>
          <div className="relative flex justify-center items-center lg:static lg:block">
            {data.media.mime.startsWith("video/") ? (
              <video
                ref={videoRef}
                className="relative z-10 w-full h-96 md:w-full md:h-110 lg:absolute lg:inset-0 lg:w-full lg:h-full px-4 md:px-0 object-cover"
                loop
                muted
                playsInline
                controls
              >
                <source
                  src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${data.media.url}`}
                  type={data.media.mime}
                />
              </video>
            ) : (
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${data.media.url}`}
                alt={data.media.name}
                className="relative z-10 w-full h-96 md:w-full md:h-110 lg:absolute lg:inset-0 lg:w-full lg:h-full px-4 md:px-0 object-cover"
              />
            )}
            <button className="arrow-btn absolute -bottom-8 md:-right-8 lg:-right-12 bg-black rounded-full p-4 md:p-6 lg:p-8 border border-white pointer-events-auto hover:scale-110 transition-transform z-20">
              <IoIosArrowRoundUp className="text-white rotate-45 w-6 h-6 md:w-10 md:h-10 lg:w-14 lg:h-14" />
            </button>
          </div>
        </div>
        <div className="running-wrapper absolute top-150 md:top-0 md:left-0 w-full h-full md:overflow-hidden z-0 pointer-events-none space-y-1 md:space-y-2 lg:space-y-6 pt-16">
          <div className="row -rotate-5">
            <div className="running-right flex flex-row-reverse text-nowrap">
              <p className="text-4xl md:text-7xl lg:text-9xl font-bold font-inter text-transparent text-outline-white">
                Stay Cozy, Stay Stylish, Winter Collection,
              </p>
              <p className="text-4xl md:text-7xl lg:text-9xl font-bold font-inter text-transparent text-outline-white">
                Stay Cozy, Stay Stylish, Winter Collection,
              </p>
            </div>
          </div>

          <div className="row -rotate-5">
            <div className="running-left flex text-nowrap">
              <p className="text-4xl md:text-7xl lg:text-9xl font-bold font-inter text-white">
                Stay Cozy, Stay Stylish, Winter Collection,
              </p>
              <p className="text-4xl md:text-7xl lg:text-9xl font-bold font-inter text-white">
                Stay Cozy, Stay Stylish, Winter Collection,
              </p>
            </div>
          </div>

          <div className="row -rotate-5">
            <div className="running-right flex flex-row-reverse text-nowrap">
              <p className="text-4xl md:text-7xl lg:text-9xl font-bold font-inter text-transparent text-outline-white">
                Stay Cozy, Stay Stylish, Winter Collection,
              </p>
              <p className="text-4xl md:text-7xl lg:text-9xl font-bold font-inter text-transparent text-outline-white">
                Stay Cozy, Stay Stylish, Winter Collection,
              </p>
            </div>
          </div>
        </div>
      </div>
      <div ref={spacerRef} className="w-full bg-transparent"></div>
    </>
  );
}
