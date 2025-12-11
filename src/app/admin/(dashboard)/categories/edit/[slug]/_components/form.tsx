"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerFormatSelect,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@/components/ui/color-picker";
import { Spinner } from "@/components/ui/spinner";
import { MultipleImage } from "@/components/form/multiple-image";
import { Input } from "@/components/ui/input";
import { MarkRequired } from "@/components/form/mark-required";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { displayValidationError } from "@/lib/validation-handler";
import { upsertCategorySchema } from "@/schema/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";

import { updateCategory } from "@/lib/api/categories";
import { createImage } from "@/lib/api/strapi-image";
import { redirect } from "next/navigation";

import type { Category } from "@/types/strapi/models/category";
import { fetchImageAsFile } from "@/lib/utils";

export function UpdateCategoryForm({ data }: { data: Category }) {
  const form = useForm<z.infer<typeof upsertCategorySchema>>({
    resolver: zodResolver(upsertCategorySchema),
    defaultValues: {
      name: data.name || undefined,
      backgroundColor: data.backgroundColor || "#FFFFFF",
      thumbnail: [],
      heading: {
        title: data.heading!.title || undefined,
        description: data.heading!.description || undefined,
        thumbnail: [],
      },
    },
  });

  useEffect(() => {
    const fetchImage = async () => {
      if (data.thumbnail) {
        const file = await fetchImageAsFile(data.thumbnail);
        form.setValue("thumbnail", [file]);
      }
      if (data.heading?.thumbnail) {
        const file = await fetchImageAsFile(data.heading.thumbnail);
        form.setValue("heading.thumbnail", [file]);
      }
    };

    fetchImage();
  }, [data]);

  const onSubmit = useCallback(
    async (formData: z.infer<typeof upsertCategorySchema>) => {
      if (form.getFieldState("thumbnail").isDirty) {
        const categoryThumbnailResult = await createImage(formData.thumbnail);
        switch (categoryThumbnailResult.type) {
          case "validation":
          case "error":
            toast.error("An error occured when uploading the category image!");
            return;
        }
        formData.thumbnail = categoryThumbnailResult.data[0].id as any;
      } else {
        formData.thumbnail = data.thumbnail!.id as any;
      }

      if (form.getFieldState("heading.thumbnail").isDirty) {
        const headingThumbnailResult = await createImage(
          formData.heading.thumbnail
        );
        switch (headingThumbnailResult.type) {
          case "validation":
          case "error":
            toast.error("An error occured when uploading the category image!");
            return;
        }
        formData.heading!.thumbnail = headingThumbnailResult.data[0].id as any;
      } else {
        formData.heading!.thumbnail = data.heading!.thumbnail!.id as any;
      }

      const result = await updateCategory(data.documentId, formData);

      switch (result.type) {
        case "success":
          toast.success("Category successfully updated!");
          redirect("/admin/categories");
        case "validation":
          toast.error("Validation error");
          displayValidationError(form, result.validation);
          break;
        case "error":
          toast.error(result.message);
          break;
      }
    },
    [form]
  );

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <FieldSet>
            <FieldGroup className="mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        Name
                        <MarkRequired />
                      </FieldLabel>
                      <Input
                        {...field}
                        type="text"
                        required
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
                      <FieldLabel>
                        Background Color
                        <MarkRequired />
                      </FieldLabel>
                      <ColorPicker
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultFormat="hex"
                        format="hex"
                        required
                      >
                        <div className="flex items-center gap-3">
                          <ColorPickerTrigger asChild>
                            <Button
                              variant="outline"
                              className="justify-start w-full"
                            >
                              <ColorPickerSwatch className="size-4" />
                              {field.value}
                            </Button>
                          </ColorPickerTrigger>
                        </div>
                        <ColorPickerContent>
                          <ColorPickerArea />
                          <div className="flex items-center gap-2">
                            <ColorPickerEyeDropper />
                            <div className="flex flex-1 flex-col gap-2">
                              <ColorPickerHueSlider />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <ColorPickerFormatSelect />
                            <ColorPickerInput />
                          </div>
                        </ColorPickerContent>
                      </ColorPicker>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <Controller
                name="thumbnail"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Thumbnail
                      <MarkRequired />
                    </FieldLabel>
                    <MultipleImage
                      value={field.value}
                      onChange={field.onChange}
                      maximumFiles={1}
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
                    <FieldLabel>
                      Title
                      <MarkRequired />
                    </FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      required
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
                    <FieldLabel>
                      Description
                      <MarkRequired />
                    </FieldLabel>
                    <Textarea
                      {...field}
                      required
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
                    <FieldLabel>
                      Thumbnail
                      <MarkRequired />
                    </FieldLabel>
                    <MultipleImage
                      value={field.value}
                      onChange={field.onChange}
                      maximumFiles={1}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
        </CardContent>

        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button disabled={form.formState.isSubmitting} type="submit">
              {form.formState.isSubmitting && <Spinner />}
              Edit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
}
