"use client";

import { MdOutlineArrowOutward } from "react-icons/md";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useMemo, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import StrapiImage from "@/components/global/strapi-image";

import type { CollectionSection } from "@/types/strapi/components/home-page/collection-section";
import Link from "next/link";

export default function CollectionSection({
  data,
}: {
  data: CollectionSection;
}) {
  const styleRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [activeCollectionId, setActiveCollectionId] = useState<number>(
    data.collections?.[1]?.id || data.collections[0].id
  );
  const activeCollection = useMemo(
    () => data.collections?.find((col) => col.id === activeCollectionId),
    [activeCollectionId]
  );

  useGSAP(
    () => {
      if (isMobile) return;

      gsap.set(".multi-image-container", { opacity: 0, scale: 0.8 });

      const splitTitle = new SplitText(".split-title-style", {
        type: "words",
        wordsClass: "word",
      });

      gsap.set(splitTitle.words, {
        transformOrigin: "0% 50%",
      });

      gsap.fromTo(
        ".title-style",
        { opacity: 1, y: 100 },
        {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".title-style",
            start: "bottom 35%",
            end: "bottom 25%",
            toggleActions: "play reverse play reverse",
            scrub: 2,
          },
        }
      );

      gsap.fromTo(
        ".title-description-style",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.in",
          scrollTrigger: {
            trigger: ".title-style",
            start: "center",
            end: "bottom",
            toggleActions: "play none none reverse",
            scrub: 1,
          },
        }
      );

      gsap.from(splitTitle.words, {
        scaleX: 0,
        autoAlpha: 0,
        x: -10,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".split-title-style",
          start: "45%",
          end: "bottom",
          scrub: 1.2,
          toggleActions: "play none none reverse",
        },
      });

      gsap.fromTo(
        ".category-style",
        { y: 300 },
        {
          y: 0,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".category-style",
            start: "top 25%",
            end: "top 25%",
            toggleActions: "play none none reverse",
            scrub: 1,
          },
        }
      );

      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".image-transform-trigger",
          start: "top center",
          end: "bottom top",
          scrub: 1,
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      mainTimeline
        .fromTo(
          ".single-image-container",
          { x: -550, scale: 0.5, opacity: 0.5, y: 0 },
          {
            y: -50,
            duration: 1,
          }
        )
        .to(".single-image-container", { y: 0, duration: 1 })
        .to(".single-image-container", {
          x: 0,
          scale: 1,
          duration: 3,
          opacity: 1,
          ease: "power3.inOut",
        })
        .fromTo(
          ".button-wrapper",
          {
            width: "30%",
            opacity: 0,
          },
          {
            opacity: 1,
            width: "95%",
            duration: 1,
            ease: "power2.inOut",
          }
        )
        .to(".single-image-container", {
          opacity: 0,
          scale: 0.5,
          duration: 1,
          ease: "power4.in",
        })
        .to(
          ".multi-image-container",
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power3.inOut",
          },
          "-=0.2"
        )
        .from(
          ".image-item-1",
          {
            scale: 0.2,
            opacity: 0,
            duration: 0.3,
            ease: "power3.out",
          },
          "-=0.1"
        )
        .from(
          ".image-item-2",
          {
            scale: 0.2,
            opacity: 0,
            duration: 0.3,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .from(
          ".image-item-3",
          {
            scale: 0.2,
            opacity: 0,
            duration: 0.3,
            ease: "power3.out",
          },
          "-=0.2"
        );

      ScrollTrigger.create({
        trigger: styleRef.current,
        start: "top top",
        end: "bottom top",
        toggleActions: "play none none none",
        scrub: true,
        pin: true,
        pinSpacing: true,
      });
    },
    {
      scope: styleRef,
    }
  );

  return (
    <>
      {/* Desktop & Ipad */}
      <div
        id="style-section"
        className="hidden md:block font-albert-sans"
        ref={styleRef}
      >
        <div className="relative w-full min-h-screen bg-black text-white px-8 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-between">
            <div className="w-[400px] h-[400px] rounded-full bg-[#703632] blur-[180px] pointer-events-none"></div>

            <div className="w-[400px] h-[400px] rounded-full bg-[#703632] blur-[180px] pointer"></div>
          </div>

          <div className="relative z-10">
            <div className="w-full flex justify-center">
              <div className="absolute max-w-6xl w-full flex justify-center items-center gap-6">
                <div className="title-style">
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-200 leading-tight font-albert-sans flex justify-center items-center text-center">
                    {data.section.title}
                  </h1>
                  <p className="mt-8 text-base leading-relaxed opacity-80 font-albert-sans flex justify-center items-center text-center">
                    {data.section.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="category-style relative z-40 w-full flex justify-center mb-16">
              <div className="max-w-6xl w-full flex justify-center items-center gap-6">
                {data.collections?.map((collection) => {
                  const isActive = activeCollectionId === collection.id;

                  return (
                    <div
                      key={collection.id}
                      onClick={() => setActiveCollectionId(collection.id)}
                      className={`rounded-full h-20 flex items-center cursor-pointer transition-all duration-300
                      ${
                        isActive
                          ? "bg-white text-black shadow-md border-2 border-black justify-start w-[40%] gap-4 px-3"
                          : "bg-white/20 backdrop-blur-lg w-24 border border-white justify-center"
                      }
                    `}
                    >
                      <StrapiImage
                        src={collection.category.thumbnail}
                        alt={collection.category?.name}
                        size="thumbnail"
                        className={`rounded-full object-cover transition-all duration-300
                        ${isActive ? "w-16 h-16 absolute" : "w-17 h-17"}
                      `}
                      />

                      {isActive && (
                        <h1 className="text-[26px] font-albert-sans font-normal flex-1 text-center truncate">
                          {collection.category?.name}
                        </h1>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative w-full flex justify-center z-0">
              <div className="max-w-6xl w-full grid grid-cols-2 gap-4 justify-center items-center px-12">
                <div className="title-description-style grid grid-cols-1 gap-6">
                  <h1 className="split-title-style text-4xl md:text-3xl lg:text-5xl font-bold text-white leading-tight font-albert-sans max-w-[480px]">
                    {activeCollection?.category.name}
                  </h1>

                  <p className="text-xs lg:text-sm leading-relaxed opacity-80 font-albert-sans">
                    {activeCollection?.section.description}
                  </p>
                </div>

                <div className="image-transform-trigger relative w-full">
                  <div className="button-wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] z-30">
                    <div className=" bg-white text-black pl-4 pr-2 py-2.5 rounded-full shadow-xl flex items-center gap-3 w-full font-albert-sans">
                      <span className="text-btn flex items-center flex-1 font-albert-sans text-sm md:text-base lg:text-lg text-gray-900 truncate">
                        {activeCollection?.ctaText}
                      </span>

                      <Link
                        href={`collections/${activeCollection?.category.slug}`}
                        className=" w-8 h-8 rounded-full bg-black text-white flex items-center justify-center cursor-pointer shrink-0"
                      >
                        <MdOutlineArrowOutward className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>

                  <div className="single-image-container w-full z-10">
                    <div className="relative w-full h-[500px]">
                      <StrapiImage
                        src={activeCollection?.category.thumbnail}
                        alt={activeCollection?.category.name || "image"}
                        size="medium"
                        className="w-full h-[500px] object-cover rounded-3xl"
                      />
                    </div>
                  </div>

                  <div className="multi-image-container absolute inset-0 w-full">
                    <div className="px-4 grid grid-cols-2 gap-5 w-full">
                      {activeCollection?.products
                        .slice(0, 2)
                        .map((product, index) => {
                          return (
                            <div
                              key={product.id}
                              className={`image-item-${index + 1} w-full h-48 overflow-hidden rounded-2xl bg-gray-200`}
                            >
                              <StrapiImage
                                src={product?.images?.[0]}
                                alt={product?.name}
                                size="medium"
                                className="w-full h-48 object-cover"
                              />
                            </div>
                          );
                        })}
                    </div>

                    <div className="px-4 mt-28">
                      {activeCollection?.products?.[2] ? (
                        <div className="image-item-3 w-full h-48 overflow-hidden rounded-2xl bg-gray-200">
                          <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${activeCollection?.products?.[2]?.images?.[0]?.url}`}
                            alt="image-3"
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden bg-white text-black min-h-screen px-4 py-12 font-albert-sans">
        <div className="w-full">
          <div className="w-full flex justify-center mb-8">
            <div className="max-w-6xl w-full">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 leading-tight font-albert-sans text-center">
                  {data.section.title}
                </h1>
                <p className="mt-4 text-xs font-medium leading-relaxed text-gray-600 font-albert-sans text-center">
                  {data.section.description}
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full flex justify-center mb-8">
            <div className="max-w-6xl w-full flex justify-center items-center gap-3">
              {data.collections?.map((collection) => {
                const isActive = activeCollectionId === collection.id;

                return (
                  <div
                    key={collection.id}
                    onClick={() => setActiveCollectionId(collection.id)}
                    className={`rounded-full h-16 flex items-center cursor-pointer transition-all duration-300
                    ${
                      isActive
                        ? "bg-black text-white shadow-md border-2 border-black justify-start w-[60%] gap-4 px-3"
                        : " w-16 justify-center"
                    }
                  `}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${collection.category.thumbnail?.url}`}
                      alt={collection.category?.name}
                      className={`rounded-full object-cover transition-all duration-300
                      ${isActive ? "w-12 h-12 absolute" : "w-12 h-12"}
                    `}
                    />

                    {isActive && (
                      <h1 className="text-lg font-arial font-mod flex-1 text-center pl-10">
                        {collection.category?.name}
                      </h1>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full my-8">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight font-albert-sans">
              {activeCollection?.section.title}
            </h1>
            <p className="mt-4 text-xs leading-relaxed text-gray-800 font-albert-sans">
              {activeCollection?.section.description}
            </p>
          </div>

          <div className="w-full mb-6">
            <div className="relative w-full h-64">
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${activeCollection?.category.thumbnail?.url}`}
                alt={activeCollection?.category.name}
                className="w-full h-64 object-cover rounded-3xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {activeCollection?.products.slice(0, 2).map((product) => {
              return (
                <div
                  key={product.id}
                  className="w-full h-40 overflow-hidden rounded-2xl bg-gray-200"
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product?.images?.[0]?.url}`}
                    alt={product?.name}
                    className="w-full h-40 object-cover"
                  />
                </div>
              );
            })}
          </div>

          <div className="w-full mb-4">
            <div className="button bg-white text-black pl-4 pr-2 py-3 rounded-full flex items-center gap-3 w-full font-albert-sans">
              <span className="flex items-center flex-1 font-albert-sans text-sm text-black truncate">
                {activeCollection?.ctaText}
              </span>
              <Link
                href={`collections/${activeCollection?.category.slug}`}
                className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center cursor-pointer shrink-0"
              >
                <MdOutlineArrowOutward className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="w-full">
            {activeCollection?.products?.[2] ? (
              <div className="w-full h-40 overflow-hidden rounded-2xl bg-gray-200">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${activeCollection?.products?.[2]?.images?.[0]?.url}`}
                  alt={activeCollection?.products?.[2]?.name}
                  className="w-full h-40 object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
