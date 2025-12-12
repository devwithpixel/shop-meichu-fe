import { BaseModel } from "./base-model";

export interface Role extends BaseModel {
  name: string;
  description: string;
  type: string;
}
