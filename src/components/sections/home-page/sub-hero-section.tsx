"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

import type { SubHeroSection } from "@/types/strapi/components/home-page/sub-hero-section";

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

    const buttons = gsap.utils.selector(collectionsRef.current!)("button");

    if (isMobile) {
      gsap.fromTo(
        buttons,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: collectionsRef.current!,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    } else {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: collectionsRef.current!,
          start: "top bottom",
          scrub: 1,
        },
      });

      buttons.forEach((button, i) =>
        tl.fromTo(
          button,
          {
            y: 80 * (i % 2 ? 1 : -1),
          },
          {
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          i && "<"
        )
      );
    }
  }, []);

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

      <div
        ref={collectionsRef}
        className="flex flex-wrap justify-center gap-6 mt-20 px-4"
      >
        {data.items.map((item, i) => (
          <Button
            key={i}
            className="relative button-collections h-auto! bg-white border border-white/20 rounded-full backdrop-blur-md hover:bg-white/80 transition-all"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${item.icon?.url}`}
              className="size-8 rounded-full object-cover"
              alt={item.category?.name || "Category icon"}
            />
            <span className="text-black text-lg font-bold">
              {item.category?.name}
            </span>
          </Button>
        ))}
      </div>
    </section>
  );
}
