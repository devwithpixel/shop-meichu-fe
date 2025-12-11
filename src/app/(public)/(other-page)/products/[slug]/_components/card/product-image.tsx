interface ProductImageProps {
  images: Array<{ fullUrl: string; name?: string }>;
  activeIndex: number;
  productName: string;
  onImageClick: (url: string, index: number) => void;
}

export default function ProductImage({
  images,
  activeIndex,
  productName,
  onImageClick,
}: ProductImageProps) {
  const handleClick = () => {
    if (images[activeIndex]) {
      onImageClick(images[activeIndex].fullUrl, activeIndex);
    }
  };

  return (
    <div className="bg-gray-300 md:row-span-2 lg:row-span-1">
      <div
        className="h-126 md:h-[94vh] lg:h-[91vh] relative cursor-pointer"
        onClick={handleClick}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.fullUrl}
            className={`h-126 md:h-full w-full object-cover absolute inset-0 ${
              activeIndex === index ? "opacity-100" : "opacity-0"
            } transition-opacity duration-500`}
            alt={image.name || productName}
          />
        ))}
      </div>
    </div>
  );
}
