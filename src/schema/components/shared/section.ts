import { z } from "zod";

export const sectionSchema = z.object({
  title: z
    .string()
    .regex(/^[a-zA-Z0-9 ]+$/, "Only alphanumeric and spaces allowed")
    .min(1, "The title field is required.")
    .max(255, "The title field must be at most 255 characters long."),
  description: z
    .string()
    .max(4096, "The description field must be at most 4096 characters long."),
});
