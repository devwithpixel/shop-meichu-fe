"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ReactNode, useRef, useState } from "react";

import OverviewSection from "./overview-section";
import DescriptionSection from "./description-section";
import SpecificationsSection from "./specifications-section";
import ProductCard from "@/components/card/product-card";

import type { Product } from "@/types/strapi/models/product";

gsap.registerPlugin(ScrollTrigger);

interface ProductSection {
  label: string;
  component: ReactNode;
}

interface ProductDetailSectionProps {
  product: Product;
  relatedProducts?: Product[];
}

export default function ProductDetailSection({
  product,
  relatedProducts = [],
}: ProductDetailSectionProps) {
  console.log(product);
  const [active, setActive] = useState(0);

  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const sections: ProductSection[] = [
    {
      label: "OVERVIEW",
      component: <OverviewSection product={product} />,
    },
    {
      label: "DESCRIPTION",
      component: (
        <DescriptionSection
          image={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.images?.[0]?.url || ""}`}
        />
      ),
    },
    {
      label: "SPECIFICATIONS",
      component: <SpecificationsSection product={product} />,
    },
  ];

  useGSAP(() => {
    const updateIndicator = () => {
      const btn = buttonsRef.current[active];
      if (!btn || !indicatorRef.current) return;

      gsap.to(indicatorRef.current, {
        x: btn.offsetLeft,
        width: btn.offsetWidth,
        duration: 0.5,
        ease: "sine.out",
      });
    };

    updateIndicator();

    sectionRefs.current.forEach((el, i) => {
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: i === 0 ? "top top" : "top 60%",
        end: "bottom 40%",
        onEnter: () => {
          setActive(i);
        },
        onEnterBack: () => {
          setActive(i);
        },
        onLeave: () => {
          if (i < sectionRefs.current.length - 1) {
            setActive(i + 1);
          }
        },
        onLeaveBack: () => {
          if (i > 0) {
            setActive(i - 1);
          }
        },
      });
    });

    const first = sectionRefs.current[0];
    if (first && navRef.current) {
      ScrollTrigger.create({
        trigger: first,
        start: "bottom bottom",
        end: "bottom top",
        scrub: 0.6,
        onUpdate: (self) => {
          gsap.set(navRef.current, {
            bottom: `${
              2 + (self.progress * (window.innerHeight - 64)) / 16
            }rem`,
          });
        },
        onLeave: () => {
          navRef.current!.style.top = "2rem";
          navRef.current!.style.bottom = "auto";
        },
        onEnterBack: () => {
          navRef.current!.style.bottom = "2rem";
          navRef.current!.style.top = "auto";
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [active]);

  const scrollTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {sections.map((s, i) => (
        <section
          key={i}
          ref={(el) => {
            sectionRefs.current[i] = el;
          }}
        >
          {s.component}
        </section>
      ))}

      {/* <div className="bg-white px-6 py-20">
        <h1 className="font-rubik text-5xl font-semibold mb-12">
          More to Explore
        </h1>
        <div className="flex items-center justify-start gap-3 overflow-x-scroll scrollbar-hide overflow-y-hidden">
          {relatedProducts.map((item) => (
            <TrendingProduct key={item.id} product={item} />
          ))}
        </div>
      </div> */}

      {/* Navbar tetap di dalam ProductDetailSection */}
      <nav
        ref={navRef}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 backdrop-blur-md bg-white/60 rounded-full shadow-lg px-1 py-1 z-50"
      >
        <div className="relative flex gap-1">
          <div
            ref={indicatorRef}
            className="absolute h-full bg-black rounded-full"
          />

          {sections.map((s, i) => (
            <button
              key={i}
              ref={(el) => {
                buttonsRef.current[i] = el;
              }}
              onClick={() => scrollTo(i)}
              className={`relative z-10 px-5 lg:px-6 py-2.5 text-xs font-semibold rounded-full transition-colors ${
                active === i ? "text-white" : "text-gray-800"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
