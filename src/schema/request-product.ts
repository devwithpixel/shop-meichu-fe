import { imageValidation } from "./template";
import * as z from "zod";

export const requestProductSchema = z
  .object({
    buyerName: z
      .string()
      .min(1, "Name is required")
      .max(255, "Name must be at most 255 characters."),
    contactPlatform: z.enum(["whatsapp", "email", "instagram", "facebook"]),
    contact: z
      .string()
      .min(1, "Contact is required")
      .max(255, "Contact must be at most 255 characters."),
    note: z
      .string()
      .max(4096, "Notes must be at most 4096 characters.")
      .optional(),
    referenceImages: z
      .array(imageValidation)
      .min(1, "Minimum 1 reference image is required")
      .max(4, "Maximum 4 reference images"),
  })
  .refine(
    (data) => {
      const { contactPlatform, contact } = data;

      switch (contactPlatform) {
        case "email": {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(contact)) {
            throw new z.ZodError([
              {
                code: "custom",
                message:
                  "Please enter a valid email address (e.g., example@gmail.com)",
                path: ["contact"],
              },
            ]);
          }
          return true;
        }

        case "whatsapp": {
          const internationalRegex = /^\+[\d\s\-()]+$/;
          const localRegex = /^0[\d\s\-()]+$/;

          const isInternational = contact.startsWith("+");
          const isLocal = contact.startsWith("0");

          if (!isInternational && !isLocal) {
            throw new z.ZodError([
              {
                code: "custom",
                message: "Number must start with + or 0",
                path: ["contact"],
              },
            ]);
          }

          if (contact.startsWith("+0")) {
            throw new z.ZodError([
              {
                code: "custom",
                message:
                  "Invalid format. Use + for international or 0 for local, not both",
                path: ["contact"],
              },
            ]);
          }

          if (/[a-zA-Z]/.test(contact)) {
            throw new z.ZodError([
              {
                code: "custom",
                message: "Letters are not allowed",
                path: ["contact"],
              },
            ]);
          }

          const invalidChars = contact.slice(1).replace(/[\d\s\-()]/g, "");
          if (invalidChars.length > 0) {
            throw new z.ZodError([
              {
                code: "custom",
                message:
                  "Only numbers, spaces, dashes, and parentheses allowed",
                path: ["contact"],
              },
            ]);
          }

          if (isInternational && !internationalRegex.test(contact)) {
            throw new z.ZodError([
              {
                code: "custom",
                message: "Invalid format. Use +62 812-3456-7890",
                path: ["contact"],
              },
            ]);
          }

          if (isLocal && !localRegex.test(contact)) {
            throw new z.ZodError([
              {
                code: "custom",
                message: "Invalid format. Use 0812-3456-7890",
                path: ["contact"],
              },
            ]);
          }

          const digitsOnly = contact.replace(/[\s\-()]/g, "");

          if (isInternational && digitsOnly.length < 8) {
            throw new z.ZodError([
              {
                code: "custom",
                message: "Too short. Minimum 8 characters",
                path: ["contact"],
              },
            ]);
          }

          if (isLocal && digitsOnly.length < 10) {
            throw new z.ZodError([
              {
                code: "custom",
                message: "Too short. Minimum 10 digits for local number",
                path: ["contact"],
              },
            ]);
          }

          if (digitsOnly.length > 16) {
            throw new z.ZodError([
              {
                code: "custom",
                message: "Too long. Maximum 15 digits",
                path: ["contact"],
              },
            ]);
          }

          return true;
        }

        case "instagram": {
          return true;
        }

        case "facebook": {
          return true;
        }

        default:
          return false;
      }
    },
    {
      message: "Invalid contact format for selected platform",
      path: ["contact"],
    }
  );