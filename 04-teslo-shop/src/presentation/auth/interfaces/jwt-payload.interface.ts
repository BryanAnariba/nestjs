export interface JWTPayload {
  id: string;
  email: string;
  roles: string[];
}