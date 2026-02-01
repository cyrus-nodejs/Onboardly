"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/typography/Heading";
import { UpdateOrganisationForm } from "@/features/settings/updateOrganisationForm";
import { ChangePasswordForm } from "@/features/settings/updatePassword";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <Heading level={2}>Settings</Heading>

      <Card>
        <CardContent >
          <div className="flex justify-between items-center">
            <Heading level={2}>Organisation Settings</Heading>
            <Badge variant="secondary">Super Admin </Badge>
          </div>
          <UpdateOrganisationForm />
        </CardContent>
      </Card>
      <Card>
        <CardContent >
          <Heading level={2}>Security</Heading>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
