"use client";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StrapiImage from "@/components/global/strapi-image";

import type { StrapiImage as StrapiImageType } from "@/types/strapi/media/image";

export function MultipleImageView({ value }: { value: StrapiImageType[] }) {
  const [currentImage, setCurrentImage] = useState(0);

  const changeCurrentImage = useCallback((index: number) => {
    if (index < 0 || index >= value.length) return;

    setCurrentImage(index);
  }, []);

  return (
    <div className="h-64 rounded-lg border relative">
      <StrapiImage
        src={value[currentImage]}
        alt={value[currentImage]!.alternativeText!}
        size="small"
        className="h-full mx-auto object-cover"
      />
      {value.length > 1 && (
        <>
          <Button
            variant="outline"
            disabled={currentImage === 0}
            onClick={() => changeCurrentImage(currentImage - 1)}
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 left-6 -translate-x-1/2"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            disabled={currentImage === value.length - 1}
            onClick={() => changeCurrentImage(currentImage + 1)}
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 right-6 translate-x-1/2"
          >
            <ChevronRight />
          </Button>
        </>
      )}
    </div>
  );
}
