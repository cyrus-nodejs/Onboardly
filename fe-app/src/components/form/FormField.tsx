import React from "react";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { Text } from "../ui/typography/Text";

type FormFieldProps = {
  label: string;
  name: string;
  isRequired?: boolean;
  error?: string;
  inputProps?: React.ComponentProps<typeof Input>;
  rightSlot?: React.ReactNode;
};

export function FormField({
  label,
  name,
  isRequired,
  error,
  inputProps,
  rightSlot,
}: FormFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-medium mb-1">
        {label} {isRequired && <Text color="error">*</Text>}
      </label>

      <div className="relative">
        <Input
          id={name}
          aria-invalid={!!error}
          {...inputProps}
          className={cn(
            error && "border-red-500",
            rightSlot && "pr-14",
            inputProps?.className
          )}
        />

        {rightSlot && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {rightSlot}
          </div>
        )}
      </div>

      {error && <Text color="error">{error}</Text>}
    </div>
  );
}
