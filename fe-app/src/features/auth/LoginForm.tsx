"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/form/Form";
import { FormField } from "@/components/form/FormField";
import { useAuth } from "@/hooks/useAuth";
import { handleError } from "@/lib/error";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";

const schema = yup.object({
  email: yup.string().trim().email().required(),
  password: yup.string().min(8).required(),
});

type LoginFormData = yup.InferType<typeof schema>;

export default function LoginForm() {
  const { login, user, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email.trim().toLowerCase(), data.password);
      toast.success("Welcome back!");
      reset();
    } catch (err) {
      toast.error("Login failed", {
        description: handleError(err, "Invalid email or password"),
      });
    }
  };

  if (loading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size={40} />
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} variant="auth">
      <FormField
        label="Email"
        name="email"
        isRequired
        error={errors.email?.message}
        inputProps={{
          type: "email",
          autoComplete: "email",
          autoFocus: true,
          ...register("email"),
        }}
      />

      <FormField
        label="Password"
        name="password"
        isRequired
        error={errors.password?.message}
        inputProps={{
          type: showPassword ? "text" : "password",
          autoComplete: "current-password",
          ...register("password"),
        }}
        rightSlot={
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setShowPassword((p) => !p)}
          >
            {showPassword ? "Hide" : "Show"}
          </Button>
        }
      />

      <Button
        type="submit"
        isLoading={isSubmitting}
        disabled={!isValid || isSubmitting}
      >
        Sign in
      </Button>
    </Form>
  );
}
