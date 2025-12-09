"use client";

import { Separator } from "@/components/ui/separator";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

import type { Product } from "@/types/strapi/models/product";

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
      containerClass: "top-60 left-8 md:top-70 md:left-25 lg:top-55 lg:left-30",
      flexDirection: "flex-row",
      separatorClass: "md:w-25 lg:w-60",
      separatorOrigin: "right center",
    },
    {
      containerClass:
        "top-60 right-8 md:top-60 md:right-25 lg:top-50 lg:right-30",
      flexDirection: "flex-row-reverse",
      separatorClass: "md:w-25 lg:w-60",
      separatorOrigin: "left center",
    },
    {
      containerClass:
        "bottom-25 left-8 md:bottom-40 md:left-25 lg:bottom-25 lg:left-30",
      flexDirection: "flex-row",
      separatorClass: "md:w-25 lg:w-60",
      separatorOrigin: "right center",
    },
    {
      containerClass:
        "bottom-25 right-8 md:bottom-50 md:right-25 lg:bottom-30 lg:right-30",
      flexDirection: "flex-row-reverse",
      separatorClass: "md:w-25 lg:w-60",
      separatorOrigin: "left center",
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
        pinSpacing: "margin",
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

  return (
    <div
      ref={ref}
      className="text-white bg-red-500 min-h-screen flex flex-col items-center justify-center space-y-12 relative px-4 md:px-4"
      // style={{ backgroundColor: product.backgroundColor || "#000000" }}
    >
      <h1 className="font-rubik text-4xl md:text-5xl lg:text-7xl font-bold text-center z-10">
        Product Highlights
      </h1>

      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-9/11 md:w-130 h-96 md:h-70 bg-white/90 blur-3xl rounded-xs md:rounded-full lg:rounded-xs"></div>
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
                      className="w-30 h-30 lg:w-40 lg:h-40 object-cover bg-gray-400 rounded-lg border border-black"
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
                  <div data-feature={index} className="max-w-full md:max-w-70">
                    <img
                      data-feature-img={index}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${image.url}`}
                      className="w-30 h-30 lg:w-40 lg:h-40 object-cover bg-gray-400 rounded-lg border border-black"
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
          className="bg-gray-400 w-60 h-60 md:w-76 md:h-76 lg:w-124 lg:h-124 object-cover rounded-3xl"
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
