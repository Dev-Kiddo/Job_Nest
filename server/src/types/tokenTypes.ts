import { Types } from "mongoose";

export interface IAccessTokenPayload {
  id: string;
  email?: string;
  role: "user" | "admin" | "moderator";
}

export interface IRefreshTokenPayload {
  id: string;
}
