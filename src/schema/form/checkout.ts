import * as z from "zod";

export const checkoutSchema = z.object({
  buyerName: z
    .string()
    .min(1, "Buyer name is required")
    .max(255, "Buyer name must be at most 255 characters."),
  contact: z
    .string()
    .min(1, "Contact is required")
    .max(255, "Contact must be at most 255 characters."),
  note: z.string().max(4096, "Notes must be at most 4096 characters."),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
    })
  ),
});
