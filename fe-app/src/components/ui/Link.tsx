import clsx from "clsx";
import NextLink from "next/link";
import React from "react";
type LinkProps = {
  href: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Link({
  href,
  external,
  children,
  className,
  ...props
}: LinkProps) {
  const baseClass =
    "flex lg:flex-row flex-col items-center justify-center lg:justify-start gap-1 lg:gap-3 px-4 py-2 min-w-[80px] lg:min-w-0 rounded-lg text-xs lg:text-sm transition whitespace-nowrap";

  if (external || href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(baseClass, className)}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={clsx(baseClass, className)} {...props}>
      {children}
    </NextLink>
  );
}
