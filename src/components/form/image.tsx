"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

import type {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { maxFileSize } from "@/config/form";

export function ImageField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  field,
  defaultValue,
  setIsImageChanged,
}: {
  field: ControllerRenderProps<TFieldValues, TName>;
  defaultValue?: string;
  setIsImageChanged?: Dispatch<SetStateAction<boolean>>;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const maxImageSizeReadable = useMemo(
    () => bytesToMB(maxFileSize),
    [maxFileSize]
  );

  useEffect(() => {
    if (!defaultValue) return;

    async function fetchImage() {
      const file = await fetchImageAsFile(defaultValue!);
      field.onChange(file);
      setSelectedFile(file);
      setCurrentImage(defaultValue!);
    }

    fetchImage();
  }, [defaultValue]);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const base64Data = await fileToBase64(file);
      setSelectedFile(file);
      setCurrentImage(base64Data);
      setIsImageChanged?.(true);
      field.onChange(file);
    },
    [field]
  );

  const handleCropChange = useCallback(
    async (data: string) => {
      const file = base64ToFile(data, "image.jpg");
      setDialogOpen(false);
      setCurrentImage(data);
      setIsImageChanged?.(true);
      field.onChange(file);
    },
    [field]
  );

  const handleRemove = useCallback(() => {
    setCurrentImage(null);
    setDialogOpen(false);
    setIsImageChanged?.(true);
    field.onChange(undefined);
  }, [field]);

  const handleResetCrop = useCallback(async () => {
    if (!selectedFile) return handleRemove();

    const base64Data = await fileToBase64(selectedFile);
    setDialogOpen(false);
    setCurrentImage(base64Data);
    setIsImageChanged?.(true);
    field.onChange(selectedFile);
  }, [field]);

  return selectedFile && currentImage ? (
    <>
      <ImageCrop
        aspect={1}
        file={selectedFile}
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
