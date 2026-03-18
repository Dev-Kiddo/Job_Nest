import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import type { IUser } from "../types/userTypes.js";

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      minLength: 4,
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["seeker", "recruiter", "admin"],
        message: "Role must be seeker, employer, or admin",
      },
      default: "seeker",
    },
    avatar: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
    location: {
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true, default: "India" },
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true,
      default: null,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      default: null,
    },
    emailVerificationExpires: {
      type: Date,
      default: null,
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    passwordResetExpires: {
      type: Date,
      default: null,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    updatedAt: {
      type: Date,
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
  }
});

UserSchema.methods.comparePassword = async function (userPassword: string) {
  if (!this.password) {
    return false;
  }

  const comparePassword = await bcrypt.compare(userPassword, this.password);
  // console.log(comparePassword);

  return comparePassword;
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
