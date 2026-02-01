"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AcceptInviteForm } from "@/features/invite/acceptInvite";

import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/Button";
import { StatusLayout } from "@/components/ui/StatusLayout";
import { handleError } from "@/lib/error";
import { useInvite } from "@/hooks/useInvite";

export default function AcceptInvitePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [prefill, setPrefill] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { fetchInviteByToken } = useInvite();

  useEffect(() => {
    if (!token) {
      toast.error("Not Token found!", {
        description: "No invite token was provided.",
      });
      return;
    }

    async function fetchInvite() {
      try {
        if (token) {
          const data = await fetchInviteByToken(token);
          setPrefill({ name: data?.name, email: data.email });
        }
      } catch (err) {
        const message = handleError(err, "Unable to fetch invite data");

        setError(message);
        toast.error("Invalid invite", {
          description: message,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchInvite();
  }, [token, fetchInviteByToken]);

  if (!token)
    return (
      <StatusLayout>
        <Text color="error">No invite token provided.</Text>
      </StatusLayout>
    );

  if (loading)
    return (
      <StatusLayout>
        <Text>Loading invite...</Text>
      </StatusLayout>
    );

  if (error)
    return (
      <StatusLayout>
        <Heading level={4} color="error">
          Invalid Invite
        </Heading>
        <Text color="error">{error}</Text>
        <Button href="/">Go Home Return Home</Button>
      </StatusLayout>
    );

  if (!prefill)
    return (
      <StatusLayout>
        <Text>Preparing invite...</Text>
      </StatusLayout>
    );

  return (
    <StatusLayout>
      <AcceptInviteForm inviteId={token} prefill={prefill} />
    </StatusLayout>
  );
}
