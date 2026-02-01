import React from "react";

type HeadingColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "muted";

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: HeadingColor;
  className?: string;
  children: React.ReactNode;
};

export function Heading({
  level = 1,
  color = "default",
  className,
  children,
}: HeadingProps) {
  const Tag = `h${level}` as React.ElementType;

  const sizeStyles = {
    1: "text-3xl font-bold",
    2: "text-2xl font-semibold",
    3: "text-xl font-semibold",
    4: "text-lg font-medium",
    5: "text-base font-medium",
    6: "text-sm font-medium",
  };

  const colorStyles: Record<HeadingColor, string> = {
    default: "text-foreground",
    primary: "text-primary",
    secondary: "text-secondary",
    success: "text-green-600",
    warning: "text-yellow-600",
    error: "text-red-600",
    muted: "text-muted-foreground",
  };

  return (
    <Tag
      className={`${sizeStyles[level]} ${colorStyles[color]} ${
        className || ""
      }`}
    >
      {children}
    </Tag>
  );
}
