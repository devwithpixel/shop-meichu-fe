"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  ImageCrop,
  ImageCropApply,
  ImageCropContent,
} from "@/components/ui/shadcn-io/image-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CropIcon,
  Pencil,
  TrashIcon,
  X,
  XIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  base64ToFile,
  bytesToMB,
  fetchImageAsFile,
  fileToBase64,
} from "@/lib/utils";
import { maxFileSize } from "@/config/form";
import { useMutative } from "use-mutative";

import type {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";

export function MultipleImageField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  field,
  maximumImage,
  defaultValue,
  setIsImageChanged,
}: {
  field: ControllerRenderProps<TFieldValues, TName>;
  maximumImage?: number;
  defaultValue?: string[];
  setIsImageChanged?: Dispatch<SetStateAction<boolean>>;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useMutative<File[]>([]);
  const [currentActiveImage, setCurrentActiveImage] = useState(0);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const maxImageSizeReadable = useMemo(() => bytesToMB(maxFileSize), []);

  useEffect(() => {
    if (!defaultValue || defaultValue.length === 0) return;

    async function fetchImage() {
      const files = await Promise.all(
        defaultValue!.map((url) => fetchImageAsFile(url))
      );
      field.onChange(files);
      setSelectedFiles(files);
      setCurrentImage(defaultValue![0]);
    }

    fetchImage();
  }, [defaultValue]);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      const base64Data = await Promise.all(
        Array.from(files).map((file) => fileToBase64(file))
      );
      setSelectedFiles(Array.from(files));
      setCurrentActiveImage(0);
      setCurrentImage(base64Data[0]);
      setIsImageChanged?.(true);
      field.onChange(Array.from(files));
    },
    [field]
  );

  const handleCropChange = useCallback(
    async (data: string) => {
      const file = base64ToFile(data, "image.jpg");
      setDialogOpen(false);
      setSelectedFiles((draft) => {
        draft[currentActiveImage] = file;
      });
      setCurrentImage(data);
      setIsImageChanged?.(true);
      field.onChange(file);
    },
    [field]
  );

  const handleRemove = useCallback(async () => {
    setSelectedFiles((draft) => {
      draft.splice(currentActiveImage, 1);
    });
    setCurrentActiveImage(Math.max(0, currentActiveImage - 1));
    setDialogOpen(false);
    setIsImageChanged?.(true);
    field.onChange(selectedFiles);

    if (selectedFiles.length === 1) {
      setCurrentImage(null);
    } else {
      setCurrentImage(await fileToBase64(selectedFiles[currentActiveImage]));
    }
  }, [field]);

  const handleResetCrop = useCallback(async () => {
    if (!selectedFiles[currentActiveImage]) return handleRemove();

    const base64Data = await fileToBase64(selectedFiles[currentActiveImage]);
    setDialogOpen(false);
    setCurrentImage(base64Data);
    setIsImageChanged?.(true);
    field.onChange(selectedFiles);
  }, [field]);

  const changeActiveImage = useCallback(
    async (index: number) => {
      setCurrentActiveImage(index);

      if (selectedFiles[index]) {
        const image = await fileToBase64(selectedFiles[index]);
        setCurrentImage(image);
      }
    },
    [selectedFiles]
  );

  return selectedFiles.length > 0 && currentImage ? (
    <>
      <ImageCrop
        aspect={1}
        file={selectedFiles[currentActiveImage]}
        maxImageSize={1024 * 1024}
        onCrop={handleCropChange}
      >
        <section className="rounded-md px-4 border bg-accent shadow-xs h-96 overflow-hidden relative">
          <div className="absolute flex justify-end gap-1 left-0 top-0 p-3 bg-linear-to-b from-black to-transparent w-full">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(true)}
              type="button"
            >
              <Pencil />
            </Button>
            <Button variant="outline" onClick={handleRemove} type="button">
              <X />
            </Button>
          </div>

          <img
            alt="Edited Image"
            src={currentImage}
            className="mx-auto h-full w-auto object-contain"
          />

          {selectedFiles.length > 1 && (
            <>
              <Button
                variant="outline"
                onClick={() => changeActiveImage(currentActiveImage - 1)}
                type="button"
                className="absolute left-1 top-1/2 -translate-1/2"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                onClick={() => changeActiveImage(currentActiveImage + 1)}
                type="button"
                className="absolute right-1 top-1/2 -translate-1/2"
              >
                <ChevronRight />
              </Button>
            </>
          )}
        </section>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[425px] font-outfit!">
            <DialogHeader>
              <DialogTitle className="text-white">Edit image</DialogTitle>
            </DialogHeader>
            <ImageCropContent className="w-fit mx-auto" />
            <div
              data-slot="dialog-footer"
              className={
                "flex flex-col-reverse gap-2 sm:flex-row justify-center"
              }
            >
              <Button
                onClick={handleResetCrop}
                variant="outline"
                size="sm"
                type="button"
                className="text-white"
              >
                <XIcon />
                Reset Crop
              </Button>
              <Button
                onClick={handleRemove}
                variant="destructiveOutline"
                size="sm"
                type="button"
              >
                <TrashIcon />
                Delete Image
              </Button>
              <ImageCropApply asChild>
                <Button size="sm" type="button">
                  <CropIcon />
                  Apply Crop
                </Button>
              </ImageCropApply>
            </div>
          </DialogContent>
        </Dialog>
      </ImageCrop>
    </>
  ) : (
    <>
      <Input
        accept="image/*"
        onChange={handleFileChange}
        maxLength={maximumImage}
        type="file"
      />
      <p className="text-xs text-muted-foreground">
        Note: Max file size is {maxImageSizeReadable} MB
      </p>
    </>
  );
}
