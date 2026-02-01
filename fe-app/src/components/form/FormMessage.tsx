import clsx from "clsx";
import React from "react";

type FormMessageProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "error" | "success" | "info";
};

export function FormMessage({
  className,
  variant = "error",
  children,
  ...props
}: FormMessageProps) {
  const variantClasses = {
    error: "text-red-600",
    success: "text-green-600",
    info: "text-gray-500",
  };

  return (
    <div
      className={clsx(" mt-1", variantClasses[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}
