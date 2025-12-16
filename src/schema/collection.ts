import { z } from "zod";
import { headingSchema } from "./components/shared/heading";

export const upsertCollectionSchema = z.object({
  heading: headingSchema,
});
