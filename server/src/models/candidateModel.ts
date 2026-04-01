import mongoose from "mongoose";
import type { ICandidate } from "../types/candidateTypes.js";

const candidateSchema = new mongoose.Schema<ICandidate>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  phone: {
    type: String,
    trim: true,
  },
  location: {
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true, default: "India" },
  },
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ["M", "F"],
  },
  avatar: {
    public_id: String,
    url: String,
  },
  headline: String,
  biography: String,
  skills: [
    {
      name: String,
      level: {
        type: String,
        enum: ["beginner", "intermediate", "expert"],
      },
    },
  ],
  experience: [
    {
      title: String,
      company: String,
      location: String,
      startDate: Date,
      endDate: Date,
      isCurrent: Boolean,
      description: String,
    },
  ],
  education: [
    {
      degree: String,
      field: String,
      institution: String,
      year: Number,
    },
  ],
  resumeUrl: String,
  totalExperience: Number,
  expectedSalary: {
    min: Number,
    max: Number,
    currency: String,
  },
  preferredLocations: [String],
  preferences: {
    jobType: [String],
    workMode: [String],
    noticePeriod: String,
  },
  socialLinks: {
    linkedin: String,
    github: String,
    portfolio: String,
  },
  createdAt: Date,
  updatedAt: Date,
});

const CandidateModel = mongoose.model("Candidate", candidateSchema);

export default CandidateModel;
