import VerifyOtp from "@/components/auth/verifyOtp";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <main className="flex flex-col justify-between gap-5 md:gap-6 lg:gap-7 min-h-screen bg-bg-1">
      <header className="flex justify-center py-4 lg:py-7 relative">
        <h1 className="text-xl font-semibold">User Mangement System</h1>
      </header>
      <div className="w-[90%] max-w-[968px] mx-auto">
        <div className="sm:border sm:border-border-1 w-full max-w-[550px] lg:px-8 rounded-[20px] mx-auto sm:bg-white">
          <div className="sm:px-8 sm:py-8 py-12">
            <Link
              href="/login"
              className="text-sm text-text-1 mb-4 flex gap-3 items-center"
            >
              <div className="flex justify-center items-center border border-border-1 rounded-full w-7 h-7">
                <ChevronLeft className="h-4 w-4" />
              </div>
              Back to Register
            </Link>
            <h2 className="lg:text-3xl font-semibold">Check your email</h2>

            <div className="md:mt-5">
              <VerifyOtp />
            </div>
          </div>
        </div>
      </div>
      <footer className="flex justify-center py-4 lg:py-7 relative">
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} User Management System. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}
