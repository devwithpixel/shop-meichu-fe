"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import TrendingProduct from "@/components/card/product-card";

import type { TrendingProductSection } from "@/types/strapi/components/home-page/trending-product-section";

export default function TrendingProductSection({
  data,
}: {
  data: TrendingProductSection;
}) {
  const sectionTrending = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionTrending.current) return;
      if (window.innerWidth <= 1024) return;

      gsap.set(".trending", { opacity: 1, x: 0 });
      gsap.set(".products", { opacity: 1, x: 0 });
      gsap.set(".trendCard", { perspective: 1000 });

      const cards = document.querySelectorAll(".trendingCard");
      const totalCards = cards.length;
      const spacing = -160;

      cards.forEach((card, index) => {
        const offset = (index - (totalCards - 1) / 2) * spacing;

        gsap.set(card, {
          opacity: 0,
          rotateY: 85,
          scale: 0.5,
          x: offset,
          transformOrigin: "center center",
        });
      });

      gsap.to(".trending", {
        x: -600,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionTrending.current,
          start: "top 45%",
          end: "bottom 75%",
          scrub: 4,
        },
      });

      gsap.to(".products", {
        x: 600,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionTrending.current,
          start: "top 45%",
          end: "bottom 75%",
          scrub: 4,
        },
      });

      gsap.to(".trendingCard", {
        rotateY: 0,
        opacity: 1,
        scale: 1,
        x: 0,
        scrollTrigger: {
          trigger: sectionTrending.current,
          start: "top 45%",
          end: "bottom 75%",
          scrub: 4,
        },
      });
    },
    {
      scope: sectionTrending,
    }
  );

  return (
    <div
      ref={sectionTrending}
      className="trending-wrapper bg-white lg:relative lg:flex lg:items-center lg:justify-center min-h-96 lg:min-h-86 overflow-x-hidden"
    >
      <div className="lg:absolute font-semibold text-center text-[3rem] md:text-[4rem] lg:text-[7rem] block md:flex items-center justify-center mt-12 lg:-mt-12 font-jogging">
        <h1 className="trending leading-10 md:pe-6">TRENDING</h1>
        <h1 className="products">PRODUCTS</h1>
      </div>

      <div className="trendCard lg:absolute bg-transparent flex items-center justify-start lg:justify-center gap-2 md:gap-6 lg:gap-4.5 p-4 md:p-6 mb-6 overflow-x-scroll lg:overflow-x-hidden">
        {data.products?.map((product) => (
          <TrendingProduct
            key={product.id}
            product={product}
            className="trendingCard"
            size="sm"
          />
        ))}
      </div>
    </div>
  );
}
