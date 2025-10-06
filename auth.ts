/* eslint-disable @typescript-eslint/no-explicit-any */
import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { tokenTime } from "./constants/constant";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
  },
  events: {
    async linkAccount({ user }: any) {
      console.log("Account linked for user:", user);
    },
  },
  // 3 minutes
  session: { strategy: "jwt", maxAge: tokenTime.sessionMaxAge },
  jwt: { maxAge: tokenTime.jwtMaxAge },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: tokenTime.sessionMaxAge,
      },
    },
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
