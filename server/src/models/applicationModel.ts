import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Applicant is required"],
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job is required"],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required"],
    },
    coverLetter: {
      type: String,
      maxLength: [5000, "Cover letter cannot exceed 5000 characters"],
    },
    resume: {
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "shortlisted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const ApplicationModel = mongoose.model("Application", ApplicationSchema);

export default ApplicationModel;
