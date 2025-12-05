import * as z from "zod";

export const checkoutSchema = z.object({
  buyerName: z
    .string()
    .min(1, "Buyer name is required")
    .max(255, "Buyer name must be at most 255 characters."),
  contact: z
    .string()
    .min(1, "Contact is required")
    .max(255, "Contact must be at most 255 characters.")
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex =
          /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

        return emailRegex.test(value) || phoneRegex.test(value);
      },
      {
        message: "Contact must be a valid email address or phone number",
      }
    ),
  note: z
    .string()
    .max(4096, "Notes must be at most 4096 characters.")
    .optional(),
  orderItems: z
    .array(
      z.object({
        productId: z.number(),
        quantity: z.number().min(1, "Quantity must be at least 1."),
      })
    )
    .min(1, "At least one item is required"),
});
