import * as z from "zod";

export const subscribeSchema = z.object({
  email: z
    .email()
    .min(1, "The email field is required.")
    .max(255, "The email field must be at most 255 characters long."),
});
