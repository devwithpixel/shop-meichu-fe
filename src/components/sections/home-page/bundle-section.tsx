"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BundleProductCard from "@/components/card/bundle-product-card";

import type { BundleSection } from "@/types/strapi/components/home-page/bundle-section";

export default function BundleSection({ data }: { data: BundleSection }) {
  const bundleRef = useRef(null);
  const cardsRef = useRef(null);
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      if (isMobile || window.innerWidth < 768) return;

      const cards = gsap.utils.toArray(".product-card-item");

      if (!cards.length) return;

      let cols = 5;
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        cols = 3;
      }

      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: cardsRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;

          cards.forEach((card: any, index: number) => {
            const col = index % cols;
            const isEven = col % 2 === 0;

            const distance =
              cols === 5
                ? isEven
                  ? -160
                  : -90
                : cols === 3
                  ? isEven
                    ? -140
                    : -65
                  : 0;

            gsap.to(card, {
              y: distance * progress,
              ease: "none",
              overwrite: "auto",
              duration: 0,
            });
          });
        },
      });

      return () => {
        scrollTriggerInstance.kill();
      };
    },
    {
      scope: bundleRef,
      dependencies: [isMobile],
    }
  );

  return (
    <div
      ref={bundleRef}
      className="relative w-full min-h-screen bg-black text-white px-4 sm:px-6 md:px-8 py-8 sm:py-14"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="lg:h-96 md:h-9/12 h-9/11 lg:w-1/2 w-9/11 rounded-full bg-[#018DC2]/50 blur-3xl"></div>
      </div>
      <div className="relative z-10">
        <div className="w-full flex justify-center mt-10 sm:mt-20">
          <div className="max-w-6xl w-full flex justify-center items-center gap-4 sm:gap-6">
            <div className="px-2">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-slate-200 leading-tight font-albert-sans flex justify-center items-center text-center">
                {data.section.title}
              </h1>
              <p className="mt-4 sm:mt-8 text-xs sm:text-base leading-relaxed opacity-80 font-albert-sans flex justify-center items-center text-center max-w-4xl px-2">
                {data.section.description}
              </p>
            </div>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="w-full mx-auto px-1 sm:px-2 mt-10 sm:mt-20"
        >
          <div className="max-w-8xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {data.products?.map((product) => (
              <div key={product.id} className="product-card-item w-full">
                <BundleProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
