import type { Types } from "mongoose";

export interface IUser {
  id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "candidate" | "recruiter" | "admin";
  avatar: {
    public_id: string | null;
    url: string | null;
  };
  phone: string | null;
  location: {
    city: string;
    state: string;
    country: string;
  };
  authProvider: "local" | "google";
  googleId: string | null;
  isEmailVerified: boolean;
  emailVerificationToken: string | null;
  emailVerificationExpires: Date | null;
  passwordResetToken: string | null;
  passwordResetExpires: Date | null;
  lastLogin: Date;
  isActive: boolean;
  updatedAt: Date;
  deletedAt: Date;
  comparePassword: (password: string) => boolean;
}
