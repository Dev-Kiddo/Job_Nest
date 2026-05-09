import mongoose from "mongoose";
import { maxLength } from "zod";

const CategortSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    description: {
      trpe: String,
      maxLength: [300, "Description cannot exceed 300 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    jobCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const CategoryModel = mongoose.model("Category", CategortSchema);

export default CategoryModel;
