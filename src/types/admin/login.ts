import { User } from "@/types/strapi/user";

export interface LoginResponse {
  jwt: string;
  user: User;
}
