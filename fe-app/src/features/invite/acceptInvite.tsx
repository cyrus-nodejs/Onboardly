"use client";

import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/form/FormField";
import { Heading } from "@/components/ui/typography/Heading";
import { Form } from "@/components/form/Form";
import { Text } from "@/components/ui/typography/Text";

import { api } from "@/lib/api";
import { handleError } from "@/lib/error";
import { getPasswordStrength } from "@/lib/helpers";

type AcceptInviteFormProps = {
  inviteId: string;
  prefill: { name: string; email: string };
};

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),

  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

type FormData = yup.InferType<typeof schema>;

export function AcceptInviteForm({ inviteId, prefill }: AcceptInviteFormProps) {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: prefill.name,
      email: prefill.email,
      password: "",
    },
  });

  const password = useWatch({ control, name: "password" }) || "";
  const strengthScore = getPasswordStrength(password);

  const strengthColors = [
    "bg-gray-300",
    "bg-red-500",
    "bg-yellow-400",
    "bg-blue-500",
    "bg-green-500",
  ];

  const strengthLabels = [
    "Very Weak",
    "Weak",
    "Medium",
    "Strong",
    "Very Strong",
  ];

  const onSubmit = async (data: FormData) => {
    try {
      await api(`invites/${inviteId}/accept`, {
        method: "POST",
        body: {
          ...data,
          email: data.email.trim().toLowerCase(),
        },
      });

      toast.success("Account created", {
        description: "Your employee account has been successfully activated.",
      });

      setSuccess(true);
      reset();

      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (err: unknown) {
      const errorMessage = handleError(err, "Failed to create new employee");
      toast.error("Invitation failed", {
        description: errorMessage,
      });
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <Heading level={4}>Account Activated!</Heading>
        <Text as="paragraph" color="secondary">
          Your account has been created successfully. Redirecting to login...
        </Text>
        <Button onClick={() => router.push("/login")} className="mt-4">
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} variant="auth">
      <Heading level={4}>Accept Job Invite</Heading>

      <FormField
        label="Full Name"
        name="name"
        isRequired
        error={errors.name?.message}
        inputProps={{
          type: "text",
          autoFocus: true,
          disabled: true,
          ...register("name"),
        }}
      />

      <FormField
        label="Email"
        name="email"
        isRequired
        error={errors.email?.message}
        inputProps={{
          type: "email",
          disabled: true,
          ...register("email"),
        }}
      />

      <div className="mb-4">
        <FormField
          label="Password"
          name="password"
          isRequired
          error={errors.password?.message}
          inputProps={{
            type: "password",
            autoComplete: "new-password",
            ...register("password"),
          }}
        />

        {password && (
          <>
            <div className="h-2 w-full mt-1 rounded bg-gray-300">
              <div
                className={`h-2 rounded ${strengthColors[strengthScore]}`}
                style={{
                  width: `${(strengthScore / 4) * 100}%`,
                }}
              />
            </div>

            <Text variant="small" color="secondary">
              Strength: {strengthLabels[strengthScore]}
            </Text>
          </>
        )}
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={!isValid || isSubmitting}
          size="full"
        >
          Accept Invite
        </Button>
      </div>
    </Form>
  );
}
