"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { MarkRequired } from "@/components/form/mark-required";
import { MultipleImageField } from "@/components/form/multiple-image";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ChevronUp, Trash2Icon } from "lucide-react";
import { displayValidationError } from "@/lib/validation-handler";
import { upsertProductSchema } from "@/schema/products";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCallback } from "react";
import toast from "react-hot-toast";
import InputColor from "@/components/form/input-color";

import { createProduct } from "@/lib/api/products";
import { createImage } from "@/lib/api/strapi-image";
import { redirect } from "next/navigation";

import type { Category } from "@/types/strapi/models/category";
import { RichTextEditor } from "@/components/form/rich-text-editor";

export default function CreateProductForm({
  categories,
}: {
  categories: Category[];
}) {
  const form = useForm<z.infer<typeof upsertProductSchema>>({
    resolver: zodResolver(upsertProductSchema) as any,
    defaultValues: {
      name: "",
      fields: [],
      backgroundColor: "#ffffff",
      price: 0,
      origin: "",
      category: "",
      images: [],
    },
  });

  const fields = useFieldArray({
    control: form.control,
    name: "fields",
  });

  const onSubmit = useCallback(
    async (formData: z.infer<typeof upsertProductSchema>) => {
      const { images, ...productData } = formData;

      const imagesResult = await createImage(images);
      switch (imagesResult.type) {
        case "validation":
        case "error":
          toast.error("An error occured when uploading the product image!");
          return;
      }

      const result = await createProduct({
        ...productData,
        images: imagesResult.data.map((image) => image.id),
      });

      switch (result.type) {
        case "success":
          toast.success("Product successfully created!");
          redirect("/admin/products");
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                <Controller
                  name="price"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        Price
                        <MarkRequired />
                      </FieldLabel>
                      <Input
                        {...field}
                        type="number"
                        step={1000}
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
                  name="origin"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        Origin
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
                  name="category"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        Category
                        <MarkRequired />
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger aria-invalid={fieldState.invalid}>
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
              </div>
              <Controller
                name="images"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Images
                      <MarkRequired />
                    </FieldLabel>
                    <MultipleImageField field={field} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
          <FieldSet className="gap-4">
            <FieldLegend variant="label">
              Fields <MarkRequired />
            </FieldLegend>
            <FieldDescription>
              Add up to 4 fields for product specification.
            </FieldDescription>
            <FieldGroup className="gap-4">
              {fields.fields.map((field, index) => (
                <Collapsible className="border rounded-md" key={field.id}>
                  <div className="p-3 w-full flex gap-3 items-center">
                    <CollapsibleTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full group"
                      >
                        <ChevronUp className="group-data-[state=open]:rotate-180 transition-transform" />
                      </Button>
                    </CollapsibleTrigger>
                    {field.title}
                    <InputGroupButton
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => fields.remove(index)}
                      aria-label={`Remove field ${index + 1}`}
                      className="ms-auto"
                    >
                      <Trash2Icon />
                    </InputGroupButton>
                  </div>

                  <CollapsibleContent className="px-3 pb-3 space-y-3">
                    <Controller
                      name={`fields.${index}.title`}
                      control={form.control}
                      render={({ field: controllerField, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>
                            Title
                            <MarkRequired />
                          </FieldLabel>
                          <FieldContent>
                            <InputGroup>
                              <InputGroupInput
                                {...controllerField}
                                aria-invalid={fieldState.invalid}
                                type="text"
                                required
                              />
                            </InputGroup>

                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </FieldContent>
                        </Field>
                      )}
                    />
                    <Controller
                      name={`fields.${index}.content`}
                      control={form.control}
                      render={({ field: controllerField, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>
                            Content
                            <MarkRequired />
                          </FieldLabel>
                          <FieldContent>
                            <RichTextEditor
                              value={controllerField.value}
                              onChange={controllerField.onChange}
                            />

                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </FieldContent>
                        </Field>
                      )}
                    />
                  </CollapsibleContent>
                </Collapsible>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fields.append({ title: "", content: "" })}
                disabled={fields.fields.length >= 4}
              >
                Add Specification Field
              </Button>
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
