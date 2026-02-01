"use client";
import { toast } from "sonner";
import { useState } from "react";
import { Heading } from "@/components/ui/typography/Heading";
import { Button } from "@/components/ui/Button";
import { useInvite } from "@/hooks/useInvite";
import { Invite } from "@/context/InviteContext";
import { Card, CardContent } from "@/components/ui/Card";
import { Text } from "@/components/ui/typography/Text";
import { DashboardTable, TableColumn } from "@/components/ui/DashboardTable";
import { Modal } from "@/components/ui/Modal";

export type ResendInvite = {
  success: boolean;
  inviteId: string;
  inviteLink: string;
  expiresAt: Date;
};
export default function InvitePage() {
  const { pendingInvite, acceptedInvite, resendInvite } = useInvite();
  const [selectedInvite, setSelectedInvite] = useState<Invite | null>(null);
  const [inviteLink, setInviteLink] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [resending, setResending] = useState(false);

  const copyText = selectedInvite
    ? (inviteLink ?? `${selectedInvite.name}  ${selectedInvite.email}`)
    : "";

  const handleResendInvite = async () => {
    if (!selectedInvite) return;

    try {
      setResending(true);

      const data = await resendInvite(selectedInvite._id);

      setInviteLink(data.inviteLink);
      toast.success("Invite resent to email");
    } catch (err) {
      toast.error("Failed to resend invite");
    } finally {
      setResending(false);
      setConfirmOpen(false);
    }
  };
  const closeModal = () => {
    setSelectedInvite(null);
    setInviteLink("");
    setConfirmOpen(false);
  };

  const pendingColumns: TableColumn<Invite>[] = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: () => "Employee" },
    {
      header: "Status",
      accessor: () => <Text color="warning">Pending</Text>,
    },
  ];

  const recentColumns: TableColumn<Invite>[] = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: () => "Employee" },
    {
      header: "Status",
      accessor: (row) =>
        row.used ? (
          <Text color="success">Accepted</Text>
        ) : (
          <Text color="warning">Pending</Text>
        ),
    },
    {
      header: "Date",
      accessor: (row) => new Date(row.updatedAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading level={2}>Invitations</Heading>
      </div>

      <DashboardTable
        title="Pending Invitations"
        columns={pendingColumns}
        data={pendingInvite}
        keyAccessor="_id"
        onAction={setSelectedInvite}
        actionText="Manage"
      />

      <Card>
        <CardContent >
          <Button href="/invitations/generate/invite">Send Invite</Button>
        </CardContent>
      </Card>

      <DashboardTable
        title="Recent Invites"
        columns={recentColumns}
        data={acceptedInvite}
        keyAccessor="_id"
        onAction={setSelectedInvite}
        actionText="Manage"
      />

      <Modal
        open={!!selectedInvite}
        onClose={closeModal}
        title="Manage Invite "
        copyText={copyText}
      >
        {selectedInvite && (
          <div className="space-y-2 pb-4">
            <Text>
              <Text variant="strong">Name:</Text>
              {selectedInvite.name}
            </Text>
            <Text>
              <Text variant="strong">Email:</Text> {selectedInvite.email}
            </Text>
            <Text>
              <Text variant="strong">Status:</Text>{" "}
              {selectedInvite.used ? "Accepted" : "Pending"}
            </Text>
          </div>
        )}

        {!selectedInvite?.used && (
          <Button onClick={handleResendInvite} disabled={resending}>
            {resending ? "Resending..." : "Resend Invite"}
          </Button>
        )}
      </Modal>
    </div>
  );
}
