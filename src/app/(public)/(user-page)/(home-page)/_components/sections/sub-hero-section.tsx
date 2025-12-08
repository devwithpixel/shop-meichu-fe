"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import type { SubHeroSection } from "@/types/strapi/components/home-page/sub-hero-section";
import Link from "next/link";

export default function SubHeroSection({
  ref,
  data,
}: {
  ref: React.RefObject<HTMLElement>;
  data: SubHeroSection;
}) {
  const collectionsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      const links = gsap.utils.selector(collectionsRef.current!)("a");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: collectionsRef.current!,
          start: "top bottom",
          scrub: 1,
        },
      });

      links.forEach((link, i) =>
        tl.fromTo(
          link,
          {
            y: 40 * (i % 2 ? 1 : -1),
          },
          {
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          i && "<"
        )
      );
    }
  }, []);

  const firstTwo = data.items.slice(0, 2);
  const remaining = data.items.slice(2);

  return (
    <section
      ref={ref}
      className="relative z-20 md:min-h-[150vh] w-full flex flex-col items-center justify-center text-center font-albert-sans py-20 md:py-0"
      style={{
        background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0.8) 10%,
            rgba(0,0,0,1) 18%,
            rgba(0,0,0,1) 100%
            )`,
      }}
    >
      <h2 className="text-white text-xl md:text-4xl font-bold leading-relaxed max-w-5xl px-4">
        {data.description}
      </h2>

      <div className="flex md:hidden flex-col gap-4 mt-12 px-4 w-full max-w-md">
        <div className="flex gap-3 justify-center">
          {firstTwo.map((item, icon) => (
            <Link
              href={`/collections/${item.category?.slug || ""}`}
              key={icon}
              className="relative button-collections flex-1 h-auto bg-white border border-white/20 rounded-full backdrop-blur-md hover:bg-white/80 transition-all duration-300 hover:scale-95 active:scale-90 px-4 py-2 flex items-center justify-center gap-2"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${item.icon?.url}`}
                className="size-6 rounded-full object-cover"
                alt={item.category?.name || "Category icon"}
              />
              <span className="text-black text-sm font-bold whitespace-nowrap">
                {item.category?.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {remaining.map((item, i) => (
            <Link
              href={`/collections/${item.category?.slug || ""}`}
              key={i + 2}
              className="relative button-collections h-auto bg-white border border-white/20 rounded-full backdrop-blur-md hover:bg-white/80 transition-all duration-300 hover:scale-95 active:scale-90 px-4 py-2 flex items-center justify-center gap-2"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${item.icon?.url}`}
                className="size-6 rounded-full object-cover"
                alt={item.category?.name || "Category icon"}
              />
              <span className="text-black text-sm font-bold whitespace-nowrap">
                {item.category?.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div
        ref={collectionsRef}
        className="hidden md:flex flex-wrap justify-center gap-6 mt-20 px-4"
      >
        {data.items.map((item, icon) => (
          <Link
            href={`/collections/${item.category?.slug || ""}`}
            key={icon}
            className="relative button-collections h-auto bg-white border border-white/20 rounded-full backdrop-blur-md hover:bg-white/80 transition-all duration-300 hover:scale-95 active:scale-90 px-6 py-3 flex items-center justify-center gap-3"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${item.icon?.url}`}
              className="size-8 rounded-full object-cover"
              alt={item.category?.name || "Category icon"}
            />
            <span className="text-black text-lg font-bold">
              {item.category?.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
