import mongoose from "mongoose";
import type { ICandidate } from "../types/candidateTypes.js";

const profileSchema = new mongoose.Schema<ICandidate>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fullName: {
    type: String,
  },
  totalExperience: Number,
  location: {
    country: String,
  },
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ["male", "female", ""],
  },
  avatar: {
    publicId: String,
    url: String,
  },
  banner: {
    publicId: String,
    url: String,
  },
  headline: String,
  skills: [String],
  languages: [String],
  experience: {
    title: String,
    company: String,
    location: String,
    companyExperience: String,
  },
  education: {
    degree: String,
    field: String,
    institution: String,
    year: Number,
  },

  resumeUrl: {
    public_id: String,
    url: String,
    fileName: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  socialLinks: [{ name: String, baseUrl: String }],
  createdAt: Date,
  updatedAt: Date,
});

const Profilemodel = mongoose.model("Profile", profileSchema);

export default Profilemodel;
