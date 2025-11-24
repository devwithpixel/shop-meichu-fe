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
      className="bg-black text-white min-h-screen flex flex-col items-center justify-center space-y-12 relative"
    >
      <h1 className="font-rubik text-7xl font-bold text-center z-10">
        Product Highlights
      </h1>

      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-9/11 lg:w-3/4 h-[900px] lg:h-96 bg-lime-500/20 blur-3xl"></div>
      </div>

      <div className="absolute flex items-center justify-center bottom-50 left-50 z-20">
        <div className="feature-1 flex flex-col items-center justify-center">
          <p className="font-rubik font-bold">
            {product.featureText.feature1.title}
          </p>

          <img
            src={product.featureImages.feature1}
            className="feature-1-img w-40 h-40 object-cover bg-gray-400 rounded-lg border border-black"
            alt=""
          />
        </div>

        <div className="separator-1 w-70">
          <Separator className="bg-lime-400" />
        </div>
      </div>

      <div className="absolute flex flex-col items-center gap-4 bottom-40 right-65 z-20">
        <div className="separator-2 w-105">
          <Separator className="bg-lime-400 h-full" />
        </div>

        <div className="feature-2 max-w-70 ml-10 flex flex-col items-start text-gray-300 gap-2">
          <p className="font-rubik font-bold ml-19">
            {product.featureText.feature2.title}
          </p>

          <p className="font-rubik text-xs ml-19">
            {product.featureText.feature2.description}
          </p>
        </div>
      </div>

      <div className="z-10">
        <img
          src={product.images.front}
          className="bg-gray-400 w-124 h-124 object-cover rounded-3xl"
          alt=""
        />
      </div>
    </div>
  );
}
