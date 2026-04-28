import mongoose from "mongoose";
import type { ICompany } from "../types/companyTypes.js";

const CompanySchema = new mongoose.Schema<ICompany>(
  {
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    name: {
      type: String,
      trim: true,
      maxLength: [100, "Company name cannot exceed 100 characters"],
      required: [true, "Company name is required"],
      unique: true,
    },
    description: {
      type: String,
      maxLength: [5000, "Description cannot exceed 5000 characters"],
    },
    tagline: {
      type: String,
      maxLength: [150, "Description cannot exceed 150 characters"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    logo: {
      publicId: String,
      url: String,
    },
    banner: {
      publicId: String,
      url: String,
    },
    website: {
      type: String,
      default: null,
    },
    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5000+"],
    },
    foundedYear: {
      type: Number,
      min: 1800,
      max: [new Date().getFullYear(), "Founded year cannot be in future"],
    },
    companyType: {
      type: String,
      enum: ["public", "private", "startup", "nonprofit", "government"],
      default: "private",
    },
    locations: [
      {
        city: String,
        state: String,
        country: {
          type: String,
          default: "india",
        },
        address: String,
      },
    ],
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    contactPhone: {
      type: String,
      trim: true,
    },
    socialLinks: [
      {
        name: String,
        baseUrl: String,
      },
    ],
    verifiedAt: {
      type: Date,
      default: null,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    registerStages: {
      type: String,
      enum: ["setup", "stage1", "stage2", "finished"],
      default: "setup",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const CompanyModel = mongoose.model("Company", CompanySchema);

export default CompanyModel;
