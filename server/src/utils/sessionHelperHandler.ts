import { UAParser } from "ua-parser-js";
import { generateRandomToken } from "./tokenUtils.js";
import { asyncHandler } from "./asyncHandler.js";

export const generateSessionToken = function () {
  return `session_${generateRandomToken()}`;
};

export const getDeviceInfo = function (userAgent) {
  const parser = new UAParser(userAgent);
  const parserResult = parser.getResult();

  return {
    browser: `${parserResult.browser.name || "Unknown"} ${parserResult.browser.version || ""}`.trim(),
    os: `${parserResult.os.name || "Unknown"} ${parserResult.os.version || ""}`.trim(),
    device: parserResult.device.type || "Desktop",
    userAgent: userAgent,
  };
};

export const getClientIP = function (req) {
  return req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.headers["x-real-ip"] || req.connection.remoteAddress || req.socket.remoteAddress || req.ip;
};

export const getLocationFromIp = asyncHandler(async function (ip) {
  const getLocationIp = await fetch(`http://ip-api.com/json/${ip}`);
  const data = await getLocationIp.json();

  if (data.status === "success") {
    return {
      city: data.city,
      region: data.region,
      country: data.country,
      timezone: data.timezone,
    };
  }

  return {
    city: "unknown",
    region: "unknown",
    country: "unknown",
    timezone: "unknown",
  };
});

export const formatSessions = function (session) {
  return {
    id: session._id,
    sessionId: session.sessionId,
    device: `${session.deviceInfo.browser} on ${session.deviceInfo.os}`,
    deviceType: session.deviceInfo.device,
    location: `${session.location.city}, ${session.location.country}`,
    ipAddress: session.ipAddress,
    createdAt: session.createdAt,
    lastActive: session.lastActive,
    isActive: session.isActive,
  };
};
