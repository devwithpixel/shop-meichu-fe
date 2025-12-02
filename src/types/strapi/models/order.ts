import { OrderItem } from "@/types/strapi/components/order/order-item";

export interface Order {
  id: number;
  documentId: string;
  buyerName: string;
  contact: string;
  orderStatus:
    | "pending"
    | "confirmed"
    | "in_progress"
    | "completed"
    | "cancelled";
  orderItems: OrderItem[];
}
