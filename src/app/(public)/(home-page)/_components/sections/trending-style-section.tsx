"use client";

import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { GoArrowUpRight } from "react-icons/go";
import { formatCurrency } from "@/lib/utils";
import { bgColors, bgCardColor } from "@/lib/data/color";
import StrapiImage from "@/components/global/strapi-image";
import gsap from "gsap";

import type { TrendingStyleSection } from "@/types/strapi/components/home-page/trending-style-section";
import Link from "next/link";

gsap.registerPlugin(Flip);

export default function TrendingStyleSection({
  data,
}: {
  data: TrendingStyleSection;
}) {
  const favoriteRef = useRef(null);
  const cardTriggerRef = useRef(null);
  const cardMainRef = useRef(null);

  useGSAP(
    () => {
      if (window.innerWidth <= 748) return;

      const cards = gsap.utils.toArray<HTMLElement>(".card-color");
      const cardTexts = gsap.utils.toArray<HTMLElement>(".text-color");

      gsap.set(".border-main", { opacity: 0 });
      gsap.set(".card-color-trigger", { opacity: 0 });
      gsap.set(".card-main", { backgroundColor: "#ffffff" });
      gsap.set(cards, {
        rotation: 35,
        scale: 0.45,
        zIndex: (i) => 5 + i,
        y: (i) => i * -130,
        z: (i) => -i * 50,
      });
      gsap.set(cardTexts, { fontSize: "60px", textAlign: "center" });

      const getTextX = () => {
        if (window.innerWidth >= 901) return -85;
        if (window.innerWidth <= 900) return 67;
        return 0;
      };

      const favoriteTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: cardTriggerRef.current,
          start: "center top",
          end: "+=2500",
          scrub: 2,
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      favoriteTimeline
        .to(".card-color-trigger", { opacity: 1 })
        .to(".card-color-trigger", { y: 200 })
        .to(cardTexts, { fontSize: "28px" })
        .to(cards, {
          duration: 1,
          y: (i) => i * -140,
          rotation: 0,
          scale: 1,
          yPercent: 0,
        })
        .to(".card-color-trigger", { y: 0 })
        .to(cards, { duration: 1, y: 0 })
        .to(".border-main", { duration: 1, opacity: 1 })
        .to(cardMainRef, { duration: 1, opacity: 1 })
        .to(cards, { scale: 0.7 })
        .to(cards, {
          height: "40px",
          y: 22,
          duration: 1,
          ease: "power2.inOut",
        })
        .to(
          cardTexts,
          {
            fontSize: "24px",
            x: getTextX(),
            textAlign: "left",
            duration: 1,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(cards, { duration: 0.5, opacity: 0 })
        .to(".card-main", {
          backgroundColor: (i) => bgCardColor[i],
          duration: 0.5,
        })
        .to(".card-color-trigger", { zIndex: 0 });

      ScrollTrigger.create({
        trigger: favoriteRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        pinSpacing: true,
      });
    },
    { scope: favoriteRef }
  );

  return (
    <div
      ref={favoriteRef}
      className="relative min-h-screen bg-black text-white flex items-center justify-center md:py-0 py-10"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/2 h-3/4 bg-[#FF56E0]/30 blur-3xl rounded-full"></div>
      </div>
      <div className="relative z-10">
        <div className="relative w-full flex justify-center z-0">
          <div className="px-5 md:px-4 lg:px-20 w-fit grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-10">
            <div className="md:w-9/12 lg:w-full title-description-favorite grid grid-cols-1 gap-6">
              <h1 className="split-title-favorite text-3xl lg:text-5xl font-albert-sans font-bold leading-tight">
                {data.section.title}
              </h1>

              <div className="max-w-xl font-albert-sans text-xs lg:text-sm leading-relaxed opacity-80 grid gap-6">
                <p>{data.section.description}</p>
              </div>

              <Link
                href={data.ctaButton.url}
                className="hidden lg:flex items-center space-x-0.5 cursor-pointer group w-fit rounded-3xl "
              >
                <HiOutlineArrowUpRight
                  size={55}
                  className="bg-white border border-black rounded-full p-4 transition-all duration-300 group-hover:-mr-14 group-hover:text-white text-black group-hover:bg-black hover:text-white group-hover:scale-90"
                />
                <p className="bg-white px-8 py-4 border border-black rounded-full whitespace-nowrap transition-all text-black duration-300 group-hover:pl-22.5 font-albert-sans font-medium">
                  {data.ctaButton?.title}
                </p>
              </Link>

              <Link
                href={data.ctaButton.url}
                className="lg:hidden flex cursor-pointer p-2 w-1/2 bg-white text-black rounded-full justify-start items-center font-albert-sans"
              >
                <div className="flex items-center gap-2 bg-white">
                  <div className="bg-black p-2 rounded-full">
                    <HiOutlineArrowUpRight
                      size={20}
                      className="bg-black text-white rounded-full"
                    />
                  </div>
                  <p className="text-sm font-base">{data.ctaButton?.title}</p>
                </div>
              </Link>
            </div>

            <div className="image-trigger-favorite relative w-full">
              <div ref={cardTriggerRef} className="">
                <div className="card-color-trigger hidden md:grid absolute inset-0 p-3 gap-3 z-10">
                  {data.products?.slice(0, 5).map((product, index) => (
                    <div
                      key={product.id}
                      className={`card-color ${bgColors[index]} flex items-center justify-center rounded-xl text-center`}
                    >
                      <h1 className="text-color text-2xl text-gray-900 font-albert-sans font-bold whitespace-nowrap lg:mx-37 truncate w-[95%] md:w-[80%] lg:w-[95%]">
                        {product.name}
                      </h1>
                    </div>
                  ))}
                </div>

                <div className="border-main md:border border-gray-500 rounded-3xl">
                  <div className="grid gap-3 relative md:p-3 p-0 z-0">
                    {data.products?.slice(0, 5).map((product, index) => (
                      <div
                        key={product.id}
                        ref={cardMainRef}
                        className={
                          "card-main flex items-center gap-5 rounded-3xl p-2"
                        }
                        style={{
                          backgroundColor: bgCardColor[index],
                        }}
                      >
                        <StrapiImage
                          src={product?.images?.[0]}
                          alt={product.name}
                          size="thumbnail"
                          className="aspect-square object-cover rounded-3xl w-20 h-20 md:w-24 md:h-24"
                        />
                        <div className="flex items-center justify-between w-full">
                          <div className="grid grid-cols-1 gap-3">
                            <h1 className="text-base text-gray-900 font-albert-sans font-bold truncate w-[99%]">
                              {product.name}
                            </h1>
                            <p className="text-xs text-gray-900 font-albert-sans font-bold">
                              {formatCurrency(product.price)}
                            </p>
                          </div>
                          <Link
                            href={`/products/${product.slug}`}
                            className="border border-gray-900 hover:bg-white hover:border-transparent rounded-full transition-all duration-500 p-1 md:p-3 mr-4 group/icon"
                          >
                            <GoArrowUpRight
                              size={24}
                              className="text-gray-900 font-normal cursor-pointer group-hover/icon:rotate-45 transition-all duration-500 ease-out"
                            />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
