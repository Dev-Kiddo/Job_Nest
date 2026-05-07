import type { Types } from "mongoose";

export interface ICandidate {
  user: Types.ObjectId;
  fullName: string;
  totalExperience: number;
  location: {
    country: string;
  };
  dateOfBirth: Date;
  gender: "male" | "female" | "";
  avatar: {
    publicId: string;
    url: string;
  };
  banner: {
    publicId: string;
    url: string;
  };
  headline: string;
  skills: [string];
  languages: [string];
  experience: {
    title: string;
    company: string;
    location: string;
    companyExperience: string;
  };
  education: {
    degree: string;
    field: string;
    institution: string;
    year: number;
  };
  resumeUrl: string;
  isActive: boolean;

  socialLinks: { name: String, baseUrl: String }[],
;
  createdAt: Date;
  updatedAt: Date;
}
