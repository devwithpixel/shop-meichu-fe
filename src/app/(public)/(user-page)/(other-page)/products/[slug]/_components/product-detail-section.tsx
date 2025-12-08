"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  createRef,
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import OverviewSection from "./sections/overview-section";
import DescriptionSection from "./sections/description-section";
import SpecificationsSection from "./sections/specifications-section";
import ProductCard from "@/components/card/product-card";
import NoScrollSmootherContent from "@/components/no-scroll-smoother-content";

import type { Product } from "@/types/strapi/models/product";

interface ProductDetailSectionProps {
  product: Product;
  relatedProducts?: Product[];
}

interface SectionInfo {
  label: string;
  ref: React.RefObject<HTMLDivElement | null>;
}

interface SectionRefType {
  overview: SectionInfo;
  description: SectionInfo;
  specification: SectionInfo;
}

export default function ProductDetailSection({
  product,
  relatedProducts,
}: ProductDetailSectionProps) {
  const [active, setActive] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const sections = useMemo<SectionRefType>(
    () => ({
      overview: {
        label: "OVERVIEW",
        ref: createRef<HTMLDivElement | null>(),
      },
      description: {
        label: "DESCRIPTION",
        ref: createRef<HTMLDivElement | null>(),
      },
      specification: {
        label: "SPECIFICATIONS",
        ref: createRef<HTMLDivElement | null>(),
      },
    }),
    []
  );

  const { contextSafe } = useGSAP(() => {
    if (
      !sections.overview.ref.current ||
      !sections.description.ref.current ||
      !sections.specification.ref.current ||
      !navRef.current
    )
      return;

    gsap.set(navRef.current, {
      bottom: "2rem",
      top: "auto",
    });

    const isMobile = window.innerWidth < 768;
    const startPosition = isMobile ? "top 30%" : "top 60%";

    (Object.values(sections) as SectionInfo[]).forEach((el, i) => {
      if (!el.ref.current) return;

      ScrollTrigger.create({
        trigger: el.ref.current,
        start: i === 0 ? "top top" : startPosition,
        end: isMobile ? "bottom 90%" : "bottom 40%",
        onEnter: () => {
          setActive(i);
        },
        onEnterBack: () => {
          setActive(i);
        },
      });
    });

    ScrollTrigger.create({
      trigger: sections.description.ref.current,
      start: "top bottom-=100",
      end: "top top",
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const fromBottom = 2;
        const toTop = 5;
        const viewportHeight = window.innerHeight / 16;

        const currentBottom =
          fromBottom + progress * (viewportHeight - fromBottom - toTop);

        if (progress < 1) {
          gsap.set(navRef.current, {
            bottom: `${currentBottom}rem`,
            top: "auto",
          });
        } else {
          gsap.set(navRef.current, {
            top: `${toTop}rem`,
            bottom: "auto",
          });
        }
      },
      onLeaveBack: () => {
        gsap.set(navRef.current, {
          bottom: "2rem",
          top: "auto",
        });
      },
    });
  }, []);

  const updateIndicator = contextSafe(() => {
    const btn = buttonsRef.current[active];
    if (!btn || !indicatorRef.current) return;

    gsap.to(indicatorRef.current, {
      x: btn.offsetLeft,
      width: btn.offsetWidth,
      duration: 0.5,
      ease: "sine.out",
    });
  });

  const navigationScrollTo = useCallback(
    (ref: React.RefObject<HTMLDivElement | null>) => {
      if (!ref.current) return;

      const offsetTop =
        ref.current.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    },
    []
  );

  useEffect(() => {
    updateIndicator();
  }, [active]);

  return (
    <>
      <OverviewSection ref={sections.overview.ref} product={product} />
      <DescriptionSection
        ref={sections.description.ref}
        description={product.description}
        image={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.images?.[0]?.url || ""}`}
      />
      <SpecificationsSection
        ref={sections.specification.ref}
        product={product}
      />

      <div className="bg-white px-6 py-20">
        <h1 className="font-rubik text-5xl font-semibold mb-12">
          More to Explore
        </h1>
        <div className="flex items-center justify-start gap-3 overflow-x-scroll scrollbar-hide overflow-y-hidden">
          {relatedProducts?.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>

      <NoScrollSmootherContent>
        <nav
          ref={navRef}
          className="fixed h-fit left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 backdrop-blur-md bg-white/60 rounded-full shadow-lg px-1 py-1 z-50"
        >
          <div className="relative flex gap-1">
            <div
              ref={indicatorRef}
              className="absolute h-full bg-black rounded-full"
            />
            {(Object.values(sections) as SectionInfo[]).map((value, i) => (
              <button
                key={value.label}
                ref={(el) => {
                  buttonsRef.current[i] = el;
                }}
                onClick={() => navigationScrollTo(value.ref)}
                className={`relative z-10 px-5 lg:px-6 py-2.5 text-xs font-semibold rounded-full transition-colors ${
                  active === i ? "text-white" : "text-gray-800"
                }`}
              >
                {value.label}
              </button>
            ))}
          </div>
        </nav>
      </NoScrollSmootherContent>
    </>
  );
}
