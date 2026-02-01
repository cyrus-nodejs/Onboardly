import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UsersContext";
import { InviteProvider } from "@/context/InviteContext";
import { OrganisationProvider } from "@/context/organisationContext";
import { ClientProviders } from "../components/providers/ClientProviders";
import { ConfirmProvider } from "@/components/confirm/useConfirm";
import { APP_NAME, APP_DESCRIPTION } from "../lib/constant";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import React from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <UserProvider>
            <OrganisationProvider>
              <InviteProvider>
                <ConfirmProvider>{children}</ConfirmProvider>
                <ClientProviders />
              </InviteProvider>
            </OrganisationProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
