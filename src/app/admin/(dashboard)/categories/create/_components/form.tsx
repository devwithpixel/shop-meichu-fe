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
import { ImageField } from "@/components/form/image";
import { Input } from "@/components/ui/input";
import { MarkRequired } from "@/components/form/mark-required";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { displayValidationError } from "@/lib/validation-handler";
import { upsertCategorySchema } from "@/schema/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback } from "react";
import toast from "react-hot-toast";
import InputColor from "@/components/form/input-color";

import { createCategory } from "@/lib/api/categories";
import { createImage } from "@/lib/api/strapi-image";
import { redirect } from "next/navigation";

export function CreateCategoryForm() {
  const form = useForm<z.infer<typeof upsertCategorySchema>>({
    resolver: zodResolver(upsertCategorySchema),
    defaultValues: {
      name: "",
      backgroundColor: "#000000",
      thumbnail: undefined,
    },
  });

  const onSubmit = useCallback(
    async (formData: z.infer<typeof upsertCategorySchema>) => {
      const categoryThumbnail = formData.thumbnail;
      const headingThumbnail = formData.heading.thumbnail;

      const categoryThumbnailResult = await createImage(categoryThumbnail);
      switch (categoryThumbnailResult.type) {
        case "validation":
        case "error":
          toast.error("An error occured when uploading the category image!");
          return;
      }

      const headingThumbnailResult = await createImage(headingThumbnail);
      switch (headingThumbnailResult.type) {
        case "validation":
        case "error":
          toast.error("An error occured when uploading the category image!");
          return;
      }

      const result = await createCategory({
        ...formData,
        thumbnail: categoryThumbnailResult.data[0].id,
        heading: {
          ...formData.heading,
          thumbnail: headingThumbnailResult.data[0].id,
        },
      });

      switch (result.type) {
        case "success":
          toast.success("Category successfully created!");
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
                      <InputColor {...field} />
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
                    <ImageField field={field} />
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
                    <ImageField field={field} />
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
            <Button type="submit">Create</Button>
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
}
