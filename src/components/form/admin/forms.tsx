"use client";

import * as z from "zod";

import { toast } from "react-hot-toast";
import { createImage, createItem, updateItem } from "@/actions/admin";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { displayValidationError } from "@/lib/validation-handler";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bytesToMB } from "@/lib/utils";
import { redirect } from "next/navigation";
import { maxFileSize } from "@/config/form";
import { MarkRequired } from "@/components/form/mark-required";
import UpsertForm from "@/components/form/admin/base/upsert-form";

import type { Category } from "@/types/strapi/models/category";
import type { Product } from "@/types/strapi/models/product";
import { useMemo, useState } from "react";
import { MultipleImageField } from "../multiple-image";

interface CreateFormProps {
  type: "create";
  data?: undefined;
}

interface UpdateFormProps<T> {
  type: "update";
  data: T;
}

type UpsertFormProps<T> = CreateFormProps | UpdateFormProps<T>;

export function UpsertCategoryForm(props: UpsertFormProps<Category>) {
  const defaultValues = useMemo(
    () =>
      props.type === "create"
        ? {
            name: "",
          }
        : {
            name: props.data.name,
          },
    [props]
  );

  return (
    <UpsertForm
      id={`${props.type}-category`}
      type={props.type}
      model={{ singular: "Category", plural: "Categories" }}
      formSchema={z.object({
        name: z
          .string()
          .regex(/^[a-zA-Z0-9 ]+$/, "Only alphanumeric and spaces allowed")
          .min(1, "The name field is required."),
      })}
      defaultValues={defaultValues}
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
                    <MarkRequired />
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
        const result =
          props.type === "create"
            ? await createItem<Category>("categories", data)
            : await updateItem<Category>(
                "categories",
                props.data.documentId,
                data
              );

        switch (result.type) {
          case "success":
            toast.success("Action completed successfully!");
            redirect("/admin/categories");
          case "validation":
            toast.error("Validation error");
            displayValidationError(form, result.validation);
            break;
          case "error":
            toast.error(result.message);
            break;
        }
      }}
    />
  );
}

export function UpsertProductForm(
  props: UpsertFormProps<Product> & { categories: Category[] }
) {
  const defaultImages = useMemo(() => {
    return (
      props.data?.images?.map(
        (image) => `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${image?.url}`
      ) || []
    );
  }, [props.data]);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const defaultValues = useMemo(
    () =>
      props.type === "create"
        ? {
            name: "",
            description: "",
            price: 0,
            stock: 0,
            category: undefined,
            images: [],
          }
        : {
            name: props.data.name,
            description: props.data.description,
            price: props.data.price,
            stock: props.data.stock,
            category: props.data.category?.id
              ? String(props.data.category?.id)
              : undefined,
            images: [],
          },
    [props]
  );

  return (
    <UpsertForm
      id={`${props.type}-product`}
      type={props.type}
      model={{ singular: "Product", plural: "Products" }}
      formSchema={z.object({
        name: z
          .string()
          .regex(/^[a-zA-Z0-9 ]+$/, "Only alphanumeric and spaces allowed")
          .min(1, "The name field is required."),
        description: z.string().min(1, "The description field is required."),
        price: z.coerce.number().min(0, "The price field is required."),
        stock: z.coerce.number().min(0, "The stock field is required."),
        category: z.coerce.number("The category field is required."),
        images: z.array(
          z
            .instanceof(File, { message: "Please select an image file." })
            .refine((file) => file.size > 0, {
              message: "Image file is required.",
            })
            .refine((file) => file.size <= maxFileSize, {
              message: `Image file size must be less than ${bytesToMB(maxFileSize)} MB.`,
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
            )
        ),
      })}
      defaultValues={defaultValues}
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
                    <MarkRequired />
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
                    <MarkRequired />
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
                    <MarkRequired />
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
                    <MarkRequired />
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
                    <MarkRequired />
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
                    <SelectContent className="border-gray-400! bg-card">
                      {props.categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                          className="text-white"
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
              name="images"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`form-${formId}-input-image`}>
                    Image
                    <MarkRequired />
                  </FieldLabel>
                  <MultipleImageField
                    defaultValue={defaultImages}
                    field={field}
                    setIsImageChanged={setIsImageChanged}
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { images, ...selectedData } = data;
        const result =
          props.type === "create"
            ? await createItem<Product>("products", selectedData as any)
            : await updateItem<Product>("products", props.data.documentId, {
                ...selectedData,
                images: [],
              } as any);

        if (result.type === "success" && isImageChanged) {
          for (const image of images) {
            await createImage({
              morphId: result.data.data.id,
              file: image,
              apiName: "api::product.product",
              fieldName: "images",
            });
          }
        }

        switch (result.type) {
          case "success":
            toast.success("Action completed successfully!");
            redirect("/admin/products");
          case "validation":
            toast.error("Validation error");
            displayValidationError(form, result.validation);
            break;
          case "error":
            toast.error(result.message);
            break;
        }
      }}
    />
  );
}
