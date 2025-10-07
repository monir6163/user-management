"use client";
import { ArrowRight, Mail, Smartphone } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

export default function ResetPasswordMethod() {
  const [selected, setSelected] = useState("");

  const handleSelected = (value: string) => {
    setSelected(value);
  };

  const handleContinue = () => {
    if (selected) {
      if (selected === "otp") {
        redirect("/onboarding/reset-password/form?method=otp");
      } else if (selected === "email") {
        redirect("/onboarding/reset-password/form?method=email");
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* OTP Option */}
        <div
          className={`cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center gap-5 border-2 transition hover:shadow-lg hover:border-blue-500
            ${
              selected === "otp"
                ? "bg-blue-500/20 border-blue-500 shadow-md"
                : "bg-gray-100 border-transparent"
            }`}
          onClick={() => handleSelected("otp")}
        >
          <Smartphone className="w-20 h-20" />
          <p className="text-center text-sm lg:text-base font-medium text-text-1">
            RESET VIA OTP
          </p>
        </div>

        {/* Email Option */}
        <div
          className={` rounded-lg p-4 flex flex-col items-center justify-center gap-5 border-2 transition hover:shadow-lg hover:border-blue-500 disabled:opacity-50 cursor-not-allowed
            ${
              selected === "email"
                ? "bg-blue-500/20 border-blue-500 shadow-md"
                : "bg-gray-100 border-transparent"
            }`}
          // onClick={() => handleSelected("email")}
        >
          <Mail className="w-20 h-20" />
          <p className="text-center text-sm lg:text-base font-medium text-text-1">
            RESET VIA EMAIL
          </p>
        </div>
      </div>

      <Button
        onClick={handleContinue}
        className={`w-full cursor-pointer mx-auto mt-4 bg-primary text-white hover:bg-primary/90 transition 
          ${selected ? "" : "opacity-50 cursor-not-allowed"}`}
        disabled={!selected}
      >
        Continue <ArrowRight />
      </Button>
    </div>
  );
}
