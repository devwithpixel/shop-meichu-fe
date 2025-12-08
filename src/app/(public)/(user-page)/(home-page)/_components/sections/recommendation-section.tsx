"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import ProductCard from "@/components/card/product-card";

import type { RecommendationSection } from "@/types/strapi/components/home-page/recommendation-section";
import IconElement from "@/components/ui/icon-element";

export default function RecommendationSection({
  data,
}: {
  data: RecommendationSection;
}) {
  const sectionWardrobe = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!sectionWardrobe.current) return;

    const isMobile = window.innerWidth < 768;

    if (isMobile) return;

    const productCards = gsap.utils.selector(sectionWardrobe.current)(
      ".recommendation-card"
    );

    gsap.set(productCards, { opacity: 0, y: 150, scale: 0.8 });

    ScrollTrigger.create({
      trigger: sectionWardrobe.current,
      start: "top 50%",
      toggleActions: "play reverse play reverse",
      animation: gsap.to(productCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: {
          amount: 1,
          from: "start",
        },
        ease: "sine.out",
      }),
    });
  }, []);

  return (
    <>
      <div className="relative">
        <IconElement variant={1} />
        <div
          ref={sectionWardrobe}
          className="bg-[#D9E4E8] px-4 py-20 lg:px-10 lg:py-10 space-y-6 overflow-x-hidden lg:overflow-x-visible"
        >
          <div className="text-black max-w-full md:max-w-3/4 lg:max-w-1/2 space-y-4">
            <h1 className="font-albert-sans text-2xl md:text-3xl lg:text-4xl font-bold">
              {data.section.title}
            </h1>
            <p className="font-albert-sans text-xs lg:text-sm font-medium">
              {data.section.description}
            </p>
          </div>
          <div className="flex items-center md:justify-start lg:justify-center flex-nowrap md:flex-wrap lg:flex-nowrap gap-2 md:gap-5.5 lg:gap-4.5 mb-6 overflow-x-scroll overflow-hidden lg:overflow-x-visible scrollbar-hide z-10">
            {data.products?.slice(0, 6).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                className="recommendation-card"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
