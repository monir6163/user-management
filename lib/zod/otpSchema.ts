import z from "zod";

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, {
      message: "Your one-time password must be 6 digits.",
    })
    .max(6, {
      message: "Your one-time password must be 6 digits.",
    }),
});

type OtpSchema = z.infer<typeof otpSchema>;

const otpDefaultValues: OtpSchema = {
  otp: "",
};

export { otpDefaultValues, otpSchema, type OtpSchema };
