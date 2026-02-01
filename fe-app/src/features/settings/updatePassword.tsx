"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/form/FormField";
import { Form } from "@/components/form/Form";
import { FormMessage } from "@/components/form/FormMessage";
import { Modal } from "@/components/ui/Modal";
import { Text } from "@/components/ui/typography/Text";

import { api } from "@/lib/api";
import { handleError } from "@/lib/error";
import { getPasswordStrength } from "@/lib/helpers";

const schema = yup.object({
  currentPassword: yup.string().required("Current password is required"),

  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords do not match")
    .required("Please confirm your new password"),
});

type FormData = yup.InferType<typeof schema>;

export function ChangePasswordForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const newPassword = watch("newPassword", "");
  const strengthScore = useMemo(
    () => getPasswordStrength(newPassword),
    [newPassword],
  );

  const strengthColor = [
    "bg-gray-300",
    "bg-red-500",
    "bg-yellow-400",
    "bg-blue-500",
    "bg-green-500",
  ][strengthScore];

  const submitChangePassword = async (data: FormData) => {
    setModalOpen(false);
    setMessage(null);

    try {
      await api("auth/password/change", {
        method: "POST",
        credentials: "include",
        body: {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
      });

      await navigator.clipboard.writeText(data.newPassword);

      setMessage("Password updated successfully (copied to clipboard)");

      reset();

      await api("auth/logout", {
        method: "POST",
        credentials: "include",
      });

      router.push("/login");
    } catch (err: unknown) {
      const errorMsg = handleError(err, "Failed to update password");

      setMessage(errorMsg);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(() => setModalOpen(true))} variant="default">
        <FormField
          label="Current Password"
          name="currentPassword"
          isRequired
          error={errors.currentPassword?.message}
          inputProps={{
            type: "password",
            autoComplete: "current-password",
            ...register("currentPassword"),
          }}
        />

        <div className="mb-4">
          <FormField
            label="New Password"
            name="newPassword"
            isRequired
            error={errors.newPassword?.message}
            inputProps={{
              type: "password",
              autoComplete: "new-password",
              ...register("newPassword"),
            }}
          />

          <div className="h-2 w-full mt-1 rounded bg-gray-300">
            <div
              className={`h-2 rounded ${strengthColor}`}
              style={{ width: `${(strengthScore / 4) * 100}%` }}
            />
          </div>

          <Text color="secondary">
            Strength:{" "}
            {
              ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"][
                strengthScore
              ]
            }
          </Text>
        </div>

        <FormField
          label="Confirm New Password"
          name="confirmPassword"
          isRequired
          error={errors.confirmPassword?.message}
          inputProps={{
            type: "password",
            autoComplete: "new-password",
            ...register("confirmPassword"),
          }}
        />

        <Button type="submit" isLoading={isSubmitting} variant="destructive">
          Change Password
        </Button>

        {message && (
          <FormMessage
            variant={message.includes("Failed") ? "error" : "success"}
          >
            {message}
          </FormMessage>
        )}
      </Form>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Password Change"
        onConfirm={handleSubmit(submitChangePassword)}
        confirmText="Change Password"
        cancelText="Cancel"
      >
        <Text as="paragraph">
          Are you sure you want to change your password?
        </Text>
      </Modal>
    </>
  );
}
