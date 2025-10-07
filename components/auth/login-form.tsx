"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/lib/actions/authActions";
import {
  loginDefaultValues,
  LoginSchema,
  loginSchema,
} from "@/lib/zod/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ButtonLoader from "../button-loader";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { PasswordInput } from "../password-input";

export default function LoginForm() {
  const { push } = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const form = useForm<LoginSchema>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });
  const isSubmitting = form.formState.isSubmitting;
  const onSubmit: SubmitHandler<LoginSchema> = async (values) => {
    setError("");
    setSuccess("");
    const result = await loginAction(values);
    if (result.success) {
      setSuccess(result.message || "Logged in successfully!");
      push(callbackUrl);
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
                <Link
                  href="/onboarding/reset-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <PasswordInput
                  placeholder="*******"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          disabled={isSubmitting}
          className="w-full inline-flex items-center cursor-pointer"
          type="submit"
          variant="default"
        >
          {isSubmitting ? <ButtonLoader /> : "Login"}
        </Button>
      </form>
    </Form>
  );
}
