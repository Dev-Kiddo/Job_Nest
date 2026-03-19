import type { Types } from "mongoose";

export interface IUser {
  id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "seeker" | "employer" | "admin";
  avatar: {
    public_id: string;
    url: string;
  };
  phone: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  authProvider: "local" | "google";
  googleId: string;
  isEmailVerified: boolean;
  emailVerificationToken: string;
  emailVerificationExpires: Date;
  passwordResetToken: string;
  passwordResetExpires: Date;
  lastLogin: Date;
  isActive: boolean;
  updatedAt: Date;
  deletedAt: Date;
  comparePassword: (password: string) => boolean;
}
