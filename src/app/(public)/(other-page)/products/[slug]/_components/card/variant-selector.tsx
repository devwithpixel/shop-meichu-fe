interface VariantSelectorProps {
  images: Array<{ fullUrl: string; name?: string }>;
  activeIndex: number;
  onVariantChange: (index: number) => void;
}

export default function VariantSelector({
  images,
  activeIndex,
  onVariantChange,
}: VariantSelectorProps) {
  return (
    <div className="my-5">
      <p className="font-rubik font-bold text-xs mb-2">
        VARIANT: {activeIndex + 1} / {images.length}
      </p>

      <div className="flex items-center ps-0.5 gap-1.5 py-1 max-w-full overflow-x-auto scrollbar-hide">
        {images.map((image, index) => (
          <div
            key={index}
            className={`bg-gray-400 cursor-pointer rounded-sm shrink-0 transition-all ${
              activeIndex === index
                ? "border-2 border-black scale-105"
                : "border border-gray-300 hover:border-gray-500"
            }`}
            onClick={() => onVariantChange(index)}
          >
            <img
              src={image.fullUrl}
              className="w-10 h-11 md:w-13 md:h-14 object-cover rounded-sm"
              alt={image.name || `Image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
