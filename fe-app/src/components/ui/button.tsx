"use client";
import { Link } from "./Link";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        dark: "bg-black text-white hover:bg-gray-800",
        outline: "border border-gray-300 hover:bg-gray-100",
        ghost: "hover:bg-gray-100",
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-600 text-white hover:bg-gray-700",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        default: "",
      },
      size: {
        sm: "h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm",
        md: "h-9 px-4 text-sm sm:h-10 sm:px-5 sm:text-base",
        lg: "h-10 px-5 text-sm sm:h-12 sm:px-6 sm:text-base",
        full: "w-full h-10 px-4 text-sm sm:h-12 sm:px-6 sm:text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = VariantProps<typeof buttonStyles> & {
  href?: string;
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({
  className,
  variant,
  size,
  isLoading,
  children,
  disabled,
  href,
  type = "submit",
  ...props
}: ButtonProps) {
  const classes = cn(buttonStyles({ variant, size }), className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-disabled={disabled || isLoading}
      >
        {isLoading ? "Loading..." : children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
