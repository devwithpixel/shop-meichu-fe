/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useCallback, useEffect, useRef, useState } from "react"; 
import { useForm } from "react-hook-form";
import { requestProductSchema } from "@/schema/request-product";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import CheckoutForm from "./request-product-form";
import RequestProductProgress from "./request-product-progress";
import { useStepProgress } from "@/hooks/use-step-progress";
import { createRequest } from "@/lib/api/requests";
import { createImage } from "@/lib/api/strapi-image";
import { displayValidationError } from "@/lib/validation-handler";

type ReferenceImageType = File | string;

export default function RequestProductClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof requestProductSchema>>({
    resolver: zodResolver(requestProductSchema),
    defaultValues: {
      buyerName: "",
      contactPlatform: "whatsapp",
      contact: "",
      referenceImages: [],
      note: "",
    },
    mode: "onSubmit",
  });

  const prevFormValuesRef = useRef({
    buyerName: "",
    contact: "",
    referenceImages: [] as ReferenceImageType[],
    note: "",
  });

  const { progressSteps, updateStepStatus, markAllCompleted, resetProgress } =
    useStepProgress();

  const watchAllFields = form.watch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const { buyerName, contact, referenceImages, note } = watchAllFields;
      const prevValues = prevFormValuesRef.current;

      const hasChanged =
        buyerName !== prevValues.buyerName ||
        contact !== prevValues.contact ||
        referenceImages?.length !== prevValues.referenceImages?.length ||
        note !== prevValues.note;

      if (hasChanged) {
        updateStepStatus({
          buyerName,
          contact,
          referenceImages,
          note,
        });

        prevFormValuesRef.current = {
          buyerName: buyerName || "",
          contact: contact || "",
          referenceImages: referenceImages || [],
          note: note || "",
        };
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [watchAllFields, updateStepStatus]);

  const onSubmit = useCallback(
    async (data: z.infer<typeof requestProductSchema>) => {
      setIsSubmitting(true); 
      try {
        const { referenceImages, ...requestProductData } = data;
        const imagesResult = await createImage(referenceImages);

        switch (imagesResult.type) {
          case "validation":
          case "error":
            toast.error("An error occured when uploading reference image!");
            return;
        }

        const result = await createRequest({
          ...requestProductData,
          referenceImages: imagesResult.data.map((image) => image.id),
        });

        switch (result.type) {
          case "success":
            toast.success("Request process submitted successfully.");
            markAllCompleted();

            form.reset();

            if (resetProgress) {
              resetProgress();
            }

            prevFormValuesRef.current = {
              buyerName: "",
              contact: "",
              referenceImages: [],
              note: "",
            };
            break;
          case "validation":
            displayValidationError(form, result.validation);
            break;
          case "error":
            toast.error(result.message);
            break;
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, markAllCompleted, resetProgress]
  );

  return (
    <form
      id="checkout-form"
      className="grid md:grid-cols-3 md:grid-rows-1"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <RequestProductProgress progressSteps={progressSteps} />
      <CheckoutForm
        form={form}
        className="md:col-span-2"
        isSubmitting={isSubmitting}
      />
    </form>
  );
}
