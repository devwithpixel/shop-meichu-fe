import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FeaturedCategoryItem } from "@/types/strapi/components/home-page-item/featured-category-item";

interface CategoryCardProps {
  item: FeaturedCategoryItem;
  isAnimating: boolean;
  nextItem?: FeaturedCategoryItem;
  slideAnimationClassName: string;
  exitAnimationClassName: string;
  className?: string;
  index: number;
  nextIndex?: number;
}

const featuredColors = [
  { bg: "bg-[#FFEB56]" },
  { bg: "bg-[#FF56E0]" },
  { bg: "bg-[#5689FF]" },
  { bg: "bg-[#5FFF56]" },
];

export default function CategoryCard({
  item,
  isAnimating,
  nextItem,
  slideAnimationClassName,
  exitAnimationClassName,
  className = "",
  index,
  nextIndex,
}: CategoryCardProps) {
  const currentItem = item;
  const animatedItem = nextItem || item;

  const currentColors = featuredColors[index % featuredColors.length];

  const nextColors =
    nextIndex !== undefined
      ? featuredColors[nextIndex % featuredColors.length]
      : currentColors;

  const CardContent = ({
    data,
  }: {
    data: FeaturedCategoryItem;
    colors: (typeof featuredColors)[0];
  }) => (
    <div className="space-y-3 text-black pr-4">
        <h3 className="text-md md:text-2xl lg:text-3xl font-bold font-albert-sans">
          {data.title}
        </h3>
        <ScrollArea className="h-22 w-full">
        <p className="text-sm font-medium font-albert-sans leading-relaxed">
          {data.description}
        </p>
        </ScrollArea>
        {data.category && (
          <Link
            href={`/collections/${data.category.slug}`}
            className="inline-block mt-2 bg-black text-white px-6 py-3 lg:px-8 md:py-4 rounded-full text-sm md:text-xs lg:text-sm font-medium hover:bg-gray-800 transition-colors font-albert-sans"
          >
            SHOP NOW
          </Link>
        )}
      </div>
  );

  return (
    <div
      className={`rounded-3xl md:rounded-4xl overflow-hidden relative h-full ${
        isAnimating && nextItem ? nextColors.bg : currentColors.bg
      } transition-colors duration-500 ${className}`}
    >
      {isAnimating && nextItem && (
        <div
          className={`absolute inset-0 z-10 p-6 md:px-6 md:py-10 flex flex-col ${exitAnimationClassName}`}
        >
          <CardContent data={currentItem} colors={currentColors} />
        </div>
      )}

      <div
        className={`w-full h-full p-6 md:px-6 md:py-10 flex flex-col ${
          isAnimating && nextItem ? slideAnimationClassName : ""
        }`}
      >
        <CardContent
          data={isAnimating && nextItem ? animatedItem : currentItem}
          colors={isAnimating && nextItem ? nextColors : currentColors}
        />
      </div>
    </div>
  );
}
