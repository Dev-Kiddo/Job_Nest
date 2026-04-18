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
  verifiedAt: Date;
  verifiedBy: Types.ObjectId;
  isActive: boolean;
}
