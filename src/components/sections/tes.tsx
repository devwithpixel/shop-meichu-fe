"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { useGSAP } from "@gsap/react";
import { Progress } from "../ui/progress";

gsap.registerPlugin(ScrollTrigger);

export default function AdvantageSection() {
  const [progress, setProgress] = useState(0);
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
      },
    });

    gsap.to(".leftBox", {
      opacity: 0,
      scale: 0,
      ease: "power4.in",
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        end: () => `+=${totalScroll * 1}`,
        scrub: 1,
        markers: true,
      },
    });
  }, []);

  const items = [
    {
      id: 1,
      img: "https://maya-theme-empower.myshopify.com/cdn/shop/files/Slide-1_Jacket_1.webp?v=1746436222&width=1400",
      badge: "Grace, Glamour, Style, Confidence",
      title: "Elegant Evening Wear",
    },
    {
      id: 2,
      img: "https://maya-theme-empower.myshopify.com/cdn/shop/files/slide-4_cap.webp?v=1748594740&width=1400",
      badge: "Warm, Cozy, Elegant, Premium",
      title: "Luxury Winter Collection",
    },
    {
      id: 3,
      img: "https://maya-theme-empower.myshopify.com/cdn/shop/files/slide-3_1.webp?v=1746436222&width=1400",
      badge: "Classic, Everyday, Stylish, Premium",
      title: "Timeless Wardrobe Essentials",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-gray-100 overflow-x-hidden sm:h-screen sm:overflow-hidden"
    >
      <div className="w-full flex flex-col sm:flex-row sm:items-center py-10">
        {/* LEFT BOX */}
        <div className="leftBox sm:min-w-[28%] max-w-86 sm:max-w-96 space-y-5 mb-10 sm:mb-0 mx-5 sm:ml-16 sm:mr-20">
          <h1 className="font-medium text-3xl sm:text-5xl font-rubik">
            <span className="text-transparent text-outline">FASHION</span> THAT
            FLOWS WITH THE SEASONS
          </h1>

          <p className="font-rubik text-xs">
            Explore our latest collection of timeless fashion. From classic
            styles to modern trends, find the perfect look for every season.
            Shop now and elevate your wardrobe!
          </p>

          <div className="flex items-center gap-0.5 cursor-pointer group">
            <HiOutlineArrowUpRight className="w-10 h-10 z-1 sm:z-0 sm:w-14 sm:h-14 text-white sm:text-black bg-black sm:bg-white border border-black rounded-full p-3 sm:p-4 sm:transition-all sm:duration-300 -mr-11.5 sm:mr-0 sm:group-hover:-mr-14.5 sm:group-hover:bg-black sm:group-hover:text-white sm:group-hover:scale-90" />
            <p className="bg-white px-4 sm:px-8 py-2.5 sm:py-4 border border-black rounded-full whitespace-nowrap pl-14 sm:pl-8 sm:transition-all sm:duration-300 sm:group-hover:pl-22.5">
              Explore More
            </p>
          </div>
        </div>

        <div
          ref={wrapperRef}
          className="w-full sm:flex-1 overflow-x-auto sm:overflow-visible me-4"
        >
          <div className="flex gap-8 sm:gap-12 px-5 sm:px-0 sm:pr-16 mb-6 pe-4">
            {items.map((item) => (
              <div key={item.id} className="relative overflow-x-visible">
                <div className="w-fit p-1 sm:p-2.5 rounded-2xl sm:rounded-4xl flex items-center justify-center shadow-md bg-white">
                  <div className="rounded-xl sm:rounded-3xl group overflow-hidden">
                    <img
                      src={item.img}
                      className="max-w-120 max-h-52 md:max-w-200 md:max-h-110 rounded-xl sm:rounded-3xl transition-transform duration-800 ease-out group-hover:scale-105 group-hover:-rotate-1"
                    />
                  </div>
                </div>

                <p className="absolute text-sm sm:text-base max-w-40 sm:max-w-56 z-10 px-1 sm:px-6 py-1 sm:py-4 bg-white w-fit border border-gray-300 rounded-md sm:rounded-2xl bottom-31 sm:bottom-36 -left-4 sm:-left-7">
                  {item.badge}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-center gap-2 sm:gap-8 mt-5">
                  <p className="font-rubik font-semibold text-xl sm:text-3xl">
                    {item.title}
                  </p>
                  <button className="text-xs px-4 sm:px-8 py-2.5 sm:py-4 border border-gray-800 rounded-full bg-transparent hover:bg-white cursor-pointer">
                    SHOP NOW
                  </button>
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
