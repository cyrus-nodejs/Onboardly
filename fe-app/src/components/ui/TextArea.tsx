"use client";
import * as React from "react";
import clsx from "clsx";
import { Text } from "./typography/Text";
export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
    isRequired?: boolean;
  };

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, isRequired, className, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        {label && (
          <label className="mb-1 font-medium text-sm text-gray-700">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={clsx(
            "border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        />
        {error && <Text color="error">{error}</Text>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
