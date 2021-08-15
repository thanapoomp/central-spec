export const APP_INFO = {
  name: "Central Spec",
  version: "0.0.1",
  since: "2021",
  description: "Kunlanis",
  contactUrl: "http://www.kunlanis.com",
};

export const VERSION_CHECKER = {
  ENABLE_VERSION_CHECKER: false,
  CHECKVERSION_EVERY_MINUTE: 10,
  VERSIONCHECK_URL:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "https://api.thanapoom.cc/api/ClientVersion/GetLastClientVersion" //dev
      : "https://api.thanapoom.cc/api/ClientVersion/GetLastClientVersion", // Production
};

//update token in 10 - 30 minutes (random to avoid multipages call api in the same time )
export const RENEW_TOKEN_MS = {
  min: 600000,
  max: 1800000,
};

export const API_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api" //dev
    : "http://localhost:5000/api"; // Production

export const ROLES = {
  user: "User",
  Manager: "Manager",
  admin: "Admin",
  developer: "Developer",
};
