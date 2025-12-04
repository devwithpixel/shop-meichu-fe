import type { BaseModel } from "@/types/strapi/models/base-model";
import type { StrapiImage } from "@/types/strapi/media/image";

export interface Review extends BaseModel {
  review: string;
  avatar: StrapiImage;
  name: string;
  location?: string;
}
