"use server";
import { signIn } from "@/auth";
import axios, { AxiosError } from "axios";
import { AuthError } from "next-auth";
import * as z from "zod";
import { loginSchema } from "../zod/loginSchema";
import { registerSchema } from "../zod/registerSchema";
// using next-auth for authentication
export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const validedFields = loginSchema.safeParse(values);

  if (!validedFields.success) {
    return { success: false, error: "Invalid Fields!" };
  }

  const { email, password } = validedFields.data;

  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      return { success: false, error: "Invalid email or password!" };
    }

    return { success: true, message: "Logged in!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            error: "Invalid credentials!",
          };
        case "CallbackRouteError":
          return {
            success: false,
            error: "Invalid credentials!",
          };
        default:
          return { success: false, error: "Unexpected authentication error." };
      }
    }

    return { success: false, error: "Something went wrong. Try again later." };
  }
};

// backend action for registering a user
export const registerAction = async (
  values: z.infer<typeof registerSchema>
) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid input fields!" };
  }

  try {
    const res = await axios.post(
      `${process.env.BACKEND_URL}/auth/register`,
      validatedFields.data
    );
    if (res.status === 200) {
      return {
        success: true,
        message:
          "Registered successfully! Please check your email for verification.",
      };
    }
    return {
      success: false,
      error: "Registration failed. Please try again.",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const backendMsg = error.response?.data?.message;
      if (backendMsg) {
        return {
          success: false,
          error: backendMsg,
        };
      }
      return {
        success: false,
        error: error.message || "Network error. Please try again.",
      };
    }
    return { success: false, error: "Something went wrong. Try again later." };
  }
};

// email verification action for verifying user's email backend
export const verifyEmailAction = async (token: string, email: string) => {
  if (!token || !email) {
    return { success: false, error: "No token or email provided" };
  }

  try {
    const res = await axios.get(
      `${process.env.BACKEND_URL}/auth/verify-email?token=${token}&email=${email}`
    );
    if (res.status === 200) {
      return { success: true, message: "Email verified successfully!" };
    }
    return { success: false, error: "Email verification failed." };
  } catch (error) {
    if (error instanceof AxiosError) {
      const backendMsg = error.response?.data?.message;
      if (backendMsg) {
        return { success: false, error: backendMsg };
      }
      return {
        success: false,
        error: error.message || "Network error. Please try again.",
      };
    }
    return { success: false, error: "Something went wrong. Try again later." };
  }
};

// forgot password action
