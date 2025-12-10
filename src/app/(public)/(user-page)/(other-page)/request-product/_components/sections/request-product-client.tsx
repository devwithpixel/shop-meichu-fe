"use client";

import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { requestProductSchema } from "@/schema/request-product";
import { requestProduct } from "@/lib/api/request-product";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import CheckoutForm from "./request-product-form";
import RequestProductProgress from "./request-product-progress";
import { useStepProgress } from "@/hooks/use-step-progress";

export default function RequestProductClient() {
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
    referenceImages: [] as any[],
    note: "",
  });

  const {
    progressSteps,
    updateStepStatus,
    markAllCompleted,
    setConfirmationActive,
    resetConfirmation,
  } = useStepProgress();

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
      setConfirmationActive();

      try {
        const result = await requestProduct(data);

        switch (result.type) {
          case "success":
            toast.success("Request successfully created.");
            markAllCompleted();
            break;
          case "validation":
            const errors = result.validation.details
              .errors as unknown as Array<string>;
            toast.error(errors[0]);
            resetConfirmation();
            break;
          case "error":
            toast.error(result.message);
            resetConfirmation();
            break;
        }
      } catch (error) {
        console.error("Submit error:", error);
        toast.error("An unexpected error occurred");
        resetConfirmation();
      }
    },
    [markAllCompleted, setConfirmationActive, resetConfirmation]
  );

  return (
    <form
      id="checkout-form"
      className="grid md:grid-cols-3 md:grid-rows-1"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <RequestProductProgress progressSteps={progressSteps} />
      <CheckoutForm form={form} className="md:col-span-2" />
    </form>
  );
}
