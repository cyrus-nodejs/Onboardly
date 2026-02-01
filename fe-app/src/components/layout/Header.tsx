"use client";

import { Heading } from "@/components/ui/typography/Heading";
import { APP_NAME } from "@/lib/constant";
import { Link } from "@/components/ui/Link";
import { Button } from "@/components/ui/Button";
export function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white border-b">
      <Heading level={5}>{APP_NAME}</Heading>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </header>
  );
}
