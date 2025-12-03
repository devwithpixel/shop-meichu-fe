import { FeaturedCategoryItem } from "@/types/strapi/components/home-page-item/featured-category-item";

interface CategoryImageCardProps {
  item: FeaturedCategoryItem;
  isAnimating: boolean;
  nextItem?: FeaturedCategoryItem;
  getSlideAnimation: () => string;
  getExitAnimation: () => string;
  className?: string;
}

function getImageUrl(url?: string): string {
  if (!url) return "/assets/gallery/placeholder.jpg";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("/")
  ) {
    return url;
  }

  const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";
  return `${STRAPI_BASE_URL}${url}`;
}

export default function CategoryImageCard({
  item,
  isAnimating,
  nextItem,
  getSlideAnimation,
  getExitAnimation,
  className = "",
}: CategoryImageCardProps) {
  const currentImageUrl = getImageUrl(item?.category?.thumbnail?.url);
  const nextImageUrl = getImageUrl(nextItem?.category?.thumbnail?.url);

  const CardOverlay = ({ data }: { data: FeaturedCategoryItem }) => {
    if (!data) return null;

    return (
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent">
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-xl md:text-2xl font-semibold font-rubik text-white mb-2">
            {data.title || "Untitled"}
          </h3>
          <p className="text-xs md:text-sm text-white/90 font-inter mb-3">
            {data.description || ""}
          </p>
        </div>
      </div>
    );
  };

  if (!item) return null;

  return (
    <div
      className={`rounded-3xl md:rounded-4xl overflow-hidden relative h-full ${className}`}
    >
      {isAnimating && nextItem && (
        <div className={` ${getExitAnimation()}`}>
          <img
            src={currentImageUrl}
            alt={
              item.category?.thumbnail?.alternativeText ||
              item.title ||
              "Category image"
            }
            className="object-cover w-full h-full"
          />
          <CardOverlay data={item} />
        </div>
      )}

      <div
        className={`w-full h-full ${isAnimating && nextItem ? getSlideAnimation() : ""}`}
      >
        <img
          src={isAnimating && nextItem ? nextImageUrl : currentImageUrl}
          alt={
            isAnimating && nextItem
              ? nextItem.category?.thumbnail?.alternativeText ||
                nextItem.title ||
                "Category image"
              : item.category?.thumbnail?.alternativeText ||
                item.title ||
                "Category image"
          }
          className="object-cover w-full h-full"
        />
        <CardOverlay data={isAnimating && nextItem ? nextItem : item} />
      </div>
    </div>
  );
}
