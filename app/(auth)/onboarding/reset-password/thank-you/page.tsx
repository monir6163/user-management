"use client";
import { useSearchParams } from "next/navigation";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const email = decodeURIComponent(searchParams.get("email") || "");
  const formType = searchParams.get("formType");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Success!</h2>
        <p className="mb-6 text-gray-700">
          {formType === "register"
            ? "Otp has been verified successfully."
            : "Your password has been reset successfully."}
        </p>
        <p className="mb-6 text-gray-700">
          An email confirmation has been sent to <strong>{email}</strong>.
        </p>
        <a
          href="/login"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}
