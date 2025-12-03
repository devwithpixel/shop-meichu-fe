import { useRef, useState, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ProductNavigationReturn {
  activeSection: number;
  navRef: RefObject<HTMLElement | null>;
  indicatorRef: RefObject<HTMLDivElement | null>;
  buttonsRef: RefObject<(HTMLButtonElement | null)[]>;
  sectionRefs: RefObject<(HTMLElement | null)[]>;
  scrollToSection: (index: number) => void;
}

export const useProductNavigation = (
  sectionsCount: number
): ProductNavigationReturn => {
  const [activeSection, setActiveSection] = useState(0);

  const navRef = useRef<HTMLElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useGSAP(() => {
    const updateIndicator = () => {
      const btn = buttonsRef.current[activeSection];
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
          setActiveSection(i);
        },
        onEnterBack: () => {
          setActiveSection(i);
        },
        onLeave: () => {
          if (i < sectionRefs.current.length - 1) {
            setActiveSection(i + 1);
          }
        },
        onLeaveBack: () => {
          if (i > 0) {
            setActiveSection(i - 1);
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
          if (navRef.current) {
            gsap.set(navRef.current, {
              bottom: `${
                2 + (self.progress * (window.innerHeight - 64)) / 16
              }rem`,
            });
          }
        },
        onLeave: () => {
          if (navRef.current) {
            navRef.current.style.top = "2rem";
            navRef.current.style.bottom = "auto";
          }
        },
        onEnterBack: () => {
          if (navRef.current) {
            navRef.current.style.bottom = "2rem";
            navRef.current.style.top = "auto";
          }
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [activeSection]);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return {
    activeSection,
    navRef,
    indicatorRef,
    buttonsRef,
    sectionRefs,
    scrollToSection,
  };
};
