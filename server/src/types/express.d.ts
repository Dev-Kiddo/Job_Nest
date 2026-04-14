import type { IUser } from "./userTypes.ts";

export interface IUserAuthPayload {
  id: Types.ObjectId;
  email?: string;
  role: "user" | "admin" | "moderator";
  sessionId: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: IUserAuthPayload;
    }
  }
}
