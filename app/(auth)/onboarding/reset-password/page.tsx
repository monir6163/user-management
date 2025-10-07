import ResetPasswordMethod from "@/components/auth/reset-password-method";
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
              Back to Login
            </Link>
            <h2 className="lg:text-3xl font-semibold">
              Need to Reset Your Password?
            </h2>
            <p className="text-sm lg:text-base text-text-2 mt-2">
              How do you want to reset your password? Choose the method that
              works best for you.
            </p>
            <ResetPasswordMethod />
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
