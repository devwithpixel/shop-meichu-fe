import type { BaseModel } from "./models/base-model";
import type { Role } from "./models/role";

export interface User extends BaseModel {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: Role;
}
