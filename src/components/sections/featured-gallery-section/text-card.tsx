import Link from "next/link";
import { FeaturedCategoryItem } from "@/types/strapi/components/home-page-item/featured-category-item";

interface CategoryCardProps {
  item: FeaturedCategoryItem;
  isAnimating: boolean;
  nextItem?: FeaturedCategoryItem;
  getSlideAnimation: () => string;
  getExitAnimation: () => string;
  className?: string;
}

export default function CategoryCard({
  item,
  isAnimating,
  nextItem,
  getSlideAnimation,
  getExitAnimation,
  className = "",
}: CategoryCardProps) {
  const currentItem = item;
  const animatedItem = nextItem || item;

  const CardContent = ({ data }: { data: FeaturedCategoryItem }) => (
    <div className="space-y-3">
      <h3 className="text-2xl md:text-3xl font-medium font-rubik">
        {data.title}
      </h3>
      <p className="text-sm font-normal font-inter">{data.description}</p>
      {data.category && (
        <Link
          href={`/products?category=${data.category.slug}`}
          className="inline-block mt-2 bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          SHOP NOW
        </Link>
      )}
    </div>
  );

  return (
    <div
      className={`rounded-3xl md:rounded-4xl overflow-hidden relative h-full bg-gray-100 ${className}`}
    >
      {isAnimating && nextItem && (
        <div
          className={`absolute inset-0 z-10 p-6 md:px-6 md:py-10 flex flex-col ${getExitAnimation()}`}
        >
          <CardContent data={currentItem} />
        </div>
      )}

      <div
        className={`w-full h-full p-6 md:px-6 md:py-10 flex flex-col ${
          isAnimating && nextItem ? getSlideAnimation() : ""
        }`}
      >
        <CardContent
          data={isAnimating && nextItem ? animatedItem : currentItem}
        />
      </div>
    </div>
  );
}
