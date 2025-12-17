import { z } from "zod";
import { sectionSchema } from "@/schema/components/shared/section";

export const reviewSectionSchema = z.object({
  section: sectionSchema,
  reviews: z
    .array(
      z.object({
        id: z.string().min(1, "The reviews field is required."),
        name: z
          .string()
          .min(1, "The reviews field is required.")
          .max(255, "The reviews field is required."),
      })
    )
    .min(1, "The reviews field is required."),
});
