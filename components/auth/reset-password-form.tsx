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
import { resetPasswordAction } from "@/lib/actions/authActions";
import {
  resetPassDefaultValues,
  resetPassSchema,
  ResetPassSchema,
} from "@/lib/zod/resetPassSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ButtonLoader from "../button-loader";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
export default function ResetPasswordForm() {
  const { push } = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<ResetPassSchema>({
    mode: "all",
    resolver: zodResolver(resetPassSchema),
    defaultValues: resetPassDefaultValues,
  });
  const isSubmitting = form.formState.isSubmitting;
  const onSubmit: SubmitHandler<ResetPassSchema> = async (values) => {
    setError("");
    setSuccess("");
    const result = await resetPasswordAction(values.email);
    if (result.success) {
      setSuccess(result.message || "OTP sent to your email.");
      setTimeout(() => {
        push(
          `/onboarding/reset-password/verify?email=${encodeURIComponent(
            values.email
          )}`
        );
      }, 2000);
    } else {
      setError(result.error || "Something went wrong. Try again later.");
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
                  placeholder="Enter your email address"
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
          {isSubmitting ? <ButtonLoader /> : "Send OTP"}
        </Button>
      </form>
    </Form>
  );
}
