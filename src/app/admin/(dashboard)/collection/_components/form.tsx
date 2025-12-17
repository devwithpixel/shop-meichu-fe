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
import { Spinner } from "@/components/ui/spinner";
import { MultipleImage } from "@/components/form/multiple-image";
import { Input } from "@/components/ui/input";
import { MarkRequired } from "@/components/form/mark-required";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { displayValidationError } from "@/lib/validation-handler";
import { upsertCollectionSchema } from "@/schema/collection";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback, useEffect } from "react";
import { fetchImageAsFile } from "@/lib/utils";
import toast from "react-hot-toast";

import { updateCollection } from "@/lib/api/collection";
import { createImage } from "@/lib/api/strapi-image";
import { redirect } from "next/navigation";

import type { Collection } from "@/types/strapi/single-type/collection";

export function CollectionForm({ data }: { data?: Collection }) {
  const form = useForm<z.infer<typeof upsertCollectionSchema>>({
    resolver: zodResolver(upsertCollectionSchema),
    defaultValues: {
      heading: {
        title: data?.heading?.title,
        description: data?.heading?.description,
        thumbnail: [],
      },
    },
  });

  useEffect(() => {
    const fetchImage = async () => {
      if (data?.heading?.thumbnail) {
        const file = await fetchImageAsFile(data.heading.thumbnail);
        form.setValue("heading.thumbnail", [file]);
      }
    };

    fetchImage();
  }, [data]);

  const onSubmit = useCallback(
    async (formData: z.infer<typeof upsertCollectionSchema>) => {
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
        formData.heading!.thumbnail = data?.heading?.thumbnail?.id as any;
      }

      const result = await updateCollection(formData);

      switch (result.type) {
        case "success":
          toast.success("Collection successfully updated!");
          redirect("/admin/collection");
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
                      aspectRatio={16 / 9}
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
