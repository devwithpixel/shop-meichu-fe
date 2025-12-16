import { z } from "zod";
import { headingSchema } from "./components/shared/heading";
import { sectionSchema } from "./components/shared/section";
import { imageValidation } from "./template";

export const upsertAboutUsSchema = z.object({
  heading: headingSchema,
  message: z
    .string()
    .min(1, "The message field is required.")
    .max(4096, "The message field must be at most 4096 characters long."),
  messageSection: z.object({
    section: sectionSchema,
    image: z
      .array(imageValidation)
      .min(1, "The image field is required.")
      .max(1, "The image field must be at most 1 image."),
  }),
});
