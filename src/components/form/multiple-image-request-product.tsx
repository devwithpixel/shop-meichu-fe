/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CropIcon,
  Pencil,
  Trash2,
  XIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Replace,
  FileImage,
  TrashIcon,
  AlertCircle,
  Upload,
  MoreVertical,
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
import type { ChangeEvent, Dispatch, SetStateAction, DragEvent } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function MultipleImageRequestField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  field,
  maximumImage = 4,
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
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const maxImageSizeReadable = useMemo(() => bytesToMB(maxFileSize), []);

  useEffect(() => {
    if (!defaultValue || defaultValue.length === 0) return;

    async function fetchImage() {
      const files = await Promise.all(
        defaultValue!.map((url) => fetchImageAsFile(url))
      );
      setSelectedFiles(files);
      setCurrentImage(defaultValue![0]);
    }

    fetchImage();
  }, [defaultValue]);

  useEffect(() => {
    field.onChange(selectedFiles);

    const generatePreviews = async () => {
      const previews = await Promise.all(
        selectedFiles.map((file) => fileToBase64(file))
      );
      setPreviewImages(previews);
    };

    generatePreviews();
  }, [selectedFiles]);

  const validateImageFiles = (files: File[]): string | null => {
    // maximum images
    const totalFiles = selectedFiles.length + files.length;
    if (totalFiles > maximumImage) {
      return `Maximum ${maximumImage} images allowed. You already have ${selectedFiles.length} images.`;
    }

    // Validate file
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        return "Only image files are allowed (JPEG, PNG, WebP, etc.)";
      }

      // file size
      if (file.size > maxFileSize) {
        return `File size exceeds maximum limit of ${maxImageSizeReadable} MB`;
      }
    }

    return null;
  };

  const handleFiles = useCallback(
    async (files: File[], source: "drag" | "input" = "input") => {
      if (files.length === 0) return;

      const error = validateImageFiles(files);
      if (error) {
        setUploadError(error);
        setTimeout(() => setUploadError(null), 5000);
        return;
      }

      setUploadError(null);

      try {
        const base64Data = await Promise.all(
          files.map((file) => fileToBase64(file))
        );

        setSelectedFiles((draft) => {
          draft.push(...files);
        });

        if (selectedFiles.length === 0) {
          setCurrentActiveImage(0);
          setCurrentImage(base64Data[0]);
        }

        setIsImageChanged?.(true);
      } catch (error) {
        setUploadError("Failed to process images. Please try again.");
        setTimeout(() => setUploadError(null), 5000);
      }
    },
    [selectedFiles, maximumImage, maxImageSizeReadable]
  );

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      await handleFiles(Array.from(files), "input");
      event.target.value = "";
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      handleFiles(files, "drag");
    },
    [handleFiles]
  );

  const handleAddMoreImages = () => {
    setUploadError(null);
    const fileInput = document.getElementById(
      "add-more-images"
    ) as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  const handleReplaceImage = () => {
    setUploadError(null);
    const fileInput = document.getElementById(
      "replace-image"
    ) as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  const handleReplaceFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      setUploadError(null);
      const newFile = files[0];

      if (!newFile.type.startsWith("image/")) {
        setUploadError("Only image files are allowed (JPEG, PNG, WebP, etc.)");
        setTimeout(() => setUploadError(null), 5000);
        event.target.value = "";
        return;
      }

      // file size
      if (newFile.size > maxFileSize) {
        setUploadError(
          `File size exceeds maximum limit of ${maxImageSizeReadable} MB`
        );
        setTimeout(() => setUploadError(null), 5000);
        event.target.value = "";
        return;
      }

      try {
        const base64Data = await fileToBase64(newFile);

        setSelectedFiles((draft) => {
          draft[currentActiveImage] = newFile;
        });

        setCurrentImage(base64Data);
        setIsImageChanged?.(true);
      } catch (error) {
        setUploadError("Failed to replace image. Please try again.");
        setTimeout(() => setUploadError(null), 5000);
      }

      event.target.value = "";
    },
    [currentActiveImage, maxImageSizeReadable]
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
    },
    [currentActiveImage]
  );

  const handleRemoveCurrent = useCallback(async () => {
    setUploadError(null);
    setSelectedFiles((draft) => {
      draft.splice(currentActiveImage, 1);
    });
    setCurrentActiveImage(Math.max(0, currentActiveImage - 1));
    setDialogOpen(false);
    setIsImageChanged?.(true);

    if (selectedFiles.length === 1) {
      setCurrentImage(null);
      setPreviewImages([]);
    } else if (selectedFiles.length > 1) {
      const remainingFiles = [...selectedFiles];
      remainingFiles.splice(currentActiveImage, 1);
      const newIndex = Math.max(0, currentActiveImage - 1);
      if (remainingFiles[newIndex]) {
        const image = await fileToBase64(remainingFiles[newIndex]);
        setCurrentImage(image);
      }
    }
  }, [selectedFiles, currentActiveImage]);

  const handleRemoveAll = useCallback(() => {
    setUploadError(null);
    setSelectedFiles([]);
    setCurrentActiveImage(0);
    setCurrentImage(null);
    setPreviewImages([]);
    setIsImageChanged?.(true);
  }, []);

  const handleResetCrop = useCallback(async () => {
    if (!selectedFiles[currentActiveImage]) return handleRemoveCurrent();

    const base64Data = await fileToBase64(selectedFiles[currentActiveImage]);
    setDialogOpen(false);
    setCurrentImage(base64Data);
    setIsImageChanged?.(true);
  }, [selectedFiles, currentActiveImage, handleRemoveCurrent]);

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

  const openCropDialog = () => setDialogOpen(true);

  const canAddMoreImages = selectedFiles.length < maximumImage;
  const currentFileName = selectedFiles[currentActiveImage]?.name || "Image";

  return (
    <div className="space-y-4">
      {uploadError && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {selectedFiles.length > 0 && currentImage ? (
        <>
          <ImageCrop
            file={selectedFiles[currentActiveImage]}
            maxImageSize={1024 * 1024}
            onCrop={handleCropChange}
          >
            <section className="rounded-lg px-4 border bg-accent h-96 overflow-hidden relative">
              <div className="absolute flex items-center justify-between left-0 top-0 p-3 bg-linear-to-b from-black/80 to-transparent w-full z-10 ">
                {/* File Name */}
                <div className="flex items-center gap-2 flex-1">
                  <FileImage className="w-4 h-4 text-white" />
                  <span
                    className="text-white text-sm font-medium truncate w-50 md:w-70"
                    title={currentFileName}
                  >
                    {currentFileName}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveCurrent}
                        type="button"
                        className="bg-white/20 hover:bg-red-500/20 hover:border-red-500 hover:text-white text-white h-8 w-8 p-0 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent side="top">Delete image</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddMoreImages}
                        type="button"
                        disabled={!canAddMoreImages}
                        className="bg-white/20 hover:bg-emerald-500/20 hover:border-emerald-500 hover:text-white text-white h-8 w-8 p-0 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Add Image</TooltipContent>
                  </Tooltip>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/20 hover:bg-blue-500/20 hover:border-blue-500 hover:text-white text-white h-8 w-8 p-0 cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="fixed top-2 right-0 w-56 bg-white rounded-md shadow-xl border border-gray-200 z-10"
                      sideOffset={8}
                      collisionPadding={16}
                    >
                      <div className="p-1">
                        <DropdownMenuItem
                          onClick={handleReplaceImage}
                          className="flex items-center w-full px-3 py-2.5 text-sm rounded-md hover:bg-indigo-100 cursor-pointer transition-colors focus:bg-indigo-100 outline-none"
                        >
                          <div className="flex items-center justify-center w-5 h-5 mr-3 bg-indigo-100 rounded">
                            <Replace className="w-3.5 h-3.5 text-indigo-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium text-gray-900">Replace</p>
                            <p className="text-xs text-gray-500">
                              Upload new image
                            </p>
                          </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={openCropDialog}
                          className="flex items-center w-full px-3 py-2.5 text-sm rounded-md hover:bg-blue-100 cursor-pointer transition-colors focus:bg-blue-100 outline-none"
                        >
                          <div className="flex items-center justify-center w-5 h-5 mr-3 bg-blue-100 rounded">
                            <Pencil className="w-3.5 h-3.5 text-blue-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium text-gray-900">Edit</p>
                            <p className="text-xs text-gray-500">
                              Crop & adjust
                            </p>
                          </div>
                        </DropdownMenuItem>

                        <div className="border-t border-gray-100 my-1"></div>

                        <DropdownMenuItem
                          onClick={handleRemoveAll}
                          className="flex items-center w-full px-3 py-2.5 text-sm rounded-md hover:bg-red-100 cursor-pointer transition-colors focus:bg-red-100 outline-none"
                        >
                          <div className="flex items-center justify-center w-5 h-5 mr-3 bg-red-100 rounded">
                            <TrashIcon className="w-3.5 h-3.5 text-red-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium">Delete All</p>
                            <p className="text-xs text-red-500">
                              Remove all images
                            </p>
                          </div>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <img
                alt={`Image ${currentActiveImage + 1}`}
                src={currentImage}
                className="mx-auto h-full w-auto object-contain"
              />

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                {currentActiveImage + 1} / {selectedFiles.length}
              </div>

              {/* image Previews */}
              {selectedFiles.length > 0 && (
                <div className="absolute bottom-4 left-4 flex gap-1">
                  {previewImages.slice(0, 4).map((preview, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${
                        currentActiveImage === index
                          ? "border-white ring-1 ring-white scale-105"
                          : "border-transparent hover:border-white/50 "
                      }`}
                      onClick={() => changeActiveImage(index)}
                    >
                      <img
                        src={preview}
                        alt={`Thumb ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {selectedFiles.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentActiveImage - 1 < 0}
                    onClick={() => {
                      if (currentActiveImage - 1 < 0) return;
                      changeActiveImage(currentActiveImage - 1);
                    }}
                    type="button"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg transition-all duration-200 h-10 w-10 p-0 cursor-pointer rounded-full flex"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentActiveImage + 1 >= selectedFiles.length}
                    onClick={() => {
                      if (currentActiveImage + 1 >= selectedFiles.length)
                        return;
                      changeActiveImage(currentActiveImage + 1);
                    }}
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg transition-all duration-200 h-10 w-10 p-0 cursor-pointer rounded-full flex"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </>
              )}
            </section>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogContent className="dark sm:max-w-[425px] font-outfit!">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    Edit image {currentActiveImage + 1}
                  </DialogTitle>
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
                    <XIcon className="w-4 h-4 mr-1" />
                    Reset Crop
                  </Button>
                  <Button
                    onClick={handleRemoveCurrent}
                    variant="destructiveOutline"
                    size="sm"
                    type="button"
                  >
                    <TrashIcon className="w-4 h-4 mr-1" />
                    Delete Image
                  </Button>
                  <ImageCropApply asChild>
                    <Button size="sm" type="button">
                      <CropIcon className="w-4 h-4 mr-1" />
                      Apply Crop
                    </Button>
                  </ImageCropApply>
                </div>
              </DialogContent>
            </Dialog>
          </ImageCrop>

          {/* Hidden inputs */}
          <Input
            id="add-more-images"
            accept="image/*"
            onChange={handleFileChange}
            multiple
            type="file"
            className="hidden"
          />
          <Input
            id="replace-image"
            accept="image/*"
            onChange={handleReplaceFileChange}
            type="file"
            className="hidden"
          />
        </>
      ) : (
        <div className="w-full">
          <label
            htmlFor="dropzone-file"
            className={cn(
              "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition text-center",
              uploadError
                ? "border-red-300 bg-red-50 text-red-500"
                : isDragging
                  ? "border-primary bg-primary/10"
                  : "border-gray-300 bg-muted/30 hover:bg-muted/50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center px-4">
              <Upload
                className={cn(
                  "w-8 h-8 mb-4",
                  uploadError ? "text-red-400" : "text-muted-foreground"
                )}
              />

              <p
                className={cn(
                  "mb-1 text-sm",
                  uploadError ? "text-red-500" : ""
                )}
              >
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>

              <p
                className={cn(
                  "text-xs",
                  uploadError ? "text-red-400" : "text-muted-foreground"
                )}
              >
                Upload minimum 1 image, maximum {maximumImage} images
              </p>
            </div>

            <Input
              id="dropzone-file"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <p className="text-xs text-muted-foreground mt-3">
            Note: Max file size is {maxImageSizeReadable} MB per image
          </p>
        </div>
      )}
    </div>
  );
}
