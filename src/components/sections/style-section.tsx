"use client";

import { Button } from "@/components/ui/button";
import { MdOutlineArrowOutward } from "react-icons/md";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

interface Category {
  id: string;
  image: string;
  title: string;
  mainTitle: string;
  description1: string;
  description2: string;
  buttonText: string;
  mainImage: string;
  gridImages: string[];
}

export default function StyleSection() {
  const styleRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("2");

  const categories: Category[] = [
    {
      id: "1",
      image: "/assets/image/3.svg",
      title: "Winter Warmth",
      mainTitle: "WRAP YOURSELF IN WINTER WARMTH",
      description1:
        "Stay warm and stylish this winter! Explore cozy layers, trendy outerwear, and must-have essentials for the chilly season. From snuggly knits to bold boots, find pieces that bring the heat to your winter wardrobe. Wrap yourself in comfort and confidence-because cold weather deserves hot looks.",
      description2:
        "From plush textures to elegant finishes, every detail is chosen to enhance your winter experience. Embrace the season with confidence and comfort-because staying warm should always feel this good.",
      buttonText: "Wrap Yourself in Winter Warmth",
      mainImage: "/assets/image/my.png",
      gridImages: [
        "/assets/image/1.webp",
        "/assets/image/1.webp",
        "/assets/image/1.webp",
      ],
    },
    {
      id: "2",
      image: "/assets/image/4.svg",
      title: "Stylish Layers",
      mainTitle: "STYLISH LAYERS FOR THE PERFECT LOOK",
      description1:
        "Our curated collection for the perfect look features sleek jackets, smart knits, and versatile outerwear designed to keep you warm while making a statement. Top it off with timeless accessories that turn everyday moments into style milestones.",
      description2:
        "Designed to complement each other seamlessly, these layers offer endless outfit possibilities while keeping you comfortable in changing temperatures. Create depth, add dimension, and showcase your personal flair with every layer you wear.",
      buttonText: "Stylish Layers for the perfect look",
      mainImage: "/assets/image/1.webp",
      gridImages: [
        "/assets/image/my.png",
        "/assets/image/my.png",
        "/assets/image/my.png",
      ],
    },
    {
      id: "3",
      image: "/assets/image/2.svg",
      title: "Bold Basics",
      mainTitle: "STRONG STYLE FOR STRONG MOVES",
      description1:
        "From sharp tailoring to bold essentials, each piece is designed to empower your every move-whether you're closing deals, breaking boundaries, or making your mark. Dress like you mean it, because power looks better when it's personal.",
      description2:
        "With a fit that feels like a second skin and a look that commands attention, you'll stay focused, fierce, and ready to take on any challenge. Because when you look strong, you move even stronger.",
      buttonText: "Strong Style for Strong Moves",
      mainImage: "/assets/image/1.webp",
      gridImages: [
        "/assets/image/my.png",
        "/assets/image/my.png",
        "/assets/image/my.png",
      ],
    },
  ];

  const activeCategoryData =
    categories.find((cat) => cat.id === activeCategory) || categories[1];

  useGSAP(
    () => {
      if (window.innerWidth <= 768) return;

      gsap.set(".multi-image-container", { opacity: 0, scale: 0.8 });

      let splitTitle = new SplitText(".split-title", {
        type: "words",
        wordsClass: "word",
      });

      gsap.set(splitTitle.words, {
        transformOrigin: "0% 50%",
      });

      gsap.fromTo(
        ".title-main",
        { opacity: 1, y: 100 },
        {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".title-main",
            start: "bottom 35%",
            end: "bottom 25%",
            toggleActions: "play reverse play reverse",
            scrub: 2,
          },
        }
      );

      gsap.fromTo(
        ".title-description",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.in",
          scrollTrigger: {
            trigger: ".title-main",
            start: "center",
            end: "bottom",
            toggleActions: "play none none reverse",
            scrub: 1,
          },
        }
      );

      gsap.from(splitTitle.words, {
        scaleX: 0,
        autoAlpha: 0,
        x: -10,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".split-title",
          start: "45%",
          end: "bottom",
          scrub: 1.2,
          toggleActions: "play none none reverse",
        },
      });

      gsap.fromTo(
        ".category",
        { y: 300 },
        {
          y: 0,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".category",
            start: "top 25%",
            end: "top 25%",
            toggleActions: "play none none reverse",
            scrub: 1,
          },
        }
      );

      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".image-transform-trigger",
          start: "top center",
          end: "bottom top",
          scrub: 1,
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      mainTimeline
        .fromTo(
          ".single-image-container",
          { x: -550, scale: 0.5, opacity: 0.5 },
          {
            x: 0,
            scale: 1,
            duration: 3,
            opacity: 1,
            ease: "power3.inOut",
          }
        )
        .fromTo(
          ".button-wrapper",
          {
            width: "30%",
            opacity: 0,
          },
          {
            opacity: 1,
            width: "95%",
            duration: 1,
            ease: "power2.inOut",
          }
        )
        .to(".single-image-container", {
          opacity: 0,
          scale: 0.5,
          duration: 1,
          ease: "power4.in",
        })
        .to(
          ".multi-image-container",
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power3.inOut",
          },
          "-=0.2"
        )
        .from(
          ".image-item-1",
          {
            scale: 0.2,
            opacity: 0,
            duration: 0.3,
            ease: "power3.out",
          },
          "-=0.1"
        )
        .from(
          ".image-item-2",
          {
            scale: 0.2,
            opacity: 0,
            duration: 0.3,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .from(
          ".image-item-3",
          {
            scale: 0.2,
            opacity: 0,
            duration: 0.3,
            ease: "power3.out",
          },
          "-=0.2"
        );

      ScrollTrigger.create({
        trigger: styleRef.current,
        start: "top",
        end: "bottom",
        toggleActions: "play none none none",
        scrub: true,
        pin: true,
        pinSpacing: true,
      });
    },
    {
      scope: styleRef,
    }
  );

  return (
    <>
      {/* Desktop & Ipad */}
      <div className="hidden md:block" ref={styleRef}>
        <div className="relative w-full min-h-screen bg-black text-white px-8 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="lg:h-96 h-[900px] lg:w-1/2 w-9/11 rounded-full bg-lime-500/15 blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <div className="w-full flex justify-center">
              <div className="absolute max-w-6xl w-full flex justify-center items-center gap-6">
                <div className="title-main">
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-200 leading-tight font-rubik flex justify-center items-center text-center">
                    STYLE CRAFTED TO PERFECTION
                  </h1>
                  <p className="mt-8 text-base leading-relaxed opacity-80 font-inter flex justify-center items-center text-center">
                    Discover fashion that fits every mood! Explore our diverse
                    collections, from casual essentials to statement trends.
                    Find the perfect style for every occasion
                  </p>
                  <p className=""></p>
                </div>
              </div>
            </div>

            <div className="relative category z-40 w-full flex justify-center mb-16">
              <div className="max-w-6xl w-full flex justify-center items-center gap-6">
                {categories.map((category) => {
                  const isActive = activeCategory === category.id;

                  return (
                    <div
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`rounded-full h-20 flex items-center cursor-pointer transition-all duration-300
                      ${
                        isActive
                          ? "bg-white text-black shadow-md border-2 border-black justify-start w-[40%] gap-4 px-3"
                          : "bg-white/20 backdrop-blur-lg w-24 border border-white justify-center"
                      }
                    `}
                    >
                      <img
                        src={category.image}
                        alt={category.title}
                        className={`object-contain transition-all duration-300
                        ${
                          isActive
                            ? "w-[65px] h-[65px] absolute"
                            : "w-[70px] h-[70px]"
                        }
                      `}
                      />

                      {isActive && (
                        <h1 className="text-[26px] font-arial font-normal flex-1 text-center">
                          {category.title}
                        </h1>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative w-full flex justify-center z-0">
              <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center px-12">
                <div className="title-description">
                  <h1 className="split-title text-4xl md:text-3xl lg:text-5xl font-bold text-white leading-tight font-rubik max-w-[480px]">
                    {activeCategoryData.mainTitle}
                  </h1>

                  <p className="mt-8 text-xs lg:text-sm leading-relaxed opacity-80 font-inter max-w-2xl">
                    {activeCategoryData.description1}
                  </p>

                  <p className="mt-8 text-xs lg:text-sm leading-relaxed opacity-80 font-inter">
                    {activeCategoryData.description2}
                  </p>
                </div>

                <div className="image-transform-trigger relative w-full">
                  <div className="button-wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] z-30">
                    <div className="button bg-white text-black pl-4 pr-2 py-2.5 rounded-full shadow-xl flex items-center gap-3 w-full font-inter">
                      <span className="text-btn flex items-center flex-1 font-inter text-sm md:text-base lg:text-lg text-gray-900 truncate">
                        {activeCategoryData.buttonText}
                      </span>

                      <Button className="arrow-btn w-8 h-8 rounded-full bg-black text-white flex items-center justify-center cursor-pointer shrink-0">
                        <MdOutlineArrowOutward className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="single-image-container w-full z-10">
                    <div className="relative w-full h-[500px]">
                      <img
                        src={activeCategoryData.mainImage}
                        alt="model"
                        className="w-full h-[500px] object-cover rounded-3xl"
                      />
                    </div>
                  </div>

                  <div className="multi-image-container absolute inset-0 w-full">
                    <div className="px-4 grid grid-cols-2 gap-5 w-full">
                      <div className="image-item-1 w-full h-48 overflow-hidden rounded-2xl bg-gray-200">
                        <img
                          src={activeCategoryData.gridImages[0]}
                          alt="image-1"
                          className="w-full h-48 object-cover"
                        />
                      </div>

                      <div className="image-item-2 w-full h-48 overflow-hidden rounded-2xl bg-gray-200">
                        <img
                          src={activeCategoryData.gridImages[1]}
                          alt="image-2"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    </div>

                    <div className="px-4 mt-28">
                      <div className="image-item-3 w-full h-48 overflow-hidden rounded-2xl bg-gray-200">
                        <img
                          src={activeCategoryData.gridImages[2]}
                          alt="image-3"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden bg-white text-black min-h-screen px-4 py-12">
        <div className="w-full">
          <div className="w-full flex justify-center mb-8">
            <div className="max-w-6xl w-full">
              <div className="title-main">
                <h1 className="text-3xl font-medium text-gray-900 leading-tight font-rubik text-center">
                  STYLE CRAFTED TO PERFECTION
                </h1>
                <p className="mt-4 text-xs leading-relaxed text-gray-600 font-inter text-center">
                  Discover fashion that fits every mood! Explore our diverse
                  collections, from casual essentials to statement trends. Find
                  the perfect style for every occasion
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full flex justify-center mb-8">
            <div className="max-w-6xl w-full flex justify-center items-center gap-3">
              {categories.map((category) => {
                const isActive = activeCategory === category.id;

                return (
                  <div
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`rounded-full h-16 flex items-center cursor-pointer transition-all duration-300
                    ${
                      isActive
                        ? "bg-black text-white shadow-md border-2 border-black justify-start w-[60%] gap-4 px-3"
                        : " w-16 justify-center"
                    }
                  `}
                  >
                    <img
                      src={category.image}
                      alt={category.title}
                      className={`object-contain transition-all duration-300
                      ${isActive ? "w-12 h-12 absolute" : "w-12 h-12"}
                    `}
                    />

                    {isActive && (
                      <h1 className="text-lg font-arial font-normal flex-1 text-center pl-10">
                        {category.title}
                      </h1>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full my-8">
            <h1 className="text-2xl font-medium text-gray-900 leading-tight font-rubik">
              {activeCategoryData.mainTitle}
            </h1>
            <p className="mt-4 text-xs leading-relaxed text-gray-800 font-inter">
              {activeCategoryData.description1}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-gray-800 font-inter">
              {activeCategoryData.description2}
            </p>
          </div>

          <div className="w-full mb-6">
            <div className="relative w-full h-64">
              <img
                src={activeCategoryData.mainImage}
                alt="model"
                className="w-full h-64 object-cover rounded-3xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="w-full h-40 overflow-hidden rounded-2xl bg-gray-200">
              <img
                src={activeCategoryData.gridImages[0]}
                alt="image-1"
                className="w-full h-40 object-cover"
              />
            </div>
            <div className="w-full h-40 overflow-hidden rounded-2xl bg-gray-200">
              <img
                src={activeCategoryData.gridImages[1]}
                alt="image-2"
                className="w-full h-40 object-cover"
              />
            </div>
          </div>

          <div className="w-full mb-4">
            <div className="button bg-white text-black pl-4 pr-2 py-3 rounded-full flex items-center gap-3 w-full font-inter">
              <span className="flex items-center flex-1 font-inter text-sm text-black truncate">
                {activeCategoryData.buttonText}
              </span>
              <Button className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center cursor-pointer shrink-0">
                <MdOutlineArrowOutward className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="w-full">
            <div className="w-full h-40 overflow-hidden rounded-2xl bg-gray-200">
              <img
                src={activeCategoryData.gridImages[2]}
                alt="image-3"
                className="w-full h-40 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
