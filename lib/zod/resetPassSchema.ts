import z from "zod";

const resetPassSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
});

type ResetPassSchema = z.infer<typeof resetPassSchema>;

const resetPassDefaultValues: ResetPassSchema = {
  email: "",
};

export { resetPassDefaultValues, resetPassSchema, type ResetPassSchema };
