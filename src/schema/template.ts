import * as z from "zod";
import { maxFileSize } from "@/config/form";
import { bytesToMB } from "@/lib/utils";

export const imageValidation = z
  .instanceof(File, { message: "Please select an image file." })
  .refine((file) => file.size > 0, {
    message: "Image file is required.",
  })
  .refine((file) => file.size <= maxFileSize, {
    message: `Image file size must be less than ${bytesToMB(maxFileSize)} MB.`,
  })
  .refine(
    (file) => {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      return validTypes.includes(file.type);
    },
    {
      message: "Only JPEG, PNG images are allowed.",
    }
  );
