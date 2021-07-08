import { Roles } from "../utils/roleEnum";

export interface IUserInfo {
  userId: string;
  email: string;
  role: Roles;
}

export interface IUserUnsecure {
  userId: string;
  email: string;
  role: Roles;
  password: string;
}

export interface IUserInput {
  email: string;
  role: Roles;
  password: string;
}
