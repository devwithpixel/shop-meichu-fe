"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ReactNode, useRef, useState } from "react";
import * as React from "react";
import ReactDOM from "react-dom";

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
  const [active, setActive] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);

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

  React.useEffect(() => {
    console.log("Navbar ref:", navRef.current);
  }, []);

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
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      });
    });

    const descriptionSection = sectionRefs.current[1];

    if (!descriptionSection || !navRef.current) return;

    const nav = navRef.current;

    gsap.set(nav, { bottom: "2rem", top: "auto" });

    ScrollTrigger.create({
      trigger: descriptionSection,
      start: "top bottom-=100",
      end: "top top",
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const fromBottom = 2;
        const toTop = 2;
        const viewportHeight = window.innerHeight / 16;

        const currentBottom =
          fromBottom + progress * (viewportHeight - fromBottom - toTop);

        if (progress < 1) {
          gsap.set(nav, { bottom: `${currentBottom}rem`, top: "auto" });
        } else {
          gsap.set(nav, { top: `${toTop}rem`, bottom: "auto" });
        }
      },
      onLeaveBack: () => {
        gsap.set(nav, { bottom: "2rem", top: "auto" });
      },
    });
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

      {/* Navbar dengan Portal */}
      {typeof document !== "undefined" &&
        ReactDOM.createPortal(
          <nav
            ref={navRef}
            className="fixed left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 backdrop-blur-md bg-white/60 rounded-full shadow-lg px-1 py-1 z-10"
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
          </nav>,
          document.body
        )}
    </>
  );
}
