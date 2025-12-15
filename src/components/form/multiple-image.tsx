"use client";

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
import { useCallback, useMemo, useState } from "react";
import { maxFileSize } from "@/config/form";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import NoScrollSmootherContent from "../no-scroll-smoother-content";

async function createCroppedImage(
  imageSrc: string,
  cropData: CropperAreaData,
  fileName: string
): Promise<File> {
  const image = new Image();
  image.crossOrigin = "anonymous";

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      canvas.width = cropData.width;
      canvas.height = cropData.height;

      ctx.drawImage(
        image,
        cropData.x,
        cropData.y,
        cropData.width,
        cropData.height,
        0,
        0,
        cropData.width,
        cropData.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }

        const croppedFile = new File([blob], fileName, {
          type: "image/png",
        });
        resolve(croppedFile);
      }, "image/png");
    };

    image.onerror = () => reject(new Error("Failed to load image"));
    image.src = imageSrc;
  });
}

interface FileWithCrop {
  original: File;
  current: File;
}

export function MultipleImage({
  value,
  onChange,
  aspectRatio = 1,
  shape = "rectangle",
  maximumFiles,
  className,
}: {
  value: File[];
  onChange?: (value: File[]) => void;
  aspectRatio?: number;
  shape?: "circle" | "rectangle";
  maximumFiles?: number;
  className?: string;
}) {
  const [filesWithCrops, setFilesWithCrops] = useState<
    Map<number, FileWithCrop>
  >(new Map());
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [crop, setCrop] = useState<CropperPoint>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<CropperAreaData | null>(null);
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const selectedFile = useMemo(() => {
    if (selectedIndex === null) return null;
    const fileData = filesWithCrops.get(selectedIndex);
    return fileData?.current ?? null;
  }, [selectedIndex, filesWithCrops]);

  const selectedImageUrl = useMemo(() => {
    if (!selectedFile) return null;
    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  const previewImageUrl = useMemo(() => {
    if (!previewFile) return null;
    return URL.createObjectURL(previewFile);
  }, [previewFile]);

  const onFilesChange = useCallback(
    (newFiles: File[]) => {
      onChange?.(newFiles);

      setFilesWithCrops((prevFilesWithCrops) => {
        const updatedFilesWithCrops = new Map(prevFilesWithCrops);

        for (let i = 0; i < newFiles.length; i++) {
          const file = newFiles[i];
          const existing = updatedFilesWithCrops.get(i);

          if (!existing || existing.original.name !== file.name) {
            updatedFilesWithCrops.set(i, {
              original: file,
              current: file,
            });
          }
        }

        const indicesToKeep = new Set(newFiles.map((_, i) => i));
        for (const [index] of updatedFilesWithCrops) {
          if (!indicesToKeep.has(index)) {
            updatedFilesWithCrops.delete(index);
          }
        }

        return updatedFilesWithCrops;
      });
    },
    [onChange]
  );

  const onFileSelect = useCallback((index: number) => {
    setSelectedIndex(index);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedArea(null);
    setShowCropDialog(true);
  }, []);

  const onOpenPreview = useCallback((file: File) => {
    setPreviewFile(file);
    setShowPreviewDialog(true);
  }, []);

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

    const fileData = filesWithCrops.get(selectedIndex);
    if (!fileData) return;

    const newFilesWithCrops = new Map(filesWithCrops);
    newFilesWithCrops.set(selectedIndex, {
      ...fileData,
      current: fileData.original,
    });
    setFilesWithCrops(newFilesWithCrops);

    const updatedFiles = [...value];
    updatedFiles[selectedIndex] = fileData.original;
    onChange?.(updatedFiles);

    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedArea(null);
  }, [selectedIndex, filesWithCrops, value, onChange]);

  const onCropDialogOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setShowCropDialog(false);

      setTimeout(() => {
        setSelectedIndex(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedArea(null);
      }, 200);
    }
  }, []);

  const onCropApply = useCallback(async () => {
    if (
      !selectedFile ||
      !croppedArea ||
      !selectedImageUrl ||
      selectedIndex === null
    )
      return;

    try {
      const fileData = filesWithCrops.get(selectedIndex);
      if (!fileData) return;

      const croppedFile = await createCroppedImage(
        selectedImageUrl,
        croppedArea,
        fileData.original.name
      );

      const newFilesWithCrops = new Map(filesWithCrops);
      newFilesWithCrops.set(selectedIndex, {
        ...fileData,
        current: croppedFile,
      });
      setFilesWithCrops(newFilesWithCrops);

      const updatedFiles = [...value];
      updatedFiles[selectedIndex] = croppedFile;
      onChange?.(updatedFiles);

      onCropDialogOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to crop image"
      );
    }
  }, [
    selectedFile,
    croppedArea,
    selectedImageUrl,
    selectedIndex,
    filesWithCrops,
    onCropDialogOpenChange,
    value,
    onChange,
  ]);

  return (
    <>
      <FileUpload
        value={value}
        onValueChange={onFilesChange}
        accept="image/*"
        maxFiles={maximumFiles}
        maxSize={maxFileSize}
        multiple={(maximumFiles || 0) > 1}
        className={cn("w-full", className)}
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
            const fileData = filesWithCrops.get(index);
            const displayFile = fileData?.current ?? file;

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
                    onClick={() => onOpenPreview(displayFile)}
                  >
                    <EyeIcon />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => onFileSelect(index)}
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
        <Dialog open={showCropDialog} onOpenChange={onCropDialogOpenChange}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Crop Image</DialogTitle>
              <DialogDescription>
                Adjust the crop area and zoom level for {selectedFile?.name}
              </DialogDescription>
            </DialogHeader>
            {selectedFile && selectedImageUrl && (
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
                  className="h-96"
                >
                  <CropperImage
                    src={selectedImageUrl}
                    alt={selectedFile.name}
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
                    max={3}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>
            )}
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
                Preview the image for {previewFile?.name}
              </DialogDescription>
            </DialogHeader>
            {previewFile && previewImageUrl && (
              <div className="w-full h-96 dark:bg-gray-900 bg-gray-50 border rounded-lg">
                <img
                  className="w-full h-full object-contain mx-auto"
                  src={previewImageUrl}
                  alt={previewFile.name}
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
