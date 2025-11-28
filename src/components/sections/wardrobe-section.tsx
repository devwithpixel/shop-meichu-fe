"use client";

import { useRef } from "react";
import TrendingProduct from "@/components/card/trending-product";
import { products } from "@/lib/data/product";
import gsap from "gsap/all";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WardrobeSection() {
  const sectionWardrobe = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!sectionWardrobe.current) return;
    if (window.innerWidth <= 768) return;

    gsap.set(".wardrobeCard", { opacity: 0, y: 150, scale: 0.8 });

    ScrollTrigger.create({
      trigger: sectionWardrobe.current,
      start: "top 50%",
      markers: true,
      toggleActions: "play reverse play reverse",
      animation: gsap.to(".wardrobeCard", {
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
          ELEVATE YOUR WARDROBE TODAY
        </h1>
        <p className="font-inter text-xs lg:text-sm">
          -Discover trendsetting styles crafted for everyy occasion. From casual
          essentials to statement pieces, upgrade your fashion game with our
          premium collection!
        </p>
      </div>

      <div className="flex items-center md:justify-start lg:justify-center flex-nowrap md:flex-wrap lg:flex-nowrap gap-2 md:gap-5.5 lg:gap-4.5 mb-6 overflow-x-scroll lg:overflow-x-visible">
        {products.map((p) => (
          <TrendingProduct key={p.id} product={p} className="wardrobeCard" />
        ))}
      </div>
    </div>
  );
}
