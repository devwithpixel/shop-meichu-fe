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
  useGSAP(() => {
    if (window.innerWidth < 768) return;

    gsap.set([".feature-1", ".feature-2"], { opacity: 0 });
    gsap.set(".separator-1", { scaleX: 0, transformOrigin: "right center" });
    gsap.set(".separator-2", { scaleX: 0, transformOrigin: "left center" });
    gsap.set(".feature-1-img", { scale: 0.5 });

    return gsap
      .timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=1500",
          pin: true,
          scrub: 1,
        },
      })
      .to(".separator-1", { scaleX: 1, duration: 1 })
      .to(".feature-1", { opacity: 1, duration: 0.5 }, "-=0.3")
      .to(".feature-1-img", { scale: 1, duration: 0.5 }, "-=0.3")
      .to(".separator-2", { scaleX: 1, duration: 1 }, "+=0.2")
      .to(".feature-2", { opacity: 1, duration: 0.5 }, "-=0.3");
  }, []);

  return (
    <div
      ref={ref}
      className="bg-black text-white min-h-screen flex flex-col items-center justify-center space-y-12 relative px-4"
    >
      <h1 className="font-rubik text-4xl md:text-5xl lg:text-7xl font-bold text-center z-10">
        Product Highlights
      </h1>

      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-9/11 md:w-130 h-96 md:h-70 bg-white/90 blur-3xl rounded-xs md:rounded-full lg:rounded-xs"></div>
      </div>

      <div className="absolute flex items-center justify-center top-60 left-8 md:bottom-30 md:left-25 lg:top-20 lg:bottom-0 lg:left-30 z-20">
        <div className="feature-1 flex flex-col items-start lg:items-center justify-center">
          {/* <p className="font-rubik font-bold mb-1 w-3/4 lg:w-full text-wrap leading-tight">
            {product.featureText.feature1.title}
          </p> */}

          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.images?.[1]?.url}`}
            className="feature-1-img w-30 h-30 md:w-33 md:h-33 lg:w-40 lg:h-40 object-cover bg-gray-400 rounded-lg border border-black"
            alt=""
          />
        </div>

        <div className="separator-1 hidden md:block md:w-35 lg:w-60">
          <Separator className="bg-white" />
        </div>
      </div>

      <div className="absolute flex items-center justify-center bottom-25 right-8 md:bottom-90 md:right-20 lg:bottom-40 lg:right-30 z-20">
        <div className="separator-2 hidden md:block md:w-40 lg:w-60">
          <Separator className="bg-white h-full" />
        </div>

        <div className="feature-2 max-w-full md:max-w-70">
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.images?.[2]?.url}`}
            className="feature-1-img w-30 h-30 md:w-33 md:h-33 lg:w-40 lg:h-40 object-cover bg-gray-400 rounded-lg border border-black"
            alt=""
          />
        </div>
      </div>

      <div className="z-10">
        <img
          src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.images?.[0]?.url}`}
          className="bg-gray-400 w-124 h-124 md:w-76 md:h-76 lg:w-124 lg:h-124 object-cover rounded-3xl"
          alt=""
        />
      </div>
    </div>
  );
}
