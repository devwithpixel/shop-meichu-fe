import type { OrderItem } from "@/types/strapi/components/order/order-item";
import type { BaseModel } from "@/types/strapi/models/base-model";

export interface Order extends BaseModel {
  buyerName: string;
  contact: string;
  note?: string;
  orderStatus:
    | "pending"
    | "confirmed"
    | "in_progress"
    | "completed"
    | "cancelled";
  items: OrderItem[];
}
