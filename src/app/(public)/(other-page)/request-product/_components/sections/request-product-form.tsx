/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

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
import { Input } from "@/components/ui/input";
import { MarkRequired } from "@/components/form/mark-required";
import * as z from "zod";

import type { requestProductSchema } from "@/schema/request-product";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { FaRegCheckCircle } from "react-icons/fa";
import { MultipleImageRequestField } from "@/components/form/multiple-image-request-product";
import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FaCheck } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactPlatforms } from "@/lib/contact-platform";

export default function CheckoutForm({
  form,
  className,
}: {
  form: UseFormReturn<z.infer<typeof requestProductSchema>>;
  className?: string;
}) {
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("whatsapp");

  const currentPlatform = contactPlatforms.find(
    (p) => p.value === selectedPlatform
  );

  return (
    <div className={className}>
      <div className="bg-gray-50 shadow-lg rounded-b-2xl md:rounded-r-2xl p-4 md:p-6 font-albert-sans">
        <div className="space-y-3 md:space-y-10 border-[#E91E63] border-b-2 pb-8 ">
          {/* name */}
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

                <div className="grid grid-cols-5 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {/* Select */}
                  <div>
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

                  {/* Input */}
                  <div className="col-span-4 md:col-span-2 lg:col-span-4">
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

          {/* image */}
          <FieldSet>
            <FieldLegend
              variant="label"
              className="text-2xl! font-bold! font-albert-sans text-[#191715]"
            >
              Reference Image
            </FieldLegend>
            <TooltipProvider>
              <Controller
                name="referenceImages"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="text-xs md:text-sm">
                      Upload product reference <MarkRequired />
                    </FieldLabel>
                    <div className="space-y-2">
                      <MultipleImageRequestField
                        field={field}
                        maximumImage={4}
                        defaultValue={[]}
                        setIsImageChanged={setIsImageChanged}
                      />
                      {fieldState.invalid && (
                        <div className="text-sm text-red-500 mt-1">
                          {fieldState.error?.message}
                        </div>
                      )}
                    </div>
                  </Field>
                )}
              />
            </TooltipProvider>
          </FieldSet>

          {/* note */}
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
                      Extra request (optional) <MarkRequired />
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
            className="w-full md:w-auto h-11 md:h-12 bg-[#E91E63] hover:bg-[#C2185B] cursor-pointer text-sm md:text-base text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <FaRegCheckCircle className="text-white group-hover:-translate-x-1 transition-transform w-4 h-4 md:w-5 md:h-5 mr-2" />
            Complete Order
          </Button>
        </div>
      </div>
    </div>
  );
}
