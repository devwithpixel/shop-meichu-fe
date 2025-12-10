import { z } from "zod";
import { imageValidation } from "./template";

export const upsertProductSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9 ]+$/, "Only alphanumeric and spaces allowed")
    .min(1, "The name field is required.")
    .max(255, "The name field must be at most 255 characters long."),
  fields: z
    .array(z.object({ title: z.string().min(1), content: z.string().min(0) }))
    .min(1, "The fields field is required.")
    .max(4, "The fields field must be at most 4 fields long."),
  backgroundColor: z
    .string()
    .regex(
      /^#[0-9A-Fa-f]{6}$/,
      "Must be a valid hex color code (e.g., #FF5733)"
    )
    .min(1, "The background color field is required."),
  price: z.preprocess(
    (value) => (value === "" ? null : Number(value)),
    z
      .number()
      .min(0, "The price field is required.")
      .max(20000000, "The price field must be at most 20000000.")
  ),
  origin: z
    .string()
    .min(1, "The origin field is required.")
    .max(300, "The origin field must be at most 300 characters long."),
  category: z.string().min(1, "The category field is required."),
  images: z
    .array(imageValidation)
    .min(1, "The images field is required.")
    .max(5, "The images field must be at most 5 images long."),
});
