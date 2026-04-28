import type { Types } from "mongoose";

export interface ICompany {
  user: Types.ObjectId[];
  name: string;
  description: string;
  tagline: string;
  isVerified: boolean;
  logo: string | null;
  banner: string | null;
  website: string | null;
  companySize: string;
  foundedYear: number;
  companyType: string;
  locations: {
    city: string;
    state: string;
    country: string;
    address: string;
  }[];
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  verifiedAt: Date;
  verifiedBy: Types.ObjectId;
  isActive: boolean;
  registerStages: "setup" | "stage1" | "stage2" | "finished";
}
