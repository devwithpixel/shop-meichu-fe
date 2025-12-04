import type { StrapiImage } from "@/types/strapi/media/image";

export interface Heading {
  title: string;
  description: string;
  thumbnail?: StrapiImage;
}
