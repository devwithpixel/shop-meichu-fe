"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import ProductCard from "@/components/card/product-card";

import type { RecommendationSection } from "@/types/strapi/components/home-page/recommendation-section";

export default function RecommendationSection({
  data,
}: {
  data: RecommendationSection;
}) {
  const sectionWardrobe = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  useGSAP(() => {
    if (!sectionWardrobe.current || isMobile) return;

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
    <div
      ref={sectionWardrobe}
      className="bg-white p-4 md:p-6 space-y-6 overflow-x-hidden lg:overflow-x-visible"
    >
      <div className="text-black max-w-full md:max-w-3/4 lg:max-w-1/2 space-y-4">
        <h1 className="font-rubik text-2xl md:text-3xl lg:text-4xl font-semibold">
          {data.section.title}
        </h1>
        <p className="font-inter text-xs lg:text-sm">
          {data.section.description}
        </p>
      </div>

      <div className="flex items-center md:justify-start lg:justify-center flex-nowrap md:flex-wrap lg:flex-nowrap gap-2 md:gap-5.5 lg:gap-4.5 mb-6 overflow-x-scroll lg:overflow-x-visible">
        {data.products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="recommendation-card"
          />
        ))}
      </div>
    </div>
  );
}
