"use client";

import { Link } from "@/components/ui/Link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Users, ShieldCheck, Mail } from "lucide-react";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { APP_NAME, APP_WELCOME,  APP_DESCRIPTION } from "../lib/constant";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <Heading level={1}>{APP_WELCOME}</Heading>

        <Heading level={5}>
         {APP_DESCRIPTION}
        </Heading>

        <div className="mt-6 flex items-center gap-4">
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
          <Button variant="secondary">View Demo</Button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 px-8 pb-16">
        <Card>
          <CardContent>
            <Users className="text-blue-600" aria-hidden />
            <Heading level={3}>Organisation Control</Heading>
            <Text variant="muted">
              Super users can create and manage organisations.
            </Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Mail className="text-blue-600" aria-hidden />
            <Heading level={3}>Employee Invites</Heading>
            <Text variant="muted">
              Admins can invite employees via secure email links.
            </Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <ShieldCheck className="text-blue-600" aria-hidden />
            <Heading level={3}>Role-Based Access</Heading>
            <Text variant="muted">
              Fine-grained permission control across the platform.
            </Text>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
