"use client";

import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  createImage,
  createItem,
  getSpecificItem,
  updateItem,
} from "@/actions/admin";
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
import { Textarea } from "@/components/ui/textarea";
import { MultipleImageField } from "@/components/form/multiple-image";
import { ImageField } from "@/components/form/image";
import { redirect } from "next/navigation";
import { MarkRequired } from "@/components/form/mark-required";
import { upsertCategorySchema } from "@/schema/categories";
import { upsertProductSchema } from "@/schema/products";
import UpsertForm from "@/components/form/admin/base/upsert-form";

import type { Category } from "@/types/strapi/models/category";
import type { Product } from "@/types/strapi/models/product";

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
  const [isImageChanged, setIsImageChanged] = useState(false);
  const defaultValues = useMemo(
    () =>
      props.type === "create"
        ? {
            name: "",
            backgroundColor: "",
            thumbnail: null,
            heading: {
              title: "",
              description: "",
              thumbnail: undefined,
            },
          }
        : {
            name: props.data.name,
            backgroundColor: props.data.backgroundColor,
            thumbnail: props.data.thumbnail,
            heading: props.data.heading,
          },
    [props]
  );

  return (
    <UpsertForm
      id={`${props.type}-category`}
      type={props.type}
      model={{ singular: "Category", plural: "Categories" }}
      title={props.data?.name}
      formSchema={upsertCategorySchema}
      defaultValues={defaultValues}
      formFields={(formId, form) => {
        return (
          <>
            <FieldGroup className="mb-12">
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
                name="backgroundColor"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={`form-${formId}-input-background-color`}
                    >
                      Background Color
                      <MarkRequired />
                    </FieldLabel>
                    <Input
                      {...field}
                      type="color"
                      minLength={7}
                      maxLength={7}
                      required
                      id={`form-${formId}-input-background-color`}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="thumbnail"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`form-${formId}-input-thumbnail`}>
                      Thumbnail
                      <MarkRequired />
                    </FieldLabel>
                    <ImageField
                      field={field}
                      defaultValue={
                        props.type === "create"
                          ? undefined
                          : `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${props.data.thumbnail?.url}`
                      }
                      setIsImageChanged={setIsImageChanged}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <h3 className="text-xl font-semibold mb-5">Heading</h3>
            <FieldGroup>
              <Controller
                name="heading.title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`form-${formId}-input-heading-title`}>
                      Title
                      <MarkRequired />
                    </FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      required
                      id={`form-${formId}-input-heading-title`}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="heading.description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={`form-${formId}-input-heading-description`}
                    >
                      Description
                      <MarkRequired />
                    </FieldLabel>
                    <Textarea
                      {...field}
                      required
                      id={`form-${formId}-input-heading-description`}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="heading.thumbnail"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={`form-${formId}-input-heading-thumbnail`}
                    >
                      Thumbnail
                      <MarkRequired />
                    </FieldLabel>
                    <ImageField
                      field={field}
                      defaultValue={
                        props.type === "create"
                          ? undefined
                          : `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${props.data.heading!.thumbnail?.url}`
                      }
                      setIsImageChanged={setIsImageChanged}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </>
        );
      }}
      onSubmit={async (form, data) => {
        const { thumbnail, heading, ...restData } = data;

        const headingImage = heading!.thumbnail;
        delete heading!.thumbnail;

        const result =
          props.type === "create"
            ? await createItem<Category>("categories", {
                ...restData,
                heading: heading as any,
              })
            : await updateItem<Category>("categories", props.data.documentId, {
                ...restData,
                heading: heading as any,
              });

        const category = await getSpecificItem(
          "categories",
          (result as any).data!.data.slug
        );

        if (result.type === "success" && isImageChanged) {
          await createImage({
            morphId: (category as any).data.id,
            file: thumbnail as any,
            apiName: "api::category.category",
            fieldName: "thumbnail",
          });

          await createImage({
            morphId: (category as any).data.heading!.id,
            file: headingImage as any,
            apiName: "shared.heading",
            fieldName: "thumbnail",
          });
        }

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
      title={props.data?.name}
      formSchema={upsertProductSchema}
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
                    <SelectContent>
                      {props.categories.map((category) => (
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
