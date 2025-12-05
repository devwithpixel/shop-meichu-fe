"use client";

import { useMemo, useRef, useState } from "react";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { useGSAP } from "@gsap/react";
import { splitText } from "@/lib/splitText";
import { Progress } from "@/components/ui/progress";
import Image from "@/components/global/image";
import gsap from "gsap";

import type { BenefitSection } from "@/types/strapi/components/home-page/benefit-section";
import Link from "next/link";

export default function BenefitSection({ data }: { data: BenefitSection }) {
  const [progress, setProgress] = useState(0);
  const [titleFirstWord, titleRestWord] = useMemo(
    () => splitText(data.section.title),
    [data.section.title]
  );
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (window.innerWidth <= 748) return;

    if (!sectionRef.current || !wrapperRef.current) return;
    gsap.set(".leftBox", { opacity: 1, scale: 1 });

    const section = sectionRef.current;
    const wrapper = wrapperRef.current;

    const rect = wrapper.getBoundingClientRect();
    const totalScroll = rect.x + rect.width - window.innerWidth;

    let targetProgress = 0;
    let currentProgress = 0;

    gsap.ticker.add(() => {
      currentProgress += (targetProgress - currentProgress) * 0.1;
      setProgress(currentProgress);
    });

    gsap.to(wrapper, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalScroll * 2}`,
        scrub: 3,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          targetProgress = self.progress * 100;
        },
        // markers: true
      },
    });

    gsap.to(".leftBox", {
      opacity: 0,
      scale: 0,
      ease: "power4.in",
      scrollTrigger: {
        trigger: section,
        start: "70% 90%",
        end: () => `+=${totalScroll * 1}`,
        scrub: 1,
        // markers: true
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-fit sm:min-h-screen bg-white flex flex-col items-center justify-center overflow-x-hidden sm:h-screen sm:overflow-hidden"
    >
      <div className="hidden md:block w-auto h-auto absolute inset-0 z-0 rounded-4xl bg-gray-100 mx-6 md:my-20 lg:my-10">
        <Image
          src="./assets/image/slide.png"
          // src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${data.background}`}
          alt={data.section.title}
          className="w-full h-full object-cover opacity-20 rounded-4xl"
        />
      </div>

      <div className="w-full flex flex-col sm:flex-row sm:items-center py-10">
        <div className="leftBox min-w-90 lg:min-w-[28%] max-w-86 sm:max-w-96 space-y-5 mb-10 sm:mb-0 mx-5 lg:ml-16 md:mx-20 lg:mr-20">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold font-albert-sans">
            <span className="text-transparent text-outline-black">
              {`${titleFirstWord}`}
            </span>{" "}
            {titleRestWord}
          </h1>
          <p className="font-albert-sans text-xs font-medium">
            {data.section.description}
          </p>
          <Link
            href="/collections"
            className="flex items-center gap-0.5 cursor-pointer group w-fit"
          >
            <HiOutlineArrowUpRight className="w-10 h-10 z-1 sm:z-0 sm:w-14 sm:h-14 text-white sm:text-black bg-black sm:bg-white border border-black rounded-full p-3 sm:p-4 sm:transition-all sm:duration-300 -mr-11.5 sm:mr-0 sm:group-hover:-mr-14.5 sm:group-hover:bg-black sm:group-hover:text-white sm:group-hover:scale-90" />
            <p className="bg-white px-4 sm:px-8 py-2.5 sm:py-4 border border-black rounded-full whitespace-nowrap pl-14 sm:pl-8 sm:transition-all sm:duration-300 sm:group-hover:pl-22.5 font-albert-sans font-medium">
              {data.ctaButton.title}
            </p>
          </Link>
        </div>

        <div
          ref={wrapperRef}
          className="w-full sm:min-w-max sm:flex-1 overflow-x-auto sm:overflow-visible me-4"
        >
          <div className="flex gap-8 sm:gap-12 px-5 sm:px-0 sm:pr-16 mb-6 pe-4">
            {data.items.map((item) => (
              <div key={item.id} className="relative overflow-x-visible">
                <div className="w-fit p-1 sm:p-2.5 rounded-2xl sm:rounded-4xl flex items-center justify-center shadow-md bg-white">
                  <div className="rounded-xl sm:rounded-3xl group overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${item.product?.images?.[0]?.url}`}
                      alt={item.product?.name}
                      className="object-cover max-w-160 w-96 h-70 max-h-52 md:max-w-none md:max-h-none md:w-160 md:h-110 rounded-xl sm:rounded-3xl transition-transform duration-800 ease-out group-hover:scale-105 group-hover:-rotate-1"
                    />
                  </div>
                </div>

                <p className="absolute text-sm sm:text-base max-w-40 sm:max-w-56 z-10 px-1 sm:px-6 py-1 sm:py-4 bg-white w-fit border border-gray-300 rounded-md sm:rounded-2xl bottom-31 sm:bottom-36 -left-4 sm:-left-7 font-albert-sans">
                  {item.badge}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-center gap-2 sm:gap-8 mt-5 font-albert-sans">
                  <p className="font-albert-sans font-semibold text-xl sm:text-3xl">
                    {item.product?.name}
                  </p>
                  <Link
                    href={`/products/${item.product?.slug}`}
                    className="text-xs font-medium px-4 sm:px-8 py-2.5 sm:py-4 border border-gray-800 rounded-full bg-transparent hover:bg-white cursor-pointer"
                  >
                    SHOP NOW
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Progress
        value={progress}
        className="hidden sm:block -top-10 w-[90vw] h-1 mt-8 mx-auto"
      />
    </section>
  );
}
