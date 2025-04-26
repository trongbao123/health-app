const isServer = typeof window === "undefined";
const isDev = process.env.NODE_ENV === "development";

function getOrigin() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  } else {
    return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  }
}

export const AppConfig = {
  env: process.env.NODE_ENV,
  isDev,
  isProd: !isDev,
  isServer,
  isClient: !isServer,

  apiBaseUrl: `${getOrigin()}/api/v1`,

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
