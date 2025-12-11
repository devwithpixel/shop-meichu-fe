"use client";

import { Separator } from "@/components/ui/separator";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

import type { Product } from "@/types/strapi/models/product";
import { useMemo } from "react";

export default function SpecificationsSection({
  ref,
  product,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
  product: Product;
}) {
  const featureImages = product.images?.slice(1, 5) || [];

  const positions = [
    {
      containerClass:
        "top-60 left-8 md:top-105 md:left-25 lg:top-45 lg:left-40",
      flexDirection: "flex-row",
      separatorClass: "",
      separatorOrigin: "right center",
      imageSize: "w-24 h-24 md:w-26 md:h-26 lg:w-30 lg:w-30",
    },
    {
      containerClass:
        "top-60 right-8 md:top-110 md:right-25 lg:top-50 lg:right-40",
      flexDirection: "flex-row-reverse",
      separatorClass: "",
      separatorOrigin: "left center",
      imageSize: "w-24 h-24 md:w-26 md:h-26 lg:w-30 lg:w-30",
    },
    {
      containerClass:
        "bottom-25 left-8 md:bottom-90 md:left-25 lg:bottom-40 lg:left-30",
      flexDirection: "flex-row",
      separatorClass: "md:w-25 lg:w-60",
      separatorOrigin: "right center",
      imageSize: "w-30 h-30 lg:w-40 lg:h-40",
    },
    {
      containerClass:
        "bottom-25 right-8 md:bottom-85 md:right-25 lg:bottom-30 lg:right-30",
      flexDirection: "flex-row-reverse",
      separatorClass: "md:w-25 lg:w-60",
      separatorOrigin: "left center",
      imageSize: "w-30 h-30 lg:w-40 lg:h-40",
    },
  ];

  useGSAP(() => {
    if (window.innerWidth < 768) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: 1,
      },
    });

    featureImages.forEach((_, index) => {
      timeline
        .fromTo(
          `[data-separator="${index}"]`,
          {
            scaleX: 0,
            transformOrigin: positions[index].separatorOrigin,
          },
          { scaleX: 1, duration: 0.8 }
        )
        .fromTo(
          `[data-feature="${index}"]`,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.4"
        )
        .fromTo(
          `[data-feature-img="${index}"]`,
          { scale: 0.5 },
          { scale: 1, duration: 0.4 },
          "-=0.4"
        );
    });

    return () => {
      timeline.kill();
    };
  }, [featureImages.length]);

  // const background = useMemo(
  //   () => ({
  //     backgroundColor: product.backgroundColor || "#1C1C1C",
  //   }),
  //   [product.backgroundColor]
  // );

  return (
    <div
      ref={ref}
      className="text-white min-h-screen flex flex-col items-center justify-center space-y-8 relative px-4 md:px-4"
      style={{ backgroundColor: product.backgroundColor || "#1C1C1C" }}
    >
      <h1 className="font-rubik text-4xl md:text-5xl lg:text-7xl font-bold text-center z-10">
        Product Highlights
      </h1>

      <div className="absolute inset-0 flex items-center justify-center md:-mb-26 z-0">
        <div className="w-60 h-60 md:w-76 md:h-76 lg:w-124 lg:h-124 bg-white/90 blur-3xl rounded-xs md:rounded-full lg:rounded-xs"></div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        {featureImages.map((image, index) => {
          const position = positions[index];
          return (
            <div
              key={index}
              className={`absolute flex items-center justify-center ${position.containerClass} ${position.flexDirection} z-20`}
            >
              {position.flexDirection === "flex-row" && (
                <>
                  <div
                    data-feature={index}
                    className="flex flex-col items-start lg:items-center justify-center"
                  >
                    <img
                      data-feature-img={index}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${image.url}`}
                      className={`${position.imageSize} object-cover bg-gray-400 rounded-lg border border-black`}
                      alt=""
                    />
                  </div>
                  <div
                    data-separator={index}
                    className={`${position.separatorClass}`}
                  >
                    <Separator className="bg-white" />
                  </div>
                </>
              )}

              {position.flexDirection === "flex-row-reverse" && (
                <>
                  <div data-feature={index} className="max-w-full">
                    <img
                      data-feature-img={index}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${image.url}`}
                      className={`${position.imageSize} object-cover bg-gray-400 rounded-lg border border-black`}
                      alt=""
                    />
                  </div>
                  <div
                    data-separator={index}
                    className={`${position.separatorClass}`}
                  >
                    <Separator className="bg-white h-full" />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="z-10">
        <img
          src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.images?.[0]?.url}`}
          className="bg-gray-400 w-screen h-90 md:w-76 md:h-76 lg:w-124 lg:h-124 object-cover rounded-3xl"
          alt=""
        />
      </div>

      {/* Mobile */}
      <div className="md:hidden w-full overflow-x-auto scrollbar-hide z-10">
        <div className="flex gap-4 px-4 pb-4">
          {featureImages.map((image, index) => (
            <div key={index} className="shrink-0">
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${image.url}`}
                className="w-32 h-32 object-cover bg-gray-400 rounded-lg border border-white/20"
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
