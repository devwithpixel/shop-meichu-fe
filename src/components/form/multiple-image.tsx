"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  ImageCrop,
  ImageCropApply,
  ImageCropContent,
} from "@/components/ui/image-crop";
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

import type {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import type { ChangeEvent } from "react";
import type { StrapiImage } from "@/types/strapi/media/image";

export function MultipleImageField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  field,
  maximumImage,
  defaultValue,
}: {
  field: ControllerRenderProps<TFieldValues, TName>;
  maximumImage?: number;
  defaultValue?: StrapiImage[];
}) {
  const defaultValueRef = useRef<File[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentActiveImage, setCurrentActiveImage] = useState(0);
  const [currentImage, setCurrentImage] = useState<string | undefined>(
    undefined
  );
  const maxImageSizeReadable = useMemo(() => bytesToMB(maxFileSize), []);

  useEffect(() => {
    if (!defaultValue || defaultValue.length === 0) return;

    async function fetchImage() {
      const results = await Promise.all(
        defaultValue!.map((image) => fetchImageAsFile(image))
      );
      const base64Data = await fileToBase64(results[0]);
      setCurrentImage(base64Data);
      defaultValueRef.current = results;
      field.onChange(results);
    }

    fetchImage();
  }, []);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      const base64Data = await fileToBase64(files[0]);
      setDialogOpen(false);
      setCurrentImage(base64Data);
      setCurrentActiveImage(0);
      field.onChange(Array.from(files));
      defaultValueRef.current = Array.from(files);
    },
    [field]
  );

  const handleCropChange = useCallback(
    async (data: string) => {
      const file = base64ToFile(data, "image.jpg");
      setDialogOpen(false);
      setCurrentImage(data);

      const newValue = [...defaultValueRef.current];
      newValue[currentActiveImage] = file;
      field.onChange(newValue);
    },
    [field]
  );

  const handleRemove = useCallback(async () => {
    setDialogOpen(false);

    if (!defaultValueRef.current || defaultValueRef.current.length <= 1) {
      setCurrentActiveImage(0);
      setCurrentImage(undefined);
      field.onChange([]);
      defaultValueRef.current = [];
      return;
    }

    const newIndex = Math.max(currentActiveImage - 1, 0);
    setCurrentActiveImage(newIndex);
    const newFile = defaultValueRef.current[newIndex];
    const base64Data = await fileToBase64(newFile);
    setCurrentImage(base64Data);

    const newValue = [...defaultValueRef.current];
    newValue.splice(currentActiveImage, 1);
    field.onChange(newValue);
    defaultValueRef.current = newValue;
  }, [field]);

  const handleResetCrop = useCallback(async () => {
    setDialogOpen(false);

    if (!defaultValueRef.current || defaultValueRef.current.length === 0) {
      setCurrentImage(undefined);
      field.onChange([]);
      return;
    } else {
      const base64Data = await fileToBase64(
        defaultValueRef.current[currentActiveImage]
      );
      setCurrentImage(base64Data);
      field.onChange([
        ...defaultValueRef.current.slice(0, currentActiveImage),
        defaultValueRef.current[currentActiveImage],
        ...defaultValueRef.current.slice(currentActiveImage + 1),
      ]);
    }
  }, [field]);

  const changeActiveImage = useCallback(
    async (newIndex: number) => {
      if (
        !defaultValueRef.current ||
        defaultValueRef.current.length === 0 ||
        defaultValueRef.current.length < newIndex ||
        newIndex < 0
      )
        return;

      setCurrentActiveImage(newIndex);
      const base64Data = await fileToBase64(defaultValueRef.current[newIndex]);
      setCurrentImage(base64Data);
    },
    [defaultValueRef]
  );

  return currentImage ? (
    <>
      <ImageCrop
        aspect={1}
        file={defaultValueRef.current[currentActiveImage]}
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

          <p className="text-xs text-muted-foreground">
            Note: Max file size is {maxImageSizeReadable} MB
          </p>

          {defaultValueRef.current.length > 1 && (
            <>
              <Button
                variant="outline"
                disabled={currentActiveImage - 1 < 0}
                onClick={() => {
                  if (currentActiveImage - 1 < 0) return;
                  changeActiveImage(currentActiveImage - 1);
                }}
                type="button"
                className="absolute left-5 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                disabled={
                  currentActiveImage + 1 >= defaultValueRef.current.length
                }
                onClick={() => {
                  if (currentActiveImage + 1 >= defaultValueRef.current.length)
                    return;
                  changeActiveImage(currentActiveImage + 1);
                }}
                type="button"
                className="absolute right-5 top-1/2 translate-x-1/2 -translate-y-1/2"
              >
                <ChevronRight />
              </Button>
            </>
          )}
        </section>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="dark sm:max-w-[425px] font-outfit!">
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
        multiple
        maxLength={maximumImage}
        type="file"
      />
      <p className="text-xs text-muted-foreground">
        Note: Max file size is {maxImageSizeReadable} MB
      </p>
    </>
  );
}
