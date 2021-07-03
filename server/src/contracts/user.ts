import { Roles } from "../utils/roleEnum";

export interface IUser {
  userId: string;
  email: string;
  role: Roles;
}
