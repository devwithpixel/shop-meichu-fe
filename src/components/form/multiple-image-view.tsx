"use client";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StrapiImage from "@/components/global/strapi-image";

import type { StrapiImage as StrapiImageType } from "@/types/strapi/media/image";

export function MultipleImageView({ value }: { value: StrapiImageType[] }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const changeCurrentImage = useCallback((index: number) => {
    if (index < 0 || index >= value.length) return;

    setCurrentImage(index);
  }, []);

  return (
    <div className="h-64 rounded-lg border relative overflow-hidden">
      <button
        className="block w-full h-full"
        onClick={() => setOpenDialog(true)}
      >
        <StrapiImage
          src={value[currentImage]}
          alt={value[currentImage]!.alternativeText!}
          size="small"
          className="block h-full mx-auto object-contain"
        />
      </button>
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

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reference Image</DialogTitle>
          </DialogHeader>
          <div className="h-96 rounded-lg border relative overflow-hidden">
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
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
