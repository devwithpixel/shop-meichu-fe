"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { loginSchema } from "@/schema/auth";
import { login } from "@/lib/api/auth";
import { redirect } from "next/navigation";
import * as z from "zod";

export default function LoginForm(props: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    const result = await login(data.email, data.password);
    if (result.success) {
      redirect("/admin");
    }

    form.setError("email", {
      message: result.error,
    });
  }

  return (
    <Card {...props}>
      <CardHeader className="mb-3">
        <CardTitle className="text-center font-medium mb-1">
          Shop Meichu
        </CardTitle>
        <CardTitle className="text-3xl text-center font-medium">
          Sign-in
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-admin-login" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-admin-login-username">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    required={true}
                    id="form-admin-login-username"
                    aria-invalid={fieldState.invalid}
                    autoComplete="username"
                    className="border-white/20"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="relative">
                  <FieldLabel htmlFor="form-admin-login-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    required={true}
                    id="form-admin-login-password"
                    aria-invalid={fieldState.invalid}
                    className="border-white/20"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <Button
                    type="button"
                    variant="nobackground"
                    size="icon"
                    className="absolute top-full -translate-y-full right-0 size-9!"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeClosed /> : <Eye />}
                  </Button>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          type="submit"
          form="form-admin-login"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && <Spinner />}
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
