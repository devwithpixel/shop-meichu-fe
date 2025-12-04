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
  return (
    <div className="bg-gray-300 md:row-span-2 lg:row-span-1">
      <div className="h-126 md:h-screen lg:h-screen relative">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.fullUrl}
            className={`h-126 md:h-full w-full object-cover absolute inset-0 cursor-pointer ${
              activeIndex === index ? "opacity-100" : "opacity-0"
            } transition-opacity duration-500`}
            alt={image.name || productName}
            onClick={() => onImageClick(image.fullUrl, index)}
          />
        ))}
      </div>
    </div>
  );
}
