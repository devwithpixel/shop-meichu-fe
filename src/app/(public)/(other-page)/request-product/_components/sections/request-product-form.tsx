/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useMemo, useState } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Controller, type UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MultipleImage } from "@/components/form/multiple-image";
import { Input } from "@/components/ui/input";
import { MarkRequired } from "@/components/form/mark-required";
import { Textarea } from "@/components/ui/textarea";
import { FaRegCheckCircle } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactPlatforms } from "@/lib/contact-platform";
import { cn } from "@/lib/utils";
import * as z from "zod";

import type { requestProductSchema } from "@/schema/request-product";
import { FaSpinner } from "react-icons/fa6";

export default function CheckoutForm({
  form,
  className,
  isSubmitting,
}: {
  form: UseFormReturn<z.infer<typeof requestProductSchema>>;
  className?: string;
  isSubmitting?: boolean;
}) {
  const [selectedPlatform, setSelectedPlatform] = useState("whatsapp");
  const currentPlatform = useMemo(
    () => contactPlatforms.find((p) => p.value === selectedPlatform),
    [selectedPlatform]
  );

  return (
    <div
      className={cn(
        "bg-gray-50 shadow-lg  md:rounded-r-2xl p-4 md:p-6 font-albert-sans min-w-0",
        className
      )}
    >
      <div className="space-y-3 md:space-y-10 border-[#E91E63] border-b-2 pb-8 ">
        <FieldSet>
          <FieldLegend
            variant="label"
            className="text-2xl! font-bold! font-albert-sans text-[#191715]"
          >
            Personal Informations
          </FieldLegend>
          <FieldGroup>
            <Controller
              name="buyerName"
              control={form.control}
              render={({ field, fieldState, formState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-buyerName"
                    className="text-xs md:text-sm"
                  >
                    Name, Full Name <MarkRequired />
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-buyerName"
                    required
                    aria-invalid={fieldState.invalid}
                    placeholder="Full Name"
                    className="h-10 md:h-12 text-sm md:text-base"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div>
              <div className="flex items-center justify-between">
                <FieldLabel className="text-xs md:text-sm mb-2 font-albert-sans">
                  Contact Platform <MarkRequired />
                </FieldLabel>
              </div>

              <div className="flex gap-2">
                <div className="w-36 md:w-40 shrink-0">
                  <Controller
                    name="contactPlatform"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedPlatform(value);
                            form.clearErrors("contact");
                            form.setValue("contact", "");
                          }}
                        >
                          <SelectTrigger
                            id="form-contactPlatform"
                            className="py-4.5 md:py-5.5 lg:py-6 text-sm md:text-base font-albert-sans cursor-pointer"
                          >
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent className="border-none!">
                            {contactPlatforms.map((platform) => {
                              const Icon = platform.icon;
                              return (
                                <SelectItem
                                  key={platform.value}
                                  value={platform.value}
                                >
                                  <div className="flex items-center gap-2 font-albert-sans font-medium">
                                    <Icon
                                      className={`w-4 h-4 ${platform.color}`}
                                    />
                                    <span>{platform.label}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <Controller
                    name="contact"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input
                          {...field}
                          id="form-contact"
                          required
                          aria-invalid={fieldState.invalid}
                          placeholder={
                            currentPlatform?.placeholder || "Your contact"
                          }
                          className="h-10 md:h-12 text-sm md:text-base"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </div>
            </div>
          </FieldGroup>
        </FieldSet>

        <FieldSet className="min-w-0">
          <FieldLegend
            variant="label"
            className="text-2xl! font-bold! font-albert-sans text-[#191715]"
          >
            Reference Image
          </FieldLegend>
          <Controller
            name="referenceImages"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="min-w-0">
                <FieldLabel className="text-xs md:text-sm">
                  Upload product reference <MarkRequired />
                </FieldLabel>
                <MultipleImage
                  value={field.value}
                  onChange={field.onChange}
                  maximumFiles={4}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldSet>

        <FieldSet>
          <FieldLegend
            variant="label"
            className="text-2xl! font-bold! font-albert-sans text-[#191715]"
          >
            Additional Notes
          </FieldLegend>
          <FieldGroup>
            <Controller
              name="note"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-note"
                    className="text-xs md:text-sm"
                  >
                    Extra request (optional) 
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="form-note"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your note"
                    className="min-h-[100px] text-sm md:text-base resize-none"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
          className="w-full md:w-auto h-11 md:h-12 bg-[#E91E63] hover:bg-[#C2185B] cursor-pointer text-sm md:text-base text-white shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin w-4 h-4 md:w-5 md:h-5 mr-2" />
              Processing...
            </>
          ) : (
            <>
              <FaRegCheckCircle className="text-white group-hover:-translate-x-1 transition-transform w-4 h-4 md:w-5 md:h-5 mr-2" />
              Complete Order
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
