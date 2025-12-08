"use client";

import { CreditCard, User } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, type UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarkRequired } from "@/components/form/mark-required";
import * as z from "zod";

import type { checkoutSchema } from "@/schema/checkout";

export default function CheckoutForm({
  form,
  className,
}: {
  form: UseFormReturn<z.infer<typeof checkoutSchema>>;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-4 md:p-6 font-inter mb-4 md:mb-6">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <User className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 font-rubik">
            Contact Information
          </h2>
        </div>

        <div className="space-y-3 md:space-y-4">
          <FieldGroup>
            <Controller
              name="buyerName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-buyerName"
                    className="text-sm md:text-base"
                  >
                    Buyer Name <MarkRequired />
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-buyerName"
                    required
                    aria-invalid={fieldState.invalid}
                    placeholder="Buyer Name"
                    className="h-10 md:h-12 text-sm md:text-base"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="contact"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-contact"
                    className="text-sm md:text-base"
                  >
                    Contact <MarkRequired />
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-contact"
                    required
                    aria-invalid={fieldState.invalid}
                    placeholder="Your contact (email or phone)"
                    className="h-10 md:h-12 text-sm md:text-base"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="note"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-note"
                    className="text-sm md:text-base"
                  >
                    Note
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-note"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your note"
                    className="h-10 md:h-12 text-sm md:text-base"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>
      </div>

      <Button
        type="submit"
        variant="default"
        className="w-full h-11 md:h-12 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all group disabled:opacity-50 cursor-pointer text-sm md:text-base"
      >
        <CreditCard className="text-white group-hover:-translate-x-1 transition-transform w-4 h-4 md:w-5 md:h-5" />
        Complete Order
      </Button>
    </div>
  );
}
