import mongoose from "mongoose";

const RecruiterSchema = new mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      trim: true,
      maxLength: [100, "Company name cannot exceed 100 characters"],
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
      type: String,
      default: null,
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
    headquarters: {
      city: String,
      state: String,
      country: { type: String, default: "India" },
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
        isHeadquarters: {
          type: Boolean,
          default: false,
        },
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const RecruiterModel = mongoose.model("Recruiter", RecruiterSchema);

export default RecruiterModel;
