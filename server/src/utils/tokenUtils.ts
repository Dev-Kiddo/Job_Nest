import jwt from "jsonwebtoken";
import type { AccessTokenPayload, RefreshTokenPayload } from "../types/tokenTypes.js";
import crypto from "crypto";

export const generateAccessToken = function (user: AccessTokenPayload) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role, sessionId: user.sessionId }, process.env.JWT_ACCESS_KEY!, {
    expiresIn: "15m",
    issuer: "jobnest",
    audience: "jobnest-users",
  });
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

export const generateAccessAndRefreshToken = function (isUser, sessionToken, response) {
  const accessTokenPayload = { id: isUser._id, email: isUser.email, role: isUser.role, sessionId: sessionToken };

  const accessToken = generateAccessToken(accessTokenPayload);

  const refreshTokenPayload = { id: isUser._id };
  const refreshToken = generateRefreshToken(refreshTokenPayload);

  response.cookie("accessToken", accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });

  response.cookie("refreshToken", refreshToken, { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "lax" });
};
