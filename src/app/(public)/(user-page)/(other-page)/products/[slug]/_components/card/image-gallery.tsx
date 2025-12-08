import { forwardRef } from "react";

interface ImageGalleryProps {
  images: Array<{ fullUrl: string; name?: string }>;
  activeIndex: number;
  productName: string;
  onImageClick: (url: string, index: number) => void;
  onThumbnailClick: (index: number) => void;
}

const ImageGallery = forwardRef<HTMLDivElement, ImageGalleryProps>(
  (
    { images, activeIndex, productName, onImageClick, onThumbnailClick },
    ref
  ) => {
    return (
      <div className="md:relative lg:row-span-1">
        <div
          ref={ref}
          className="h-fit md:h-screen lg:h-screen flex flex-row md:flex-col gap-1 overflow-x-scroll md:overflow-y-scroll lg:overflow-y-scroll scrollbar-hide"
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image.fullUrl}
              className={`h-40 w-32 md:h-84 md:w-full lg:h-160 lg:w-full object-cover bg-gray-300 shrink-0 cursor-pointer transition-all ${
                activeIndex === index ? "" : "hover:ring-2 hover:ring-gray-400"
              }`}
              alt={image.name || productName}
              onClick={() => {
                onThumbnailClick(index);
                onImageClick(image.fullUrl, index);
              }}
            />
          ))}
        </div>
      </div>
    );
  }
);

ImageGallery.displayName = "ImageGallery";

export default ImageGallery;
