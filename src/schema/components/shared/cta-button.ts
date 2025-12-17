import { z } from "zod";

export const ctaButtonSchema = z.object({
  title: z
    .string()
    .regex(/^[a-zA-Z0-9 ]+$/, "Only alphanumeric and spaces allowed")
    .min(1, "The title field is required.")
    .max(255, "The title field must be at most 255 characters long."),
  url: z
    .string()
    .min(1, "The url field is required.")
    .max(255, "The url field must be at most 255 characters long."),
});
