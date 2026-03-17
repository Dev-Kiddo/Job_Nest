import { Types } from "mongoose";

export interface IAccessTokenPayload {
  id: Types.ObjectId;
  email?: string;
  role: "user" | "admin" | "moderator";
}

export interface IRefreshTokenPayload {
  id: Types.ObjectId;
}
