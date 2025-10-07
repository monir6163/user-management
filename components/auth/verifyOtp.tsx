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
import { verifyOtpAction } from "@/lib/actions/authActions";
import { otpDefaultValues, otpSchema, OtpSchema } from "@/lib/zod/otpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ButtonLoader from "../button-loader";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

export default function VerifyOtp() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const formType = searchParams.get("from");
  const { push } = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<OtpSchema>({
    mode: "all",
    resolver: zodResolver(otpSchema),
    defaultValues: otpDefaultValues,
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<OtpSchema> = async (values) => {
    setError("");
    setSuccess("");

    const result = await verifyOtpAction(
      values.otp,
      email || "",
      formType || ""
    );
    if (result.success) {
      setSuccess(result.message || "OTP verified successfully.");
      setTimeout(() => {
        if (formType === "register") {
          push(
            `/onboarding/reset-password/thank-you?email=${encodeURIComponent(
              email || ""
            )}&formType=register`
          );
        } else {
          push(
            `/onboarding/reset-password/change?email=${encodeURIComponent(
              email || ""
            )}&otp=${values.otp}`
          );
        }
      }, 2000);
    } else {
      setError(result.error || "Something went wrong. Try again later.");
    }
  };

  return (
    <>
      <div className="mb-6">
        <p className="mt-2 text-sm text-text-2 lg:text-base">
          An email with a one-time password <strong>(OTP)</strong> has been sent
          to<strong> {decodeURIComponent(email || "")} </strong>. Please enter
          the 6-digit code below to confirm your email address.
        </p>
        <p className="mt-4 text-sm text-text-2 lg:text-base">
          If you don’t see the OTP within a few minutes, check your spam or junk
          folder.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <div className="w-full mx-auto flex justify-center">
                    <InputOTP
                      maxLength={6}
                      {...field}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
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
            {isSubmitting ? <ButtonLoader /> : "Verify OTP"}
          </Button>
        </form>
      </Form>
    </>
  );
}
