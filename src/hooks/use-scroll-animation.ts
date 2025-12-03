import { useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationRefs {
  sectionRef: RefObject<HTMLDivElement>;
  detailRef: RefObject<HTMLDivElement>;
  imageListRef: RefObject<HTMLDivElement>;
}

export const useScrollAnimation = (): ScrollAnimationRefs => {
  // Cast ke tipe yang diinginkan saat deklarasi
  const sectionRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const detailRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const imageListRef = useRef<HTMLDivElement>(
    null
  ) as RefObject<HTMLDivElement>;

  useGSAP(
    () => {
      if (typeof window === "undefined" || window.innerWidth < 768) return;

      if (!sectionRef.current || !detailRef.current || !imageListRef.current) {
        return;
      }

      const section = sectionRef.current;
      const detailContent = detailRef.current;
      const imageList = imageListRef.current;

      detailContent.scrollTop = 0;
      imageList.scrollTop = 0;

      ScrollTrigger.refresh();

      const imageScroll = imageList.scrollHeight - imageList.clientHeight;
      const detailScroll =
        detailContent.scrollHeight - detailContent.clientHeight;

      const totalScrollDistance = imageScroll + detailScroll;

      const imagePhaseEnd = imageScroll / totalScrollDistance;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${totalScrollDistance}`,
        pin: true,
        scrub: 4,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const progress = self.progress;

          if (progress <= imagePhaseEnd) {
            const imageProgress = progress / imagePhaseEnd;

            gsap.to(imageList, {
              scrollTop: imageProgress * imageScroll,
              duration: 0.5,
              ease: "none",
            });
            detailContent.scrollTop = 0;
          } else {
            const detailProgress =
              (progress - imagePhaseEnd) / (1 - imagePhaseEnd);

            gsap.to(detailContent, {
              scrollTop: detailProgress * detailScroll,
              duration: 0.5,
              ease: "none",
            });

            imageList.scrollTop = imageScroll;
          }
        },
        onEnter: () => {
          if (detailContent && imageList) {
            detailContent.style.overflow = "hidden";
            imageList.style.overflow = "hidden";
          }
        },

        onEnterBack: () => {
          if (detailContent && imageList) {
            detailContent.style.overflow = "hidden";
            imageList.style.overflow = "hidden";
          }
        },
      });
    },
    { dependencies: [], scope: sectionRef }
  );

  return { sectionRef, detailRef, imageListRef };
};
