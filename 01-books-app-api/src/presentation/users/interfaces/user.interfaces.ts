export interface UserResponse {
  user: User;
  token: string;
}

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}