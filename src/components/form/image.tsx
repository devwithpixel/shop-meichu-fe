"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  ImageCrop,
  ImageCropApply,
  ImageCropContent,
} from "@/components/ui/shadcn-io/image-crop";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, X } from "lucide-react";
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

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const base64Data = await fileToBase64(file);
    setSelectedFile(file);
    setCurrentImage(base64Data);
    setIsImageChanged?.(true);
    field.onChange(file);
  };

  const handleCropChange = async (data: string) => {
    const file = base64ToFile(data, "image.jpg");
    setDialogOpen(false);
    setCurrentImage(data);
    setIsImageChanged?.(true);
    field.onChange(file);
  };

  const handleRemove = () => {
    setCurrentImage(null);
    setDialogOpen(false);
    setIsImageChanged?.(true);
    field.onChange(undefined);
  };

  const handleResetCrop = async () => {
    if (!selectedFile) return handleRemove();

    const base64Data = await fileToBase64(selectedFile);
    setDialogOpen(false);
    setCurrentImage(base64Data);
    setIsImageChanged?.(true);
    field.onChange(selectedFile);
  };

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
        </section>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit image</DialogTitle>
            </DialogHeader>
            <ImageCropContent className="w-fit mx-auto" />
            <DialogFooter>
              <ImageCropApply asChild>
                <Button size="sm" variant="outline">
                  Apply Crop
                </Button>
              </ImageCropApply>
              <Button
                onClick={handleResetCrop}
                size="sm"
                type="button"
                variant="outline"
              >
                Reset Crop
              </Button>
              <Button
                onClick={handleRemove}
                size="sm"
                type="button"
                variant="destructive"
              >
                Delete Image
              </Button>
            </DialogFooter>
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
