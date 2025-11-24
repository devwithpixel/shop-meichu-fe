"use client";

import * as z from "zod";

import { useState } from "react";
import { toast } from "sonner";
import { createItem, createProductImage } from "@/actions/admin";
import { Controller, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { displayValidationError } from "@/lib/validation-handler";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Pencil, X } from "lucide-react";
import { base64ToFile, fileToBase64 } from "@/lib/utils";
import { ControllerRenderProps, FieldPath } from "react-hook-form";
import UpsertForm from "@/components/form/admin/base/upsert-form";

import type { Category } from "@/types/strapi/models/category";
import type { Product } from "@/types/strapi/models/product";
import type { ChangeEvent } from "react";
import { redirect } from "next/navigation";

function ImageField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ field }: { field: ControllerRenderProps<TFieldValues, TName> }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const base64Data = await fileToBase64(file);
    setSelectedFile(file);
    setCurrentImage(base64Data);
    field.onChange(file);
  };

  const handleCropChange = async (data: string) => {
    const file = base64ToFile(data, "image.jpg");
    setDialogOpen(false);
    setCurrentImage(data);
    field.onChange(file);
  };

  const handleRemove = () => {
    setCurrentImage(null);
    setDialogOpen(false);
    field.onChange(undefined);
  };

  const handleResetCrop = async () => {
    if (!selectedFile) return handleRemove();

    const base64Data = await fileToBase64(selectedFile);
    setDialogOpen(false);
    setCurrentImage(base64Data);
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
            <ImageCropContent className="max-w-md" />
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
    <Input
      accept="image/*"
      onChange={handleFileChange}
      maxLength={1}
      type="file"
    />
  );
}

export function CreateCategoryForm() {
  return (
    <UpsertForm
      id="create-category"
      type="create"
      model={{ singular: "Category", plural: "Categories" }}
      formSchema={z.object({
        name: z.string().min(1, "The name field is required."),
      })}
      defaultValues={{
        name: "",
      }}
      formFields={(formId, form) => {
        return (
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-${formId}-input-name`}>
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    required
                    id={`form-${formId}-input-name`}
                    aria-invalid={fieldState.invalid}
                    autoComplete="name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        );
      }}
      onSubmit={async (form, data) => {
        const result = await createItem<Category>("categories", data);

        switch (result.type) {
          case "success":
            toast.success("Action completed successfully!", {
              style: {
                "--normal-bg":
                  "color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))",
                "--normal-text":
                  "light-dark(var(--color-green-600), var(--color-green-400))",
                "--normal-border":
                  "light-dark(var(--color-green-600), var(--color-green-400))",
              } as React.CSSProperties,
            });
            redirect("/admin/categories");
            break;
          case "validation":
            toast.error("Validation error", {
              style: {
                "--normal-bg":
                  "color-mix(in oklab, var(--destructive) 10%, var(--background))",
                "--normal-text": "var(--destructive)",
                "--normal-border": "var(--destructive)",
              } as React.CSSProperties,
            });
            displayValidationError(form, result.validation);
            break;
          case "error":
            toast.error(result.message, {
              style: {
                "--normal-bg":
                  "color-mix(in oklab, var(--destructive) 10%, var(--background))",
                "--normal-text": "var(--destructive)",
                "--normal-border": "var(--destructive)",
              } as React.CSSProperties,
            });
            break;
        }
      }}
    />
  );
}

export function CreateProductForm({ categories }: { categories: Category[] }) {
  return (
    <UpsertForm
      id="create-product"
      type="create"
      model={{ singular: "Product", plural: "Products" }}
      formSchema={z.object({
        name: z.string().min(1, "The name field is required."),
        description: z.string().min(1, "The description field is required."),
        price: z.coerce.number().min(1, "The price field is required."),
        stock: z.coerce.number().min(1, "The stock field is required."),
        category: z.coerce.number("The category field is required."),
        image: z
          .instanceof(File, { message: "Please select an image file." })
          .refine((file) => file.size > 0, {
            message: "Image file is required.",
          })
          .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "Image file size must be less than 5MB.",
          })
          .refine(
            (file) => {
              const validTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp",
              ];
              return validTypes.includes(file.type);
            },
            {
              message: "Only JPEG, PNG, WebP images are allowed.",
            }
          ),
      })}
      defaultValues={{
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: undefined,
        image: undefined,
      }}
      formFields={(formId, form) => {
        return (
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-${formId}-input-name`}>
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    required
                    id={`form-${formId}-input-name`}
                    aria-invalid={fieldState.invalid}
                    autoComplete="name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-${formId}-input-description`}>
                    Description
                  </FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    required
                    id={`form-${formId}-input-description`}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-${formId}-input-price`}>
                    Price
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    required
                    id={`form-${formId}-input-price`}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="stock"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-${formId}-input-stock`}>
                    Stock
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    required
                    id={`form-${formId}-input-stock`}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-${formId}-input-category`}>
                    Category
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id={`form-${formId}-input-category`}
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-${formId}-input-image`}>
                    Image
                  </FieldLabel>
                  <ImageField field={field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        );
      }}
      onSubmit={async (form, data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { image: _, ...selectedData } = data;
        const result = await createItem<Product>("products", selectedData);
        if (result.type === "success") {
          await createProductImage({
            productId: result.data.data.id,
            file: data.image as unknown as File,
          });
        }

        switch (result.type) {
          case "success":
            toast.success("Action completed successfully!", {
              style: {
                "--normal-bg":
                  "color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))",
                "--normal-text":
                  "light-dark(var(--color-green-600), var(--color-green-400))",
                "--normal-border":
                  "light-dark(var(--color-green-600), var(--color-green-400))",
              } as React.CSSProperties,
            });
            redirect("/admin/products");
            break;
          case "validation":
            toast.error("Validation error", {
              style: {
                "--normal-bg":
                  "color-mix(in oklab, var(--destructive) 10%, var(--background))",
                "--normal-text": "var(--destructive)",
                "--normal-border": "var(--destructive)",
              } as React.CSSProperties,
            });
            displayValidationError(form, result.validation);
            break;
          case "error":
            toast.error(result.message, {
              style: {
                "--normal-bg":
                  "color-mix(in oklab, var(--destructive) 10%, var(--background))",
                "--normal-text": "var(--destructive)",
                "--normal-border": "var(--destructive)",
              } as React.CSSProperties,
            });
            break;
        }
      }}
    />
  );
}
