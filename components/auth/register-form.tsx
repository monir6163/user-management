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
import { registerAction } from "@/lib/actions/authActions";
import {
  registerDefaultValues,
  registerSchema,
  RegisterSchema,
} from "@/lib/zod/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ButtonLoader from "../button-loader";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { PasswordInput } from "../password-input";

export default function RegisterForm() {
  // const { push } = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<RegisterSchema>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });
  const isSubmitting = form.formState.isSubmitting;
  const onSubmit: SubmitHandler<RegisterSchema> = async (values) => {
    setError("");
    setSuccess("");
    const res = await registerAction(values);
    if (!res.success) {
      setError(res.error);
      return;
    } else {
      setSuccess(res.message);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
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
              <FormLabel>Password</FormLabel>
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
          {isSubmitting ? <ButtonLoader /> : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
