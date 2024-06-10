import { Token } from "./token.interface";

export interface User {
  id: string;
  name: string;
  email: string;
  isDeleted: boolean;
}

export interface UserResponse {
  user: User,
  tokens: Token
}