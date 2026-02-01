import * as React from "react";
import { cn } from "@/lib/utils";

type StrongProps = React.HTMLAttributes<HTMLElement> & {
  variant?: "default" | "muted" | "danger";
};

export function Strong({
  children,
  className,
  variant = "default",
  ...props
}: StrongProps) {
  return (
    <strong
      className={cn(
        "font-semibold",
        {
          default: "text-gray-900",
          muted: "text-gray-600",
          danger: "text-red-600",
        }[variant],
        className,
      )}
      {...props}
    >
      {children}
    </strong>
  );
}
