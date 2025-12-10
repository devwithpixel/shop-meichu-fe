import * as z from "zod";

export const loginSchema = z.object({
  email: z.email().min(1, "The email field is required."),
  password: z.string().min(1, "The password field is required."),
});
