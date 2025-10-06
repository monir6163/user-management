/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { verifyEmailAction } from "@/lib/actions/authActions";
import { redirect, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const VerifyEmailCard = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const onSubmit = useCallback(() => {
    if (success || error) {
      return;
    }
    if (!token || !email) {
      setError("No token or email provided");
      redirect("/login");
    }
    verifyEmailAction(token!, email!).then((res) => {
      if (res.success) {
        setSuccess(res.message);
        setTimeout(() => {
          redirect("/login");
        }, 3000);
      } else {
        setError(res.error);
        setTimeout(() => {
          redirect("/login");
        }, 3000);
      }
    });
  }, [token, email, success, error]);
  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 rounded-2xl">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify Email</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4 text-center">{success}</p>
        )}
        {!error && !success && <p className="mb-4 text-center">Verifying...</p>}
      </div>
    </div>
  );
};

export default VerifyEmailCard;
