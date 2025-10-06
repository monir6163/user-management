import z from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(5, "Password must be at least 5 characters"),
});

type RegisterSchema = z.infer<typeof registerSchema>;

const registerDefaultValues: RegisterSchema = {
  name: "",
  email: "",
  password: "",
};

export { registerDefaultValues, registerSchema, type RegisterSchema };
