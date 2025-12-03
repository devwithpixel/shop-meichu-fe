import { useState } from "react";
import { ProductColor } from "@/types/detail-product/product";

export const useImageDialog = (colors: ProductColor[]) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogImage, setDialogImage] = useState<string>("");
  const [dialogImageIndex, setDialogImageIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const isZoomed = zoom > 1;

  const handleImageClick = (img: string, index: number) => {
    setDialogImage(img);
    setDialogImageIndex(index);
    setDialogOpen(true);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handlePrevImage = () => {
    if (slideDirection) return;
    setSlideDirection("right");
    setZoom(1);
    setPosition({ x: 0, y: 0 });

    setTimeout(() => {
      const prevIndex =
        dialogImageIndex === 0 ? colors.length - 1 : dialogImageIndex - 1;
      setDialogImageIndex(prevIndex);
      setDialogImage(colors[prevIndex].bgImg);
      setSlideDirection(null);
    }, 400);
  };

  const handleNextImage = () => {
    if (slideDirection) return;
    setSlideDirection("left");
    setZoom(1);
    setPosition({ x: 0, y: 0 });

    setTimeout(() => {
      const nextIndex =
        dialogImageIndex === colors.length - 1 ? 0 : dialogImageIndex + 1;
      setDialogImageIndex(nextIndex);
      setDialogImage(colors[nextIndex].bgImg);
      setSlideDirection(null);
    }, 400);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const handleMove = (direction: "up" | "down" | "left" | "right") => {
    if (!isZoomed) return;

    const moveAmount = 100;
    setPosition((prev) => {
      switch (direction) {
        case "up":
          return { ...prev, y: prev.y + moveAmount };
        case "down":
          return { ...prev, y: prev.y - moveAmount };
        case "left":
          return { ...prev, x: prev.x + moveAmount };
        case "right":
          return { ...prev, x: prev.x - moveAmount };
        default:
          return prev;
      }
    });
  };

  return {
    dialogOpen,
    setDialogOpen,
    dialogImage,
    dialogImageIndex,
    slideDirection,
    menuOpen,
    setMenuOpen,
    zoom,
    position,
    isZoomed,
    handleImageClick,
    handlePrevImage,
    handleNextImage,
    handleZoomIn,
    handleZoomOut,
    handleMove,
  };
};
