import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    user?: User;
    error?: string;
  }

  interface User extends DefaultUser {
    accessToken: string;
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      emailVerifiedAt: string;
      status: string;
      image?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    refreshTokenExpires?: number;
    error?: string;
  }
}
