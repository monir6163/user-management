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
import { changePassAction } from "@/lib/actions/authActions";
import {
  changePassDefaultValues,
  changePassSchema,
  ChangePassSchema,
} from "@/lib/zod/changePassSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ButtonLoader from "../button-loader";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { PasswordInput } from "../password-input";

export default function ChangePassForm() {
  const searchParams = useSearchParams();
  const email = decodeURIComponent(searchParams.get("email") || "");
  const otp = searchParams.get("otp");
  const { push } = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<ChangePassSchema>({
    mode: "all",
    resolver: zodResolver(changePassSchema),
    defaultValues: changePassDefaultValues,
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<ChangePassSchema> = async (values) => {
    setError("");
    setSuccess("");

    const result = await changePassAction(
      values.oldPassword,
      values.newPassword,
      email || "",
      otp || ""
    );
    if (result.success) {
      setSuccess(result.message || "OTP verified successfully.");
      setTimeout(() => {
        push(
          `/onboarding/reset-password/thank-you?email=${encodeURIComponent(
            email || ""
          )}`
        );
      }, 2000);
    } else {
      setError(result.error || "Something went wrong. Try again later.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your old password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your new password"
                  {...field}
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
          {isSubmitting ? <ButtonLoader /> : "Change Password"}
        </Button>
      </form>
    </Form>
  );
}
