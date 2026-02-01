"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/form/Form";
import { FormField } from "@/components/form/FormField";
import { Modal } from "@/components/ui/Modal";
import { Text } from "@/components/ui/typography/Text";
import { User } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { handleError } from "@/lib/error";
import { getPasswordStrength, capitalizeEachWord } from "@/lib/helpers";

const schema = yup.object({
  name: yup.string().trim().min(2).required(),
  email: yup.string().trim().email().required(),
  password: yup.string().min(8).required(),
  organisationName: yup.string().trim().min(2).required(),
  organisationEmail: yup.string().trim().email().required(),
});

type FormData = yup.InferType<typeof schema>;

export function CreateAccountForm() {
  const [showModal, setShowModal] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);
  const { setUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onTouched",
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

  const handleCopyPassword = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setPasswordCopied(true);
    setTimeout(() => setPasswordCopied(false), 2000);
  };

  const onSubmit = async (data: FormData) => {
    setShowModal(false);

    try {
      const authUser = await api<{ user: User }>("auth/account/create", {
        method: "POST",
        credentials: "include",
        body: {
          ...data,
          name: capitalizeEachWord(data.name),
          organisationName: capitalizeEachWord(data.organisationName),
          email: data.email.trim().toLowerCase(),
          organisationEmail: data.organisationEmail.trim().toLowerCase(),
        },
      });

      if (authUser) {
        setUser(authUser.user);
      }
      toast.success("Account Created", {
        description: "The organisation and administrator account were created.",
      });

      reset();
      router.push("/dashboard");
    } catch (err) {
      toast.error("Creation failed", {
        description: handleError(err, "Failed to create account"),
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(() => setShowModal(true))}>
        <FormField
          label="Full Name"
          name="name"
          isRequired
          error={errors.name?.message}
          inputProps={{
            autoFocus: true,
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
            autoComplete: "email",
            ...register("email"),
          }}
        />

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
          rightSlot={
            <Button
              type="button"
              size="sm"
              variant="ghost"
              disabled={!password}
              onClick={handleCopyPassword}
            >
              {passwordCopied ? "Copied!" : "Copy"}
            </Button>
          }
        />

        {password && (
          <>
            <div className="h-2 w-full mt-2 rounded bg-gray-300">
              <div
                className={`h-2 rounded ${strengthColors[strengthScore]}`}
                style={{ width: `${(strengthScore / 4) * 100}%` }}
              />
            </div>

            <Text color="secondary">
              Strength: {strengthLabels[strengthScore]}
            </Text>
          </>
        )}

        <FormField
          label="Organisation Name"
          name="organisationName"
          isRequired
          error={errors.organisationName?.message}
          inputProps={{
            disabled: isSubmitting,
            ...register("organisationName"),
          }}
        />

        <FormField
          label="Organisation Email"
          name="organisationEmail"
          isRequired
          error={errors.organisationEmail?.message}
          inputProps={{
            type: "email",
            disabled: isSubmitting,
            ...register("organisationEmail"),
          }}
        />

        <Button
          type="submit"
          variant="destructive"
          isLoading={isSubmitting}
          disabled={!isValid || isSubmitting}
        >
          Create Account
        </Button>
      </Form>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Confirm Account Creation"
      >
        <Text>
          Are you sure you want to create this superuser and organisation? This
          action cannot be undone.
        </Text>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" onClick={() => setShowModal(false)}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
}
