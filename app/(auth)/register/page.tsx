import RegisterForm from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
export default function page() {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col justify-center min-h-screen px-4">
      <Card>
        <CardHeader>
          <div className="flex justify-center gap-5 items-center">
            <Link
              href="/"
              className="cursor-pointer animate-pulse duration-1000 hover:bg-amber-500 hover:bg-opacity-10 p-1 rounded-full"
            >
              <ArrowLeft size={28} />
            </Link>
            <CardTitle className="text-center">Sign In</CardTitle>
          </div>

          <CardDescription className="text-center">
            Enter your details below to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="text-center flex flex-col gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-amber-500 hover:underline underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full inline-flex items-center cursor-pointer"
          >
            <FcGoogle />
            Register with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
