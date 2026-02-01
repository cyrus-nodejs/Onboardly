import clsx from "clsx";
import React from "react";

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  variant?: "default" | "auth" | "compact";
};

const variants = {
  gray: "max-w-md bg-gray-50 p-6 shadow",
  auth: "max-w-sm bg-white p-8 shadow-lg",
  compact: "max-w-md p-4",
  default: "",
};

export function Form({
  className,
  variant = "default",
  children,
  ...props
}: FormProps) {
  return (
    <form
      {...props}
      noValidate
      className={clsx("space-y-4 rounded-md", variants[variant], className)}
    >
      {children}
    </form>
  );
}
