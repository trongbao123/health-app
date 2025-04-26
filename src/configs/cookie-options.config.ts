type CookieOptions = {
  httpOnly: boolean;
  path: string;
  maxAge: number;
  sameSite: "lax" | "strict" | "none";
  secure?: boolean;
};

export const sessionCookieOptions: CookieOptions = {
  httpOnly: true,
  path: "/",
  maxAge: 60 * 60 * 24 * 3,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
};
