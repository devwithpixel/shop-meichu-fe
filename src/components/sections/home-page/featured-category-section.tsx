"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { FeaturedCategorySection } from "@/types/strapi/components/home-page/featured-category-section";

interface HeroData {
  image: string;
  title: string;
  description: string;
}

interface TextCard {
  type: "text";
  bg: string;
  textColor: string;
  title: string;
  description: string;
  hasButton?: boolean;
}

interface ImageCard {
  type: "image";
  image: string;
}

type CardData = TextCard | ImageCard;

interface GalleryItem {
  id: number;
  hero: HeroData;
  cards: CardData[];
}

const galleryData: GalleryItem[] = [
  {
    id: 1,
    hero: {
      image: "/assets/gallery/girl1.webp",
      title: "Stay Warm & Stylish",
      description:
        "Stay cozy without compromising on style with our Stay Warm & Stylish collection.",
    },
    cards: [
      {
        type: "text",
        bg: "#e6dbcc",
        textColor: "#634d11",
        title: "Stylish & Functional",
        description:
          "Discover the perfect blend of style & practicality with our Stylish & Functional collection.",
      },
      {
        type: "image",
        image: "/assets/gallery/girl3.jpg",
      },
      {
        type: "image",
        image: "/assets/gallery/girl2.jpg",
      },
      {
        type: "text",
        bg: "#c69d9d",
        textColor: "#461033",
        title: "Casual Outfits",
        description:
          "Effortless style meets everyday comfort in our Casual & Everyday Outfits collection.",
        hasButton: true,
      },
      {
        type: "image",
        image: "/assets/gallery/girl4.jpg",
      },
      {
        type: "text",
        bg: "#eafce3",
        textColor: "#114a10",
        title: "Eco-Friendly Styles",
        description:
          "Explore our collection and make a difference with every outfit you wear.",
      },
      {
        type: "text",
        bg: "#eadcf5",
        textColor: "#440E6F",
        title: "Trendy & Comfort",
        description:
          "Trendy & Comfortable collection combines the latest trends.",
      },
    ],
  },
  {
    id: 2,
    hero: {
      image: "/assets/gallery/girl4.jpg",
      title: "Modern & Chic",
      description:
        "Embrace contemporary fashion with our Modern & Chic collection that defines elegance.",
    },
    cards: [
      {
        type: "text",
        bg: "#d4a5a5",
        textColor: "#2d0a0a",
        title: "Urban Style",
        description:
          "City-inspired fashion that blends comfort with street-smart aesthetics.",
      },
      {
        type: "image",
        image: "/assets/gallery/girl2.jpg",
      },
      {
        type: "image",
        image: "/assets/gallery/girl3.jpg",
      },
      {
        type: "text",
        bg: "#b8d4e3",
        textColor: "#0a2d3d",
        title: "Elegant Wear",
        description:
          "Sophisticated designs for those special moments and formal occasions.",
        hasButton: true,
      },
      {
        type: "image",
        image: "/assets/gallery/girl1.webp",
      },
      {
        type: "text",
        bg: "#ffd4e5",
        textColor: "#4d0a20",
        title: "Summer Vibes",
        description:
          "Light and breezy outfits perfect for warm weather adventures.",
      },
      {
        type: "text",
        bg: "#e3d4ff",
        textColor: "#2d0a4d",
        title: "Classic Collection",
        description:
          "Timeless pieces that never go out of style, perfect for any wardrobe.",
      },
    ],
  },
];

export default function FeaturedCategorySection({
  data,
}: {
  data: FeaturedCategorySection;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isPosition, setIsPosition] = useState("right");
  const [isAnimating, setIsAnimating] = useState(false);

  const currentData: GalleryItem = galleryData[currentIndex];
  const nextData: GalleryItem = galleryData[nextIndex];

  const handleNext = (): void => {
    if (isAnimating) return;

    const newIndex = (currentIndex + 1) % galleryData.length;
    setNextIndex(newIndex);
    setIsPosition("right");
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 500);
  };

  const handlePrev = (): void => {
    if (isAnimating) return;

    const newIndex =
      (currentIndex - 1 + galleryData.length) % galleryData.length;
    setNextIndex(newIndex);
    setIsPosition("left");
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 500);
  };

  const getSlideAnimation = () => {
    if (isPosition === "right") {
      return "animate-in slide-in-from-right-full duration-500";
    } else {
      return "animate-in slide-in-from-left-full duration-500";
    }
  };

  const getExitAnimation = () => {
    if (isPosition === "right") {
      return "animate-out slide-out-to-left-full duration-500";
    } else {
      return "animate-out slide-out-to-right-full duration-500";
    }
  };

  const renderCardMobile = (
    cardIndex: number,
    currentCard: CardData,
    nextCard: CardData,
    heightClass?: string,
    extraClass?: string
  ) => {
    if (currentCard.type === "text" && nextCard.type === "text") {
      return (
        <div
          className={`rounded-3xl overflow-hidden relative h-full ${extraClass || ""}`}
        >
          {isAnimating && (
            <div
              className={`absolute inset-0 z-10 p-6 flex flex-col ${getExitAnimation()}`}
              style={{
                backgroundColor: currentCard.bg,
                color: currentCard.textColor,
              }}
            >
              <ScrollArea
                className={`${heightClass || "h-52"} w-full overflow-y-auto`}
              >
                <div className="space-y-3">
                  <h3 className="text-2xl font-medium font-rubik">
                    {currentCard.title}
                  </h3>
                  <p className="text-sm mt-1 font-inter">
                    {currentCard.description}
                  </p>
                  {currentCard.hasButton && (
                    <Button className="mt-2 bg-black text-white px-6 py-4 rounded-full w-fit">
                      SHOP NOW
                    </Button>
                  )}
                </div>
              </ScrollArea>
            </div>
          )}

          <div
            className={`w-full h-full p-6 flex flex-col ${isAnimating ? getSlideAnimation() : ""}`}
            style={{
              backgroundColor: isAnimating ? nextCard.bg : currentCard.bg,
              color: isAnimating ? nextCard.textColor : currentCard.textColor,
            }}
          >
            <ScrollArea
              className={`${heightClass || "h-52"} w-full overflow-y-auto`}
            >
              <div className="space-y-3">
                <h3 className="text-2xl font-medium font-rubik">
                  {isAnimating ? nextCard.title : currentCard.title}
                </h3>
                <p className="text-sm mt-1 font-inter">
                  {isAnimating ? nextCard.description : currentCard.description}
                </p>
                {(isAnimating ? nextCard.hasButton : currentCard.hasButton) && (
                  <Button className="mt-2 bg-black text-white px-6 py-4 rounded-full w-fit">
                    SHOP NOW
                  </Button>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      );
    } else if (currentCard.type === "image" && nextCard.type === "image") {
      return (
        <div
          className={`rounded-3xl overflow-hidden relative h-full ${extraClass || ""}`}
        >
          {isAnimating && (
            <div className={`absolute inset-0 z-10 ${getExitAnimation()}`}>
              <img
                src={currentCard.image}
                className="object-cover w-full h-full min-h-full"
                alt="Gallery"
              />
            </div>
          )}

          <div
            className={`w-full h-full ${isAnimating ? getSlideAnimation() : ""}`}
          >
            <img
              src={isAnimating ? nextCard.image : currentCard.image}
              className="object-cover w-full h-full min-h-full"
              alt="Gallery"
            />
          </div>
        </div>
      );
    }
    return null;
  };

  const renderCard = (
    cardIndex: number,
    currentCard: CardData,
    nextCard: CardData,
    heightClass?: string
  ) => {
    if (currentCard.type === "text" && nextCard.type === "text") {
      return (
        <div className="rounded-4xl overflow-hidden relative h-full">
          {isAnimating && (
            <div
              className={`absolute inset-0 z-10 px-6 py-10 flex flex-col gap-4 ${getExitAnimation()}`}
              style={{
                backgroundColor: currentCard.bg,
                color: currentCard.textColor,
              }}
            >
              <ScrollArea
                className={`${heightClass || "h-80"} w-full overflow-y-auto`}
              >
                <div className="pr-4 space-y-3">
                  <h3 className="text-3xl font-medium font-rubik">
                    {currentCard.title}
                  </h3>
                  <p className="text-sm font-normal font-inter whitespace-pre-line">
                    {currentCard.description}
                  </p>
                  {currentCard.hasButton && (
                    <Button className="bg-black text-white px-8 py-6 rounded-full w-fit shrink-0">
                      SHOP NOW
                    </Button>
                  )}
                </div>
              </ScrollArea>
            </div>
          )}

          <div
            className={`w-full h-full px-6 py-10 flex flex-col gap-4 ${isAnimating ? getSlideAnimation() : ""}`}
            style={{
              backgroundColor: isAnimating ? nextCard.bg : currentCard.bg,
              color: isAnimating ? nextCard.textColor : currentCard.textColor,
            }}
          >
            <ScrollArea
              className={`${heightClass || "h-80"} w-full overflow-y-auto`}
            >
              <div className="pr-4 space-y-3">
                <h3 className="text-3xl font-medium font-rubik">
                  {isAnimating ? nextCard.title : currentCard.title}
                </h3>
                <p className="text-sm font-normal font-inter whitespace-pre-line">
                  {isAnimating ? nextCard.description : currentCard.description}
                </p>
                {(isAnimating ? nextCard.hasButton : currentCard.hasButton) && (
                  <Button className="bg-black text-white px-8 py-6 rounded-full w-fit shrink-0">
                    SHOP NOW
                  </Button>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      );
    } else if (currentCard.type === "image" && nextCard.type === "image") {
      return (
        <div className="rounded-4xl overflow-hidden relative h-full">
          {isAnimating && (
            <div className={`absolute inset-0 z-10 ${getExitAnimation()}`}>
              <img
                src={currentCard.image}
                className="object-cover w-full h-full min-h-full"
                alt="Gallery"
              />
            </div>
          )}

          <div
            className={`w-full h-full ${isAnimating ? getSlideAnimation() : ""}`}
          >
            <img
              src={isAnimating ? nextCard.image : currentCard.image}
              className="object-cover w-full h-full min-h-full"
              alt="Gallery"
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-black text-white py-10 px-4 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4/5 md:w-1/2 h-[300px] md:h-96 bg-lime-500/15 blur-3xl"></div>
      </div>

      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none z-30 px-4 md:px-8">
        <Button
          onClick={handlePrev}
          className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/20 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-black rounded-full transition-all duration-300 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </Button>

        <Button
          onClick={handleNext}
          className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/20 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-black rounded-full transition-all duration-300 shadow-lg"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </Button>
      </div>

      <div className="group relative z-10 w-full">
        {/* desktop */}
        <div className="hidden md:grid grid-cols-4 gap-5 w-full">
          <div className="col-span-2 grid gap-5">
            <div className="rounded-4xl overflow-hidden relative">
              {isAnimating && (
                <div className={`absolute inset-0 z-10 ${getExitAnimation()}`}>
                  <img
                    src={currentData.hero.image}
                    className="object-cover w-full h-[460px]"
                    alt={currentData.hero.title}
                  />
                  <div className="absolute bottom-10 left-6">
                    <h1 className="text-4xl font-semibold font-rubik">
                      {currentData.hero.title}
                    </h1>
                    <p className="text-sm max-w-xs mt-2 font-normal font-inter">
                      {currentData.hero.description}
                    </p>
                  </div>
                </div>
              )}

              <div className={isAnimating ? getSlideAnimation() : ""}>
                <img
                  src={
                    isAnimating ? nextData.hero.image : currentData.hero.image
                  }
                  className="object-cover w-full h-[460px]"
                  alt={
                    isAnimating ? nextData.hero.title : currentData.hero.title
                  }
                />
                <div className="absolute bottom-10 left-6">
                  <h1 className="text-4xl font-semibold font-rubik">
                    {isAnimating ? nextData.hero.title : currentData.hero.title}
                  </h1>
                  <p className="text-sm max-w-xs mt-2 font-normal font-inter">
                    {isAnimating
                      ? nextData.hero.description
                      : currentData.hero.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-5">
              {currentData.cards[3].type === "text" &&
                nextData.cards[3].type === "text" && (
                  <div className="w-1/2">
                    {renderCard(3, currentData.cards[3], nextData.cards[3])}
                  </div>
                )}

              {currentData.cards[4].type === "image" &&
                nextData.cards[4].type === "image" && (
                  <div className="w-1/2">
                    {renderCard(4, currentData.cards[4], nextData.cards[4])}
                  </div>
                )}
            </div>
          </div>

          <div className="grid gap-5">
            {currentData.cards[0].type === "text" &&
              nextData.cards[0].type === "text" &&
              renderCard(0, currentData.cards[0], nextData.cards[0], "h-44")}

            {currentData.cards[2].type === "image" &&
              nextData.cards[2].type === "image" &&
              renderCard(2, currentData.cards[2], nextData.cards[2])}

            {currentData.cards[6].type === "text" &&
              nextData.cards[6].type === "text" &&
              renderCard(6, currentData.cards[6], nextData.cards[6], "h-32")}
          </div>

          <div className="grid gap-5">
            {currentData.cards[1].type === "image" &&
              nextData.cards[1].type === "image" &&
              renderCard(1, currentData.cards[1], nextData.cards[1])}

            {currentData.cards[5].type === "text" &&
              nextData.cards[5].type === "text" &&
              renderCard(5, currentData.cards[5], nextData.cards[5], "h-64")}
          </div>
        </div>

        {/* Mobile */}
        <div className="grid grid-cols-1 gap-5 md:hidden">
          <div>
            <div className="rounded-3xl overflow-hidden relative">
              {isAnimating && (
                <div className={`absolute inset-0 z-10 ${getExitAnimation()}`}>
                  <img
                    src={currentData.hero.image}
                    className="object-cover w-full h-[260px]"
                    alt={currentData.hero.title}
                  />
                  <div className="absolute bottom-8 left-6">
                    <h1 className="text-2xl font-semibold font-rubik">
                      {currentData.hero.title}
                    </h1>
                    <p className="text-xs max-w-xs mt-2 font-inter">
                      {currentData.hero.description}
                    </p>
                  </div>
                </div>
              )}

              <div className={isAnimating ? getSlideAnimation() : ""}>
                <img
                  src={
                    isAnimating ? nextData.hero.image : currentData.hero.image
                  }
                  className="object-cover w-full h-[260px]"
                  alt={
                    isAnimating ? nextData.hero.title : currentData.hero.title
                  }
                />
                <div className="absolute bottom-8 left-6">
                  <h1 className="text-2xl font-semibold font-rubik">
                    {isAnimating ? nextData.hero.title : currentData.hero.title}
                  </h1>
                  <p className="text-xs max-w-xs mt-2 font-inter">
                    {isAnimating
                      ? nextData.hero.description
                      : currentData.hero.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {currentData.cards[0].type === "text" &&
              nextData.cards[0].type === "text" &&
              renderCardMobile(0, currentData.cards[0], nextData.cards[0])}

            {currentData.cards[1].type === "image" &&
              nextData.cards[1].type === "image" &&
              renderCardMobile(1, currentData.cards[1], nextData.cards[1])}
          </div>

          <div>
            {currentData.cards[2].type === "image" &&
              nextData.cards[2].type === "image" && (
                <div className="rounded-3xl overflow-hidden relative h-[220px]">
                  {isAnimating && (
                    <div
                      className={`absolute inset-0 z-10 ${getExitAnimation()}`}
                    >
                      <img
                        src={currentData.cards[2].image}
                        className="object-cover w-full h-full min-h-full"
                        alt="Gallery"
                      />
                    </div>
                  )}

                  <div
                    className={`w-full h-full ${isAnimating ? getSlideAnimation() : ""}`}
                  >
                    <img
                      src={
                        isAnimating
                          ? nextData.cards[2].image
                          : currentData.cards[2].image
                      }
                      className="object-cover w-full h-full min-h-full"
                      alt="Gallery"
                    />
                  </div>
                </div>
              )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {currentData.cards[3].type === "text" &&
              nextData.cards[3].type === "text" && (
                <div className="rounded-2xl overflow-hidden relative">
                  {isAnimating && (
                    <div
                      className={`absolute inset-0 z-10 p-6 flex flex-col ${getExitAnimation()}`}
                      style={{
                        backgroundColor: currentData.cards[3].bg,
                        color: currentData.cards[3].textColor,
                      }}
                    >
                      <ScrollArea className="h-56 w-full overflow-y-auto">
                        <div className="space-y-3">
                          <h3 className="text-2xl font-medium font-rubik">
                            {currentData.cards[3].title}
                          </h3>
                          <p className="text-sm mt-1 font-inter">
                            {currentData.cards[3].description}
                          </p>
                          {currentData.cards[3].hasButton && (
                            <Button className="mt-2 bg-black text-white px-6 py-4 rounded-full w-fit">
                              SHOP NOW
                            </Button>
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  )}

                  <div
                    className={`w-full h-full p-6 flex flex-col ${isAnimating ? getSlideAnimation() : ""}`}
                    style={{
                      backgroundColor: isAnimating
                        ? nextData.cards[3].bg
                        : currentData.cards[3].bg,
                      color: isAnimating
                        ? nextData.cards[3].textColor
                        : currentData.cards[3].textColor,
                    }}
                  >
                    <ScrollArea className="h-56 w-full overflow-y-auto">
                      <div className="space-y-3">
                        <h3 className="text-2xl font-medium font-rubik">
                          {isAnimating
                            ? nextData.cards[3].title
                            : currentData.cards[3].title}
                        </h3>
                        <p className="text-sm mt-1 font-inter">
                          {isAnimating
                            ? nextData.cards[3].description
                            : currentData.cards[3].description}
                        </p>
                        {(isAnimating
                          ? nextData.cards[3].hasButton
                          : currentData.cards[3].hasButton) && (
                          <Button className="mt-2 bg-black text-white px-6 py-4 rounded-full w-fit">
                            SHOP NOW
                          </Button>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              )}

            {currentData.cards[4].type === "image" &&
              nextData.cards[4].type === "image" &&
              renderCardMobile(4, currentData.cards[4], nextData.cards[4])}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {currentData.cards[5].type === "text" &&
              nextData.cards[5].type === "text" &&
              renderCardMobile(5, currentData.cards[5], nextData.cards[5])}

            {currentData.cards[6].type === "text" &&
              nextData.cards[6].type === "text" && (
                <div className="rounded-3xl overflow-hidden relative">
                  {isAnimating && (
                    <div
                      className={`absolute inset-0 z-10 px-6 py-8 flex flex-col ${getExitAnimation()}`}
                      style={{
                        backgroundColor: currentData.cards[6].bg,
                        color: currentData.cards[6].textColor,
                      }}
                    >
                      <ScrollArea className="h-52 w-full overflow-y-auto">
                        <div className="space-y-3">
                          <h3 className="text-2xl font-medium font-rubik">
                            {currentData.cards[6].title}
                          </h3>
                          <p className="text-sm mt-1 font-inter">
                            {currentData.cards[6].description}
                          </p>
                        </div>
                      </ScrollArea>
                    </div>
                  )}

                  <div
                    className={`w-full h-full px-6 py-8 flex flex-col ${isAnimating ? getSlideAnimation() : ""}`}
                    style={{
                      backgroundColor: isAnimating
                        ? nextData.cards[6].bg
                        : currentData.cards[6].bg,
                      color: isAnimating
                        ? nextData.cards[6].textColor
                        : currentData.cards[6].textColor,
                    }}
                  >
                    <ScrollArea className="h-52 w-full overflow-y-auto">
                      <div className="space-y-3">
                        <h3 className="text-2xl font-medium font-rubik">
                          {isAnimating
                            ? nextData.cards[6].title
                            : currentData.cards[6].title}
                        </h3>
                        <p className="text-sm mt-1 font-inter">
                          {isAnimating
                            ? nextData.cards[6].description
                            : currentData.cards[6].description}
                        </p>
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
