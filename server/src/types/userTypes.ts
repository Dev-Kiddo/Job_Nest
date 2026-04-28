import type { Types } from "mongoose";

interface ISessionCollection {
  deviceInfo: string;
  ipAddress: string;
  location: string;
  isActive: boolean;
}

export interface IUser {
  id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "candidate" | "recruiter" | "admin";
  avatar: {
    publicId: string | null;
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
  needaCompanySetup: boolean;
  isEmailVerified: boolean;
  emailVerificationToken: string | null;
  emailVerificationExpires: Date | null;
  passwordResetToken: string | null;
  passwordResetExpires: Date | null;
  lastLogin: Date;
  isActive: boolean;
  updatedAt: Date;
  sessionCollections: { deviceInfo: string; ipAddress: string; location: string }[];
  deletedAt: Date;
  comparePassword: (password: string) => boolean;
}
