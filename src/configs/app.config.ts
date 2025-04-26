const isServer = typeof window === "undefined";
const isDev = process.env.NODE_ENV === "development";

export const AppConfig = {
  env: process.env.NODE_ENV,
  isDev,
  isProd: !isDev,
  isServer,
  isClient: !isServer,

  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/v1",

  featureFlags: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
    enableDebugTools: isDev,
  },

  app: {
    name: "HealthApp",
    version: "1.0.0",
  },

  token: {
    name: "health-app-token",
  },
};
