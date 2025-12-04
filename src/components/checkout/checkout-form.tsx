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

import type { checkoutSchema } from "@/schema/form/checkout";

export default function CheckoutForm({
  form,
}: {
  form: UseFormReturn<z.infer<typeof checkoutSchema>>;
}) {
  return (
    <div className="flex justify-stretch">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 font-inter">
        <div className="flex items-center gap-2 mb-6">
          <User className="w-6 h-6 text-gray-900" />
          <h2 className="text-xl font-semibold text-gray-900 font-rubik">
            Contact Information
          </h2>
        </div>

        <div className="space-y-4">
          <FieldGroup>
            <Controller
              name="buyerName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-buyerName">
                    Buyer Name <MarkRequired />
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-buyerName"
                    required
                    aria-invalid={fieldState.invalid}
                    placeholder="Buyer Name"
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
                  <FieldLabel htmlFor="form-contact">
                    Contact <MarkRequired />
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-contact"
                    required
                    aria-invalid={fieldState.invalid}
                    placeholder="Your contact (email or phone)"
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
        variant="default"
        className="w-full h-12 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all group disabled:opacity-50 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <CreditCard
            size={100}
            className="text-white group-hover:-translate-x-1 transition-transform"
          />
          Complete Order
        </div>
      </Button>
    </div>
  );
}
