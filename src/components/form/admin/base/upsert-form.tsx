"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  type FieldValues,
  Resolver,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { $ZodTypes } from "zod/v4/core";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

interface ModelProps {
  singular: string;
  plural: string;
}

interface UpsertFormProps<
  TData extends FieldValues = FieldValues,
  TForm extends z.ZodObject<ZodFormSchema<TData>, z.core.$strip> = z.ZodObject<
    ZodFormSchema<TData>,
    z.core.$strip
  >,
> {
  id: string;
  type: "create" | "update";
  model: ModelProps;
  formSchema: TForm;
  defaultValues: TData;
  formFields?: (
    formId: string,
    form: UseFormReturn<TData, any, TData>
  ) => React.ReactNode;
  onSubmit: (
    form: UseFormReturn<TData, any, TData>,
    data: TData
  ) => Promise<void>;
}

type ZodFormSchema<T> = {
  [K in keyof T]: $ZodTypes;
};

export default function UpsertForm<
  TData extends FieldValues = FieldValues,
  TForm extends z.ZodObject<ZodFormSchema<TData>, z.core.$strip> = z.ZodObject<
    ZodFormSchema<TData>,
    z.core.$strip
  >,
>(props: UpsertFormProps<TData, TForm>) {
  const formElemRef = useRef<HTMLFormElement>(null);
  const form = useForm<TData>({
    resolver: zodResolver(props.formSchema) as unknown as Resolver<
      TData,
      any,
      TData
    >,
    defaultValues: props.defaultValues as DefaultValues<TData>,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {props.type === "create" ? "Create new " : "Edit a "}
          {props.model.singular}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          ref={formElemRef}
          id={`form-${props.id}`}
          onSubmit={form.handleSubmit(
            (data) => props.onSubmit(form, data),
            (error) => {
              console.log(error);
            }
          )}
        >
          {props.formFields?.(props.id, form)}
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form={`form-${props.id}`}>
            {props.type === "create" ? "Create" : "Update"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
