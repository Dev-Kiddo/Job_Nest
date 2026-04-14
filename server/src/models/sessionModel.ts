import mongoose from "mongoose";
import { DatabaseSync } from "node:sqlite";

const SessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    deviceInfo: {
      browser: String,
      os: String,
      device: String,
      userAgent: String,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    location: {
      city: String,
      region: String,
      country: String,
      timeZone: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    lastActive: {
      type: Date,
      default: Date.now(),
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const SessionModel = mongoose.model("Session", SessionSchema);

export default SessionModel;
