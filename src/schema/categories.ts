import { imageValidation } from "./template";
import { headingSchema } from "./components/shared/heading";
import * as z from "zod";

export const upsertCategorySchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9 ]+$/, "Only alphanumeric and spaces allowed")
    .min(1, "The name field is required.")
    .max(255, "The name field must be at most 255 characters long."),
  backgroundColor: z
    .string()
    .regex(
      /^#[0-9A-Fa-f]{6}$/,
      "Must be a valid hex color code (e.g., #FF5733)"
    )
    .min(1, "Background color is required"),
  thumbnail: z
    .array(imageValidation)
    .min(1, "The thumbnail field is required")
    .max(1, "The thumbnail field must be at most 1 image"),
  heading: headingSchema,
});
