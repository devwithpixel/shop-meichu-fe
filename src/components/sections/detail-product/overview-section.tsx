"use client";

import { useState } from "react";
import { Product, RelatedProduct } from "@/types/detail-product/product";
import { useImageDialog } from "@/hooks/use-image-dialog";
import ProductImageGallery from "@/components/card/detail-product/product-image-gallery";
import ProductDetails from "@/components/card/detail-product/product-details";
import ImageDialog from "@/components/card/detail-product/image-dialog";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface OverviewSectionProps {
  product: Product;
  relatedProducts: RelatedProduct[];
}

export default function OverviewSection({
  product,
  relatedProducts,
}: OverviewSectionProps) {
  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);

  const { sectionRef, detailRef, imageListRef } = useScrollAnimation();

  const {
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
  } = useImageDialog(product.colors);

  const handleColorClick = (img: string, index: number) => {
    setActiveColorIndex(index);
  };

  return (
    <>
      <div ref={sectionRef} className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-3 gap-1">
          <ProductImageGallery
            colors={product.colors}
            activeColorIndex={activeColorIndex}
            imageListRef={imageListRef}
            onImageClick={handleImageClick}
          />

          <ProductDetails
            product={product}
            relatedProducts={relatedProducts}
            detailRef={detailRef}
            activeColorIndex={activeColorIndex}
            onColorClick={handleColorClick}
          />
        </div>
      </div>

      <ImageDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        dialogImage={dialogImage}
        dialogImageIndex={dialogImageIndex}
        slideDirection={slideDirection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        zoom={zoom}
        position={position}
        isZoomed={isZoomed}
        onPrevImage={handlePrevImage}
        onNextImage={handleNextImage}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onMove={handleMove}
      />
    </>
  );
}
