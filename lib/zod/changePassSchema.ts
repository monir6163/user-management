import z from "zod";

const changePassSchema = z.object({
  oldPassword: z.string().min(6, "Old password must be at least 6 characters"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

type ChangePassSchema = z.infer<typeof changePassSchema>;

const changePassDefaultValues: ChangePassSchema = {
  oldPassword: "",
  newPassword: "",
};

export { changePassDefaultValues, changePassSchema, type ChangePassSchema };
