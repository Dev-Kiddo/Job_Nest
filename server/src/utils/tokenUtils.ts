import jwt from "jsonwebtoken";
import type { IAccessTokenPayload, IRefreshTokenPayload } from "../types/tokenTypes.js";
import crypto from "crypto";

const generateAccessToken = function (user: IAccessTokenPayload) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_ACCESS_KEY!, { expiresIn: "15m", issuer: "jobnest", audience: "jobnest-users" });
};

const generateRefreshToken = function (user: IRefreshTokenPayload) {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_KEY!, { expiresIn: "2d", issuer: "jobnest", audience: "jobnest-users" });
};

const verifyAccessToken = function (token: string) {
  try {
    const verifyToken = jwt.verify(token, process.env.JWT_ACCESS_KEY!, { issuer: "jobnest", audience: "jobnest-users" });

    return verifyToken;
  } catch (error) {
    return null;
  }
};

const verifyRefreshToken = function (token: string) {
  try {
    const verifyToken = jwt.verify(token, process.env.JWT_REFRESH_KEY!, { issuer: "jobnest", audience: "jobnest-users" });

    return verifyToken;
  } catch (error) {
    return null;
  }
};

const generateRandomToken = function () {
  const randomToken = crypto.randomBytes(32).toString("hex");
  return randomToken;
};

const hashToken = function (token: string) {
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  return hash;
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateRandomToken,
  hashToken,
};
