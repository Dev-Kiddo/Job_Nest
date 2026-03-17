import type { IUser } from "./userTypes.ts";

export interface IUserAuthPayload {
  id: Types.ObjectId;
  email?: string;
  role: "user" | "admin" | "moderator";
}

declare global {
  namespace Express {
    export interface Request {
      user: IUserAuthPayload;
    }
  }
}
