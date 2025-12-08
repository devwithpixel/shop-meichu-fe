"use client";

import { useState, useRef, useMemo } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProductImage from "../card/product-image";
import ImageGallery from "../card/image-gallery";
import ProductDetails from "../card/product-details";
import ImageDialog from "../card/image-dialog";
import gsap from "gsap";
import useSWR from "swr";

import type { Product } from "@/types/strapi/models/product";
import type { Footer } from "@/types/strapi/components/shared/footer";
import type { StrapiResponse } from "@/types/strapi/response";

gsap.registerPlugin(ScrollTrigger);

const fetcher = (url: string) =>
  fetch(url).then((r) => r.json() as Promise<StrapiResponse<Footer>>);

interface OverviewSectionProps {
  ref: React.RefObject<HTMLDivElement | null>;
  product: Product;
}

export default function OverviewSection({
  ref,
  product,
}: OverviewSectionProps) {
  const { data: footerResponse } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/global/footer`,
    fetcher
  );

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";

  const allImages = useMemo(() => {
    return (
      product.images?.map((img) => ({
        ...img,
        fullUrl: `${BASE_URL}${img.url}`,
      })) ?? []
    );
  }, [product.images, BASE_URL]);

  const [activeVariantIndex, setActiveVariantIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogImage, setDialogImage] = useState<string>("");
  const [dialogImageIndex, setDialogImageIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const detailRef = useRef<HTMLDivElement>(null);
  const imageListRef = useRef<HTMLDivElement>(null);

  const socialMedia = footerResponse?.data?.socialMedia || [];

  useGSAP(
    () => {
      if (window.innerWidth < 768) return;

      if (!ref.current || !detailRef.current || !imageListRef.current) return;

      const section = ref.current;
      const detailContent = detailRef.current;
      const imageList = imageListRef.current;

      detailContent.scrollTop = 0;
      imageList.scrollTop = 0;

      ScrollTrigger.refresh();

      const imageScroll = imageList.scrollHeight - imageList.clientHeight;
      const detailScroll =
        detailContent.scrollHeight - detailContent.clientHeight;

      const totalScrollDistance = imageScroll + detailScroll;
      const imagePhaseEnd = imageScroll / totalScrollDistance;

      ScrollTrigger.create({
        trigger: section,
        start: "top top+=68",
        end: `+=${totalScrollDistance}`,
        pin: true,
        pinSpacing: true,
        scrub: 4,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const progress = self.progress;

          if (progress <= imagePhaseEnd) {
            const imageProgress = progress / imagePhaseEnd;

            gsap.to(imageList, {
              scrollTop: imageProgress * imageScroll,
              duration: 0.5,
              ease: "none",
            });
            detailContent.scrollTop = 0;
          } else {
            const detailProgress =
              (progress - imagePhaseEnd) / (1 - imagePhaseEnd);

            gsap.to(detailContent, {
              scrollTop: detailProgress * detailScroll,
              duration: 0.5,
              ease: "none",
            });

            imageList.scrollTop = imageScroll;
          }
        },
        onEnter: () => {
          detailContent.style.overflow = "hidden";
          imageList.style.overflow = "hidden";
        },

        onEnterBack: () => {
          detailContent.style.overflow = "hidden";
          imageList.style.overflow = "hidden";
        },
      });
    },
    { dependencies: [], scope: ref }
  );

  const handleImageClick = (img: string, index: number) => {
    setDialogImage(img);
    setDialogImageIndex(index);
    setDialogOpen(true);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handlePrevImage = () => {
    if (slideDirection || allImages.length === 0) return;
    setSlideDirection("right");
    setZoom(1);
    setPosition({ x: 0, y: 0 });

    setTimeout(() => {
      const prevIndex =
        dialogImageIndex === 0 ? allImages.length - 1 : dialogImageIndex - 1;
      setDialogImageIndex(prevIndex);
      setDialogImage(allImages[prevIndex].fullUrl);
      setSlideDirection(null);
    }, 400);
  };

  const handleNextImage = () => {
    if (slideDirection || allImages.length === 0) return;
    setSlideDirection("left");
    setZoom(1);
    setPosition({ x: 0, y: 0 });

    setTimeout(() => {
      const nextIndex =
        dialogImageIndex === allImages.length - 1 ? 0 : dialogImageIndex + 1;
      setDialogImageIndex(nextIndex);
      setDialogImage(allImages[nextIndex].fullUrl);
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
    if (zoom <= 1) return;

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

  return (
    <>
      <div ref={ref} className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-3 gap-1">
          <ProductImage
            images={allImages}
            activeIndex={activeVariantIndex}
            productName={product.name}
            onImageClick={handleImageClick}
          />

          <ImageGallery
            ref={imageListRef}
            images={allImages}
            activeIndex={activeVariantIndex}
            productName={product.name}
            onImageClick={handleImageClick}
            onThumbnailClick={setActiveVariantIndex}
          />

          <ProductDetails
            ref={detailRef}
            product={product}
            allImages={allImages}
            activeVariantIndex={activeVariantIndex}
            quantity={quantity}
            socialMedia={socialMedia}
            onVariantChange={setActiveVariantIndex}
            onQuantityChange={setQuantity}
          />
        </div>
      </div>

      <ImageDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        imageSrc={dialogImage}
        imageIndex={dialogImageIndex}
        totalImages={allImages.length}
        slideDirection={slideDirection}
        zoom={zoom}
        position={position}
        menuOpen={menuOpen}
        onPrevImage={handlePrevImage}
        onNextImage={handleNextImage}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onMove={handleMove}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
      />
    </>
  );
}
