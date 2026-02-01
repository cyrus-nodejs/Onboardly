"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/form/FormField";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Form } from "@/components/form/Form";

import { api } from "@/lib/api";
import { handleError } from "@/lib/error";

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),

  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Invalid email")
    .required("Email is required"),
});

type FormData = yup.InferType<typeof schema>;

export type GenerateInviteResponse = {
  inviteLink: string;
};

export default function GenerateInviteForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data: FormData) => {
    try {
      await api<GenerateInviteResponse>("invites/send", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      toast.success("Invite sent success", {
        description: "Invite link sent to email.",
      });

      reset();
    } catch (err: unknown) {
      const errorMessage = handleError(err, "Failed to send invite");

      toast.error("Invite failed", {
        description: errorMessage,
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Heading level={4}>Generate Invite</Heading>

      <FormField
        label="Full Name"
        name="name"
        isRequired
        error={errors.name?.message}
        inputProps={{
          type: "text",
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

      <Button
        type="submit"
        isLoading={isSubmitting}
        disabled={!isValid || isSubmitting}
      >
        Send Invite
      </Button>

      <Text variant="small">An invite link will be sent to email.</Text>
    </Form>
  );
}
