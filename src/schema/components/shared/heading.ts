import { z } from "zod";
import { imageValidation } from "../../template";

export const headingSchema = z.object({
  title: z
    .string()
    .regex(/^[a-zA-Z0-9 ]+$/, "Only alphanumeric and spaces allowed")
    .min(1, "The title field is required.")
    .max(255, "The title field must be at most 255 characters long."),
  description: z
    .string()
    .min(1, "The description field is required.")
    .max(4096, "The description field must be at most 4096 characters long."),
  thumbnail: z
    .array(imageValidation)
    .min(1, "The thumbnail field is required.")
    .max(1, "The thumbnail field must be at most 1 image."),
});
