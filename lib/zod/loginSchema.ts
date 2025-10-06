import z from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(5, "Password must be at least 5 characters"),
});

type LoginSchema = z.infer<typeof loginSchema>;

const loginDefaultValues: LoginSchema = {
  email: "",
  password: "",
};

export { loginDefaultValues, loginSchema, type LoginSchema };
