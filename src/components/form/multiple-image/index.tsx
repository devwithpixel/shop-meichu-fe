"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { createCroppedImage } from "./helper";
import { maxFileSize } from "@/config/form";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { CropIcon, EyeIcon, UploadIcon, XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Cropper,
  CropperArea,
  type CropperAreaData,
  CropperImage,
  type CropperPoint,
  type CropperProps,
} from "@/components/ui/cropper";
import toast from "react-hot-toast";
import NoScrollSmootherContent from "@/components/no-scroll-smoother-content";

interface FileWithCrop {
  original: File;
  current: File;
}

export function MultipleImage({
  value,
  onChange,
  aspectRatio = 1,
  shape = "rectangle",
  accept = "image/jpeg, image/png",
  required = false,
  maximumFiles,
  className,
}: {
  value: File[];
  onChange?: (value: File[]) => void;
  aspectRatio?: number;
  accept?: string;
  required?: boolean;
  shape?: "circle" | "rectangle";
  maximumFiles?: number;
  className?: string;
}) {
  const [croppedImage, setCroppedImage] = useState<Map<number, FileWithCrop>>(
    new Map()
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [crop, setCrop] = useState<CropperPoint>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<CropperAreaData | null>(null);
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  const currentImageBuffer = useMemo(() => {
    if (selectedIndex === null) return null;

    const fileData = croppedImage.get(selectedIndex);
    const file = fileData?.current ?? value[selectedIndex];

    if (!file) return null;

    return URL.createObjectURL(file);
  }, [croppedImage, selectedIndex]);

  useEffect(() => {
    if (!currentImageBuffer) return;

    return () => {
      URL.revokeObjectURL(currentImageBuffer);
    };
  }, [currentImageBuffer]);

  const onCropDialogChange = useCallback((value: boolean) => {
    setShowCropDialog(value);
    setIsAnimationFinished(false);
  }, []);

  const onFilesChange = useCallback(
    (newFiles: File[]) => {
      onChange?.(newFiles);

      setCroppedImage(() => {
        const updatedFilesWithCrops = new Map();

        for (let i = 0; i < newFiles.length; i++) {
          const file = newFiles[i];

          updatedFilesWithCrops.set(i, {
            original: file,
            current: file,
          });
        }

        return updatedFilesWithCrops;
      });
    },
    [onChange]
  );

  const onCropImage = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedArea(null);
      setShowCropDialog(true);
    },
    [croppedImage]
  );

  const onOpenPreview = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      setShowPreviewDialog(true);
    },
    [croppedImage]
  );

  const onCropAreaChange: NonNullable<CropperProps["onCropAreaChange"]> =
    useCallback((_, croppedAreaPixels) => {
      setCroppedArea(croppedAreaPixels);
    }, []);

  const onCropComplete: NonNullable<CropperProps["onCropComplete"]> =
    useCallback((_, croppedAreaPixels) => {
      setCroppedArea(croppedAreaPixels);
    }, []);

  const onCropReset = useCallback(() => {
    if (selectedIndex === null) return;

    const fileData = croppedImage.get(selectedIndex);
    const originalFile = fileData?.original ?? value[selectedIndex];
    if (!originalFile) return;

    const newCroppedImage = new Map(croppedImage);
    newCroppedImage.set(selectedIndex, {
      original: originalFile,
      current: originalFile,
    });
    setCroppedImage(newCroppedImage);

    const updatedFiles = [...value];
    updatedFiles[selectedIndex] = originalFile;
    onChange?.(updatedFiles);

    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedArea(null);
  }, [selectedIndex, croppedImage, value, onChange]);

  const onCropApply = useCallback(async () => {
    if (!currentImageBuffer || !croppedArea || selectedIndex === null) return;

    try {
      const fileData = croppedImage.get(selectedIndex);
      const originalFile = fileData?.original ?? value[selectedIndex];
      if (!originalFile) return;

      const croppedFile = await createCroppedImage(
        currentImageBuffer,
        croppedArea,
        originalFile.name
      );

      const newCroppedImage = new Map(croppedImage);
      newCroppedImage.set(selectedIndex, {
        original: originalFile,
        current: croppedFile,
      });
      setCroppedImage(newCroppedImage);

      const updatedFiles = [...value];
      updatedFiles[selectedIndex] = croppedFile;
      onChange?.(updatedFiles);

      setShowCropDialog(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to crop image"
      );
    }
  }, [
    currentImageBuffer,
    croppedArea,
    selectedIndex,
    croppedImage,
    value,
    onChange,
  ]);

  return (
    <>
      <FileUpload
        value={value}
        onValueChange={onFilesChange}
        accept={accept}
        maxFiles={maximumFiles}
        maxSize={maxFileSize}
        multiple={(maximumFiles || 0) > 1}
        className={cn("w-full", className)}
        required={required}
      >
        {maximumFiles && value.length === maximumFiles ? null : (
          <FileUploadDropzone className="min-h-32">
            <div className="flex flex-col items-center gap-2 text-center">
              <UploadIcon className="size-8 text-muted-foreground" />
              <div className="space-y-2">
                <p className="font-medium text-sm">
                  Drop images here or click to upload
                </p>
                <p className="text-muted-foreground text-xs">
                  PNG & JPG up to {maxFileSize / 1024 / 1024} MB
                </p>
                {maximumFiles && (
                  <p className="text-muted-foreground text-xs">
                    Maximum {maximumFiles} files allowed
                  </p>
                )}
              </div>
              <FileUploadTrigger asChild>
                <Button variant="outline" size="sm">
                  Choose Files
                </Button>
              </FileUploadTrigger>
            </div>
          </FileUploadDropzone>
        )}
        <FileUploadList className="max-h-96 overflow-y-auto">
          {value.map((file, index) => {
            const fileData = croppedImage.get(index);

            return (
              <FileUploadItem key={index} value={file}>
                <FileUploadItemPreview
                  render={(originalFile, fallback) => {
                    if (
                      fileData?.current &&
                      originalFile.type.startsWith("image/")
                    ) {
                      const url = URL.createObjectURL(fileData.current);
                      return (
                        <img
                          src={url}
                          alt={originalFile.name}
                          className="size-full object-cover"
                        />
                      );
                    }

                    return fallback();
                  }}
                />
                <FileUploadItemMetadata />
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => onOpenPreview(index)}
                  >
                    <EyeIcon />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => onCropImage(index)}
                  >
                    <CropIcon />
                  </Button>
                  <FileUploadItemDelete asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 hover:bg-destructive/30 hover:text-destructive-foreground dark:hover:bg-destructive dark:hover:text-destructive-foreground"
                    >
                      <XIcon />
                    </Button>
                  </FileUploadItemDelete>
                </div>
              </FileUploadItem>
            );
          })}
        </FileUploadList>
      </FileUpload>

      <NoScrollSmootherContent>
        <Dialog open={showCropDialog} onOpenChange={onCropDialogChange}>
          <DialogContent
            className="max-w-4xl"
            onAnimationEnd={() => setIsAnimationFinished(true)}
          >
            <DialogHeader>
              <DialogTitle>Crop Image</DialogTitle>
              <DialogDescription>
                Adjust the crop area and zoom level for{" "}
                {value[selectedIndex ?? 0]?.name}
              </DialogDescription>
            </DialogHeader>
            {currentImageBuffer && isAnimationFinished ? (
              <div className="flex flex-col gap-4">
                <Cropper
                  aspectRatio={aspectRatio}
                  shape={shape}
                  crop={crop}
                  onCropChange={setCrop}
                  zoom={zoom}
                  onZoomChange={setZoom}
                  onCropAreaChange={onCropAreaChange}
                  onCropComplete={onCropComplete}
                  withGrid={true}
                  className="h-96"
                  zoomSpeed={0.5}
                  minZoom={1}
                  maxZoom={4}
                >
                  <CropperImage
                    src={currentImageBuffer}
                    alt={value[selectedIndex ?? 0]?.name}
                    crossOrigin="anonymous"
                  />
                  <CropperArea />
                </Cropper>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm">Zoom: {zoom.toFixed(2)}</Label>
                  <Slider
                    value={[zoom]}
                    onValueChange={(value) => setZoom(value[0] ?? 1)}
                    min={1}
                    max={4}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>
            ) : null}
            <DialogFooter>
              <Button onClick={onCropReset} variant="outline">
                Reset
              </Button>
              <Button onClick={onCropApply} disabled={!croppedArea}>
                Crop
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Preview Image</DialogTitle>
              <DialogDescription>
                Preview the image for {value[selectedIndex ?? 0]?.name}
              </DialogDescription>
            </DialogHeader>
            {value[selectedIndex ?? 0] && currentImageBuffer && (
              <div className="w-full h-96 dark:bg-gray-900 bg-gray-50 border rounded-lg">
                <img
                  className="w-full h-full object-contain mx-auto"
                  src={currentImageBuffer}
                  alt={value[selectedIndex ?? 0]?.name}
                />
              </div>
            )}
            <DialogFooter>
              <Button
                onClick={() => setShowPreviewDialog(false)}
                variant="outline"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </NoScrollSmootherContent>
    </>
  );
}
