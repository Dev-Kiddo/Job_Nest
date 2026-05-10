import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    description: {
      type: String,
      maxLength: [400, "Description cannot exceed 400 characters"],
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

const CategoryModel = mongoose.model("Category", CategorySchema);

export default CategoryModel;
