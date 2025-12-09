import type { BaseModel } from "@/types/strapi/models/base-model";
import type { StrapiImage } from "@/types/strapi/media/image";

export interface Request extends BaseModel {
  buyerName: string;
  contactPlatform: "email" | "instagram" | "whatsapp" | "facebook";
  contact: string;
  note?: string;
  requestStatus:
    | "pending"
    | "confirmed"
    | "in_progress"
    | "completed"
    | "cancelled";
  referenceImages?: StrapiImage[];
}
