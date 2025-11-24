"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

import OverviewSection from "@/components/sections/overview-section";
import DescriptionSection from "@/components/sections/description-section";
import SpecificationsSection from "@/components/sections/specifications-section";
import { products } from "@/lib/data/product";
import { productDesc } from "@/lib/data/descProduct";

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetailPage() {
  const product = products[0];
  const relatedProducts = products.filter((p) => p.id !== product.id);

  const [active, setActive] = useState(0);

  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const sections = [
    {
      label: "OVERVIEW",
      component: (
        <OverviewSection product={product} relatedProducts={relatedProducts} />
      ),
    },
    {
      label: "DESCRIPTION",
      component: (
        <DescriptionSection desc={productDesc} image={product.images.front} />
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
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setActive(i);
          updateIndicator();
        },
        onEnterBack: () => {
          setActive(i);
          updateIndicator();
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

      <nav
        ref={navRef}
        className="fixed bottom-8 left-8 bg-white rounded-full shadow-lg px-1.5 py-1.5 z-50"
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
              className={`relative z-10 px-6 py-3 text-sm font-semibold rounded-full transition-colors ${
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
