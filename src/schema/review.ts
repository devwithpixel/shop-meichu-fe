import { z } from "zod";
import { imageValidation } from "./template";

export const reviewSchema = z.object({
  review: z
    .string()
    .min(1, "The review field is required.")
    .max(2048, "The review field must be at most 2048 characters long."),
  avatar: z
    .array(imageValidation)
    .min(1, "The avatar field is required.")
    .max(1, "The avatar field must be at most 1 image."),
  name: z.string().min(1, "The name field is required."),
});
