import React from "react";

type TextVariant =
  | "body"
  | "muted"
  | "small"
  | "statsValue"
  | "error"
  | "navItem"
  | "strong";

type TextAs = "paragraph" | "span";

type TextColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "white";

type TextProps = {
  variant?: TextVariant;
  as?: TextAs;
  color?: TextColor;
  className?: string;
  children: React.ReactNode;
};

const styles: Record<TextVariant, string> = {
  body: "text-base text-gray-800",
  muted: "text-sm text-gray-500",
  small: "text-xs text-gray-400",
  statsValue: "text-3xl font-bold mt-2 text-gray-900",
  navItem: "text-base text-gray-300",
  error: "text-sm text-red-600",
  strong: "font-semibold text-base text-gray-800",
};

const colors: Record<TextColor, string> = {
  default: "",
  primary: "text-blue-600",
  secondary: "text-gray-600",
  success: "text-green-600",
  warning: "text-yellow-600",
  error: "text-red-600",
  white: "text-white",
};

export function Text({
  variant = "body",
  as,
  color = "default",
  className,
  children,
}: TextProps) {

  const TagMap: Record<TextAs, keyof JSX.IntrinsicElements> = {
    paragraph: "p",
    span: "span",
  };

  const defaultAs: Record<TextVariant, TextAs> = {
    body: "paragraph",
    muted: "paragraph",
    small: "span",
    statsValue: "span",
    navItem: "span",
    error: "paragraph",
    strong: "span",
  };

  const Component = TagMap[as || defaultAs[variant]];

  return (
    <Component
      className={[styles[variant], colors[color], className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Component>
  );
}
