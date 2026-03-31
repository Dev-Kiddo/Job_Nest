import type { Types } from "mongoose";

export interface ICandidate {
  user: Types.ObjectId;
  phone: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  dateOfBirth: Date;
  gender: "M" | "F";
  avatar: {
    public_id: string;
    url: string;
  };
  headline: string;
  biography: string;
  skills: {
    name: string;
    level: "beginner" | "intermediate" | "expert";
  }[];
  experience: {
    title: string;
    company: string;
    location: string;
    startDate: Date;
    endDate: Date;
    isCurrent: boolean;
    description: string;
  }[];
  education: {
    degree: string;
    field: string;
    institution: string;
    year: number;
  }[];
  resumeUrl: string;
  totalExperience: number;
  expectedSalary: {
    min: number;
    max: number;
    currency: string;
  };
  preferredLocations: string[];
  preferences: {
    jobType: string[];
    workMode: string[];
    noticePeriod: string;
  };
  socialLinks: {
    linkedin: string;
    github: string;
    portfolio: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
