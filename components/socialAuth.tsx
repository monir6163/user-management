"use client";
import { DEFAULT_SIGN_IN_REDIRECT } from "@/lib/routes";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";

export default function SocialAuth() {
  const handleClick = async (provider: "google") => {
    await signIn(provider, { callbackUrl: DEFAULT_SIGN_IN_REDIRECT });
  };
  return (
    <Button
      variant="outline"
      className="w-full inline-flex items-center cursor-pointer"
      onClick={() => handleClick("google")}
    >
      <FcGoogle />
      Login with Google
    </Button>
  );
}
