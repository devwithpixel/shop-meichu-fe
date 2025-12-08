import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryNavigationProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function GalleryNavigation({
  onPrev,
  onNext,
}: GalleryNavigationProps) {
  return (
    <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none z-30 px-4 md:px-8">
      <Button
        onClick={onPrev}
        className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/20 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-black rounded-full transition-all duration-300 shadow-lg"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </Button>

      <Button
        onClick={onNext}
        className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/20 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-black rounded-full transition-all duration-300 shadow-lg"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </Button>
    </div>
  );
}
