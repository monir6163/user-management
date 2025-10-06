/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { tokenTime } from "./constants/constant";

const BACKEND_URL = process.env.BACKEND_URL;

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const res = await fetch(`${BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();
          if (!res.ok) return null;
          return {
            ...data.data,
            email: credentials.email,
            user: data.data.user,
          };
        } catch (error: any) {
          throw new Error(error.message || "Failed to login");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },
    async jwt({ token, user }) {
      // Initial login
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = user.user;
        token.accessTokenExpires = tokenTime.accessTokenExpires;
      }

      // If token still valid, return it
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        console.log("token still valid");
        return token;
      }
      // Otherwise refresh it
      try {
        const res = await fetch(`${BACKEND_URL}/auth/refresh-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken: token.refreshToken }),
        });
        if (!res.ok) throw new Error("Failed to refresh");

        const data = await res.json();
        return {
          ...token,
          accessToken: data.data.accessToken,
          accessTokenExpires: tokenTime.accessTokenExpires,
        };
      } catch (err) {
        return { ...token, error: "RefreshTokenError" };
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user as any;
      session.error = token.error;
      return session;
    },
  },
} satisfies NextAuthConfig;
