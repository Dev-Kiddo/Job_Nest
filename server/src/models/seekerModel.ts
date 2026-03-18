import mongoose from "mongoose";
import type { ISeeker } from "../types/seekerTypes.js";

const seekerSchema = new mongoose.Schema<ISeeker>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  headline: String,
  bio: String,
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

const SeekerModel = mongoose.model("Seeker", seekerSchema);

export default SeekerModel;
