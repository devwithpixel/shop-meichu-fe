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
import { CropIcon, Pencil, TrashIcon, X, XIcon } from "lucide-react";
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
import { StrapiImage } from "@/types/strapi/media/image";

export function ImageField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  field,
  defaultValue,
}: {
  field: ControllerRenderProps<TFieldValues, TName>;
  defaultValue?: StrapiImage;
}) {
  const defaultValueRef = useRef<File | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | undefined>(
    undefined
  );
  const maxImageSizeReadable = useMemo(
    () => bytesToMB(maxFileSize),
    [maxFileSize]
  );

  useEffect(() => {
    if (!defaultValue) return;

    async function fetchImage() {
      const file = await fetchImageAsFile(defaultValue!);
      const base64Data = await fileToBase64(file);
      setCurrentImage(base64Data);
      defaultValueRef.current = file;
      field.onChange(file);
    }

    fetchImage();
  }, []);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const base64Data = await fileToBase64(file);
      setDialogOpen(false);
      setCurrentImage(base64Data);
      field.onChange(file);
      defaultValueRef.current = file;
    },
    [field]
  );

  const handleCropChange = useCallback(
    async (data: string) => {
      const file = base64ToFile(data, "image.jpg");
      setDialogOpen(false);
      setCurrentImage(data);
      field.onChange(file);
    },
    [field]
  );

  const handleRemove = useCallback(() => {
    setDialogOpen(false);
    setCurrentImage(undefined);
    field.onChange(undefined);
    defaultValueRef.current = undefined;
  }, [field]);

  const handleResetCrop = useCallback(async () => {
    if (defaultValueRef.current) {
      const base64Data = await fileToBase64(defaultValueRef.current);
      setCurrentImage(base64Data);
      field.onChange(defaultValueRef.current);
    } else {
      setCurrentImage(undefined);
      field.onChange(undefined);
    }
    setDialogOpen(false);
  }, [field]);

  return defaultValueRef.current && currentImage ? (
    <>
      <ImageCrop
        aspect={1}
        file={defaultValueRef.current!}
        maxImageSize={1024 * 1024}
        onCrop={handleCropChange}
      >
        <section className="rounded-md px-4 border bg-accent shadow-xs relative h-96 overflow-hidden">
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
            className=" mx-auto h-full w-auto object-contain"
          />

          <p className="text-xs text-muted-foreground">
            Note: Max file size is {maxImageSizeReadable} MB
          </p>
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
        maxLength={1}
        type="file"
      />
      <p className="text-xs text-muted-foreground">
        Note: Max file size is {maxImageSizeReadable} MB
      </p>
    </>
  );
}
