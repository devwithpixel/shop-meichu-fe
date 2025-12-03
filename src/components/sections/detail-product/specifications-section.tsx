"use client";

import { useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  title: string;
  price: number;
  images: {
    front: string;
    hover: string;
  };
  featureImages: {
    feature1: string;
    feature2: string;
  };
  featureText: {
    feature1: {
      title: string;
      description: string;
    };
    feature2: {
      title: string;
      description: string;
    };
  };
}

export default function SpecificationsSection({
  product,
}: {
  product: Product;
}) {
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (window.innerWidth < 768) return;

    gsap.set([".feature-1", ".feature-2"], { opacity: 0 });
    gsap.set(".separator-1", { scaleX: 0, transformOrigin: "right center" });
    gsap.set(".separator-2", { scaleX: 0, transformOrigin: "left center" });
    gsap.set(".feature-1-img", { scale: 0.5 });

    return gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
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
      ref={sectionRef}
      className="bg-black text-white min-h-screen flex flex-col items-center justify-center space-y-12 relative px-4"
    >
      <h1 className="font-rubik text-4xl md:text-5xl lg:text-7xl font-bold text-center z-10">
        Product Highlights
      </h1>

      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-9/11 md:w-3/4 h-96 md:h-196 bg-lime-500/20 blur-3xl rounded-xs md:rounded-full lg:rounded-xs"></div>
      </div>

      <div className="absolute flex items-center justify-center top-55 left-10 md:bottom-30 md:left-28 lg:top-20 lg:bottom-0 lg:left-30 xl:top-25 xl:left-50 z-20">
        <div className="feature-1 flex flex-col items-start lg:items-center justify-center">
          <p className="font-rubik font-bold mb-1 w-3/4 lg:w-full text-wrap leading-tight">
            {product.featureText.feature1.title}
          </p>

          <img
            src={product.featureImages.feature1}
            className="feature-1-img w-35 h-35 md:w-33 md:h-33 lg:w-40 lg:h-40 object-cover bg-gray-400 rounded-lg border border-black"
            alt=""
          />
        </div>

        <div className="separator-1 hidden md:block md:w-35 lg:w-70">
          <Separator className="bg-lime-400" />
        </div>
      </div>

      <div className="absolute flex flex-col items-center gap-4 bottom-0 md:right-30 md:bottom-90 lg:bottom-50 lg:right-35 xl:bottom-45 xl:right-65 z-20">
        <div className="separator-2 hidden md:block md:w-55 lg:w-105">
          <Separator className="bg-lime-400 h-full" />
        </div>

        <div className="feature-2 max-w-full md:max-w-70 ml-10 flex flex-col items-center md:items-start gap-1 md:gap-2">
          <p className="font-rubik font-bold -ml-8 md:ml-16 lg:ml-19 md:text-gray-300">
            {product.featureText.feature2.title}
          </p>

          <p className="font-rubik text-xs -ml-8 md:ml-16 lg:ml-19 text-gray-300">
            {product.featureText.feature2.description}
          </p>
        </div>
      </div>

      <div className="z-10">
        <img
          src={product.images.front}
          className="bg-gray-400 w-124 h-124 md:w-76 md:h-76 lg:w-124 lg:h-124 object-cover rounded-3xl"
          alt=""
        />
      </div>
    </div>
  );
}
