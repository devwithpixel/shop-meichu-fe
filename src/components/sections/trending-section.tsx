"use client";

import { useRef } from "react";
import TrendingProduct from "../card/trending-product";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function TrendingSection() {
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

  const products = [
    {
      id: 1,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front: "/assets/image/arya/arya-green.png",
        hover: "/assets/image/arya/arya-hover.png",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Green",
          bgImg: "/assets/image/arya/arya-green.png",
          bgColor: "bg-green-500",
        },
        {
          label: "Orange",
          bgImg: "/assets/image/arya/arya-orange.png",
          bgColor: "bg-orange-500",
        },
        {
          label: "Blue",
          bgImg: "/assets/image/arya/arya-blue.png",
          bgColor: "bg-blue-500",
        },
        {
          label: "Navy ",
          bgImg: "/assets/image/arya/arya-deepblue.png",
          bgColor: "bg-blue-900",
        },
      ],
    },
    {
      id: 1,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front: "/assets/image/arya/arya-green.png",
        hover: "/assets/image/arya/arya-hover.png",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Green",
          bgImg: "/assets/image/arya/arya-green.png",
          bgColor: "bg-green-500",
        },
        {
          label: "Orange",
          bgImg: "/assets/image/arya/arya-orange.png",
          bgColor: "bg-orange-500",
        },
        {
          label: "Blue",
          bgImg: "/assets/image/arya/arya-blue.png",
          bgColor: "bg-blue-500",
        },
        {
          label: "Navy ",
          bgImg: "/assets/image/arya/arya-deepblue.png",
          bgColor: "bg-blue-900",
        },
      ],
    },
    {
      id: 1,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front: "/assets/image/arya/arya-green.png",
        hover: "/assets/image/arya/arya-hover.png",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Green",
          bgImg: "/assets/image/arya/arya-green.png",
          bgColor: "bg-green-500",
        },
        {
          label: "Orange",
          bgImg: "/assets/image/arya/arya-orange.png",
          bgColor: "bg-orange-500",
        },
        {
          label: "Blue",
          bgImg: "/assets/image/arya/arya-blue.png",
          bgColor: "bg-blue-500",
        },
        {
          label: "Navy ",
          bgImg: "/assets/image/arya/arya-deepblue.png",
          bgColor: "bg-blue-900",
        },
      ],
    },
    {
      id: 1,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front: "/assets/image/arya/arya-green.png",
        hover: "/assets/image/arya/arya-hover.png",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Green",
          bgImg: "/assets/image/arya/arya-green.png",
          bgColor: "bg-green-500",
        },
        {
          label: "Orange",
          bgImg: "/assets/image/arya/arya-orange.png",
          bgColor: "bg-orange-500",
        },
        {
          label: "Blue",
          bgImg: "/assets/image/arya/arya-blue.png",
          bgColor: "bg-blue-500",
        },
        {
          label: "Navy ",
          bgImg: "/assets/image/arya/arya-deepblue.png",
          bgColor: "bg-blue-900",
        },
      ],
    },
    {
      id: 1,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front: "/assets/image/arya/arya-green.png",
        hover: "/assets/image/arya/arya-hover.png",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Green",
          bgImg: "/assets/image/arya/arya-green.png",
          bgColor: "bg-green-500",
        },
        {
          label: "Orange",
          bgImg: "/assets/image/arya/arya-orange.png",
          bgColor: "bg-orange-500",
        },
        {
          label: "Blue",
          bgImg: "/assets/image/arya/arya-blue.png",
          bgColor: "bg-blue-500",
        },
        {
          label: "Navy ",
          bgImg: "/assets/image/arya/arya-deepblue.png",
          bgColor: "bg-blue-900",
        },
      ],
    },
    {
      id: 1,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front: "/assets/image/arya/arya-green.png",
        hover: "/assets/image/arya/arya-hover.png",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Green",
          bgImg: "/assets/image/arya/arya-green.png",
          bgColor: "bg-green-500",
        },
        {
          label: "Orange",
          bgImg: "/assets/image/arya/arya-orange.png",
          bgColor: "bg-orange-500",
        },
        {
          label: "Blue",
          bgImg: "/assets/image/arya/arya-blue.png",
          bgColor: "bg-blue-500",
        },
        {
          label: "Navy ",
          bgImg: "/assets/image/arya/arya-deepblue.png",
          bgColor: "bg-blue-900",
        },
      ],
    },
    {
      id: 1,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front: "/assets/image/arya/arya-green.png",
        hover: "/assets/image/arya/arya-hover.png",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Green",
          bgImg: "/assets/image/arya/arya-green.png",
          bgColor: "bg-green-500",
        },
        {
          label: "Orange",
          bgImg: "/assets/image/arya/arya-orange.png",
          bgColor: "bg-orange-500",
        },
        {
          label: "Blue",
          bgImg: "/assets/image/arya/arya-blue.png",
          bgColor: "bg-blue-500",
        },
        {
          label: "Navy ",
          bgImg: "/assets/image/arya/arya-deepblue.png",
          bgColor: "bg-blue-900",
        },
      ],
    },
    {
      id: 1,
      title: "Full Sleeve Round Neck T-shirt",
      price: 4400,
      images: {
        front: "/assets/image/arya/arya-green.png",
        hover: "/assets/image/arya/arya-hover.png",
      },
      sizes: ["S", "M", "L"],
      colors: [
        {
          label: "Green",
          bgImg: "/assets/image/arya/arya-green.png",
          bgColor: "bg-green-500",
        },
        {
          label: "Orange",
          bgImg: "/assets/image/arya/arya-orange.png",
          bgColor: "bg-orange-500",
        },
        {
          label: "Blue",
          bgImg: "/assets/image/arya/arya-blue.png",
          bgColor: "bg-blue-500",
        },
        {
          label: "Navy ",
          bgImg: "/assets/image/arya/arya-deepblue.png",
          bgColor: "bg-blue-900",
        },
      ],
    },
  ];

  return (
    <div
      ref={sectionTrending}
      className="trending-wrapper bg-white lg:relative lg:flex lg:items-center lg:justify-center min-h-96 lg:min-h-86 overflow-x-hidden"
    >
      <div className="lg:absolute font-semibold text-center text-[3rem] lg:text-[7rem] block lg:flex items-center justify-center mt-12 lg:mt-0">
        <h1 className="trending leading-10">TRENDING</h1>
        <h1 className="products">PRODUCTS</h1>
      </div>

      <div className="trendCard lg:absolute bg-transparent flex items-center justify-start lg:justify-center gap-2 lg:gap-4.5 p-6 mb-6 overflow-x-scroll lg:overflow-x-hidden">
        {products.map((p) => (
          <TrendingProduct key={p.id} product={p} className="trendingCard" />
        ))}
      </div>
    </div>
  );
}
