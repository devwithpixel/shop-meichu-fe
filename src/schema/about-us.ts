import { z } from "zod";
import { headingSchema } from "@/schema/components/shared/heading";
import { sectionSchema } from "@/schema/components/shared/section";
import { imageValidation, videoSchema } from "@/schema/template";
import { reviewSectionSchema } from "@/schema/components/home-page/review-section";
import { ctaButtonSchema } from "./components/shared/cta-button";

export const upsertAboutUsSchema = z.object({
  heading: headingSchema,
  message: z
    .string()
    .min(1, "The message field is required.")
    .max(4096, "The message field must be at most 4096 characters long."),
  messageSection: z.object({
    section: sectionSchema,
    image: z
      .array(imageValidation)
      .min(1, "The image field is required.")
      .max(1, "The image field must be at most 1 image."),
  }),
  videoSection: z.object({
    message: z
      .string()
      .min(1, "The message field is required.")
      .max(4096, "The message field must be at most 4096 characters long."),
    video: z
      .array(videoSchema)
      .min(1, "The video field is required.")
      .max(1, "The video field must be at most 1 video."),
    cards: z
      .array(
        z.object({
          header: z
            .string()
            .min(1, "The header field is required.")
            .max(255, "The header field must be at most 255 characters long."),
          description: z
            .string()
            .max(
              4096,
              "The description field must be at most 4096 characters long."
            ),
          ctaButton: ctaButtonSchema,
        })
      )
      .min(1, "The cards field is required.")
      .max(2, "The cards field must be at most 2 cards."),
  }),
  reviewSection: reviewSectionSchema,
});
