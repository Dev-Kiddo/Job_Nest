import jwt from "jsonwebtoken";
import type { AccessTokenPayload, RefreshTokenPayload } from "../types/tokenTypes.js";
import crypto from "crypto";

export const generateAccessToken = function (user: AccessTokenPayload) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_ACCESS_KEY!, { expiresIn: "15m", issuer: "jobnest", audience: "jobnest-users" });
};

export const generateRefreshToken = function (user: RefreshTokenPayload) {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_KEY!, { expiresIn: "2d", issuer: "jobnest", audience: "jobnest-users" });
};

export const verifyAccessToken = function (token: string) {
  try {
    const verifyToken = jwt.verify(token, process.env.JWT_ACCESS_KEY!, { issuer: "jobnest", audience: "jobnest-users" });

    return verifyToken;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = function (token: string) {
  try {
    const verifyToken = jwt.verify(token, process.env.JWT_REFRESH_KEY!, { issuer: "jobnest", audience: "jobnest-users" });

    return verifyToken;
  } catch (error) {
    return null;
  }
};

export const generateRandomToken = function () {
  const randomToken = crypto.randomBytes(32).toString("hex");
  return randomToken;
};

export const hashToken = function (token: string) {
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  return hash;
};
