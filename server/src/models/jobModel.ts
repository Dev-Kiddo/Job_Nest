import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxLength: [10000, "description cannot exceed 10000 characters"],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required"],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      rer: "User",
      required: ["true", "Posted by is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    skillsRequired: {
      type: [String],
    },
    experianceRequired: {
      min: {
        type: Number,
        min: [0, "experiance cannot be negative"],
      },
      max: {
        type: Number,
      },
    },
    educaitionRequired: {
      type: String,
      enum: ["any", "high-school", "diploma", "bachelor", "master", "phd"],
      default: "any",
    },
    salary: {
      min: {
        type: Number,
        default: null,
      },
      max: {
        type: Number,
        default: null,
      },
    },
    location: {
      city: String,
      state: String,
      country: String,
    },
    workMode: {
      type: String,
      enum: ["remote", "onsite", "hybrid"],
      default: "onsite",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship", "freelance"],
    },
    vacancies: {
      type: Number,
      default: 1,
      min: [1, "At least 1 vacancy required"],
    },
    applicationDeadline: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "paused", "closed", "expired"],
      default: "draft",
    },
    isActive: {
      type: String,
      default: true,
    },
    applicationCount: {
      type: Number,
      default: 0,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const JobModel = mongoose.model("job", JobSchema);

export default JobModel;
