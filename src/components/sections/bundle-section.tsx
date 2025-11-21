"use client";

import { ProductCard } from "@/components/card/product-card";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

interface Product {
  name: string;
  price: number;
  image: string;
  variants?: {
    size: string;
    price: number;
  }[];
}

export default function BundleSection() {
  const bundleRef = useRef(null);
  const cardsRef = useRef(null);

  const products: Product[] = [
    {
      name: "Cotton Cropped Trucker Shirt",
      price: 2500,
      image: "/assets/image/my.png",
      variants: [
        { size: "Small", price: 2500 },
        { size: "Medium", price: 2600 },
        { size: "Large", price: 2700 },
        { size: "Extra Large", price: 2800 },
      ],
    },
    {
      name: "Full Sleeve Round Neck T-shirt",
      price: 4000,
      image: "/assets/image/my.png",
      variants: [
        { size: "Small", price: 4000 },
        { size: "Medium", price: 4200 },
        { size: "Large", price: 4400 },
        { size: "Extra Large", price: 4600 },
      ],
    },
    {
      name: "Loose T-shirt",
      price: 3500,
      image: "/assets/image/my.png",
      variants: [
        { size: "Small", price: 3500 },
        { size: "Medium", price: 3600 },
        { size: "Large", price: 3700 },
        { size: "Extra Large", price: 3800 },
      ],
    },
    {
      name: "Racerback Sports Bra",
      price: 3400,
      image: "/assets/image/my.png",
      variants: [
        { size: "Small", price: 3400 },
        { size: "Medium", price: 3500 },
        { size: "Large", price: 3600 },
        { size: "Extra Large", price: 3700 },
      ],
    },
    {
      name: "Polyester Women Gym Suit",
      price: 4500,
      image: "/assets/image/my.png",
      variants: [
        { size: "Small", price: 4500 },
        { size: "Medium", price: 4700 },
        { size: "Large", price: 4900 },
        { size: "Extra Large", price: 5100 },
      ],
    },
    {
      name: "Cotton Oversized Hoodie",
      price: 5200,
      image: "/assets/image/my.png",
      variants: [
        { size: "Small", price: 5200 },
        { size: "Medium", price: 5400 },
        { size: "Large", price: 5600 },
        { size: "Extra Large", price: 5800 },
      ],
    },
    {
      name: "Yoga Pants High Waist",
      price: 3800,
      image: "/assets/image/my.png",
      variants: [
        { size: "Small", price: 3800 },
        { size: "Medium", price: 3900 },
        { size: "Large", price: 4000 },
        { size: "Extra Large", price: 4100 },
      ],
    },
    {
      name: "Running Shorts",
      price: 2900,
      image: "/assets/image/my.png",
      variants: [
        { size: "Small", price: 2900 },
        { size: "Medium", price: 3000 },
        { size: "Large", price: 3100 },
        { size: "Extra Large", price: 3200 },
      ],
    },
    {
      name: "Training Jacket",
      price: 5500,
      image: "/assets/image/my.png",
      variants: [
        { size: "Small", price: 5500 },
        { size: "Medium", price: 5700 },
        { size: "Large", price: 5900 },
        { size: "Extra Large", price: 6100 },
      ],
    },
    {
      name: "Compression Leggings",
      price: 4200,
      image: "/assets/image/my.png",
      variants: [
        { size: "Small", price: 4200 },
        { size: "Medium", price: 4300 },
        { size: "Large", price: 4400 },
        { size: "Extra Large", price: 4500 },
      ],
    },
  ];

  useGSAP(
    () => {
      if (window.innerWidth <= 768) return;

      const cards = gsap.utils.toArray(".product-card-item");

      let cols = 5;
      if (window.innerWidth < 1024) cols = 3;

      ScrollTrigger.create({
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
                  ? -120
                  : -60
                : cols === 3
                ? isEven
                  ? -70
                  : -35
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
    },
    { scope: bundleRef }
  );

  return (
    <div
      ref={bundleRef}
      className="relative w-full min-h-screen bg-black text-white px-4 sm:px-6 md:px-8 py-8 sm:py-14"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="lg:h-96 md:h-9/12 h-9/11 lg:w-1/2 w-9/11 rounded-full bg-lime-500/15 blur-3xl"></div>
      </div>
      <div className="relative z-10">
        <div className="w-full flex justify-center mt-10 sm:mt-20">
          <div className="max-w-6xl w-full flex justify-center items-center gap-4 sm:gap-6">
            <div className="px-2">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-medium text-slate-200 leading-tight font-rubik flex justify-center items-center text-center">
                Bundle Up & Save More
              </h1>
              <p className="mt-4 sm:mt-8 text-xs sm:text-base leading-relaxed opacity-80 font-inter flex justify-center items-center text-center max-w-4xl px-2">
                Make shopping easier and faster by selecting the products you
                love and adding them to your cart in just a few clicks. Browse
                through our collection, choose your favorites, and get one step
                closer to checkout. Smart shopping starts here - simple,
                seamless, and stress-free.
              </p>
            </div>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="w-full mx-auto px-1 sm:px-2 mt-10 sm:mt-20"
        >
          <div className="max-w-8xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {products.map((item, index) => (
              <div key={index} className="product-card-itemw-full">
                <ProductCard
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  variants={item.variants}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
