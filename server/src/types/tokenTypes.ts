import { Types } from "mongoose";
import type { IUser } from "./userTypes.js";

export type AccessTokenPayload = Pick<IUser, "id" | "email" | "role">;

export type RefreshTokenPayload = Pick<IUser, "id">;
