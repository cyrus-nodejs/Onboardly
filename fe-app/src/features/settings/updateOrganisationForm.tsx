"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/form/FormField";
import { Form } from "@/components/form/Form";
import { handleError } from "@/lib/error";
import { api } from "@/lib/api";
import { useOrganisation } from "@/hooks/useOrganisation";

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Organisation name is required"),

  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Organisation email is required"),
});

type FormData = yup.InferType<typeof schema>;

export function UpdateOrganisationForm() {
  const { currentOrganisation } = useOrganisation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (currentOrganisation) {
      reset({
        name: currentOrganisation.name,
        email: currentOrganisation.email,
      });
    }
  }, [currentOrganisation, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await api("organisations/update", {
        method: "PATCH",
        credentials: "include",
        body: {
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
        },
      });

      toast.success("Organisation updated successfully");
    } catch (err: unknown) {
      const message = handleError(err, "Failed to update organisation");
      toast.error("Update failed", { description: message });
    }
  };

  const handleCopyInfo = () => {
    if (!currentOrganisation) return;

    navigator.clipboard.writeText(
      `Organisation: ${currentOrganisation.name}\nEmail: ${currentOrganisation.email}`,
    );

    toast.success("Organisation info copied to clipboard");
  };

  if (!currentOrganisation) {
    return <Text as='paragraph'>Loading organisation data...</Text>;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} variant="default">
      <FormField
        label="Organisation Name"
        name="name"
        isRequired
        error={errors.name?.message}
        inputProps={{
          type: "text",
          disabled: isSubmitting,
          ...register("name"),
        }}
      />

      <FormField
        label="Organisation Email"
        name="email"
        isRequired
        error={errors.email?.message}
        inputProps={{
          type: "email",
          disabled: isSubmitting,
          ...register("email"),
        }}
      />

      <div className="flex gap-3 mt-4">
        <Button type="submit" isLoading={isSubmitting}>
          Update Organisation
        </Button>

        <Button type="button" variant="secondary" onClick={handleCopyInfo}>
          Copy Organisation Info
        </Button>
      </div>
    </Form>
  );
}
