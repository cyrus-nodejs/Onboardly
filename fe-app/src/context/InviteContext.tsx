"use client";

import React, { createContext, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { handleError } from "@/lib/error";

type InviteSuccess = {
  success: true;
  name: string;
  email: string;
  organisationId: string;
};

type ResendInvite = {
  success: boolean;
  inviteId: string;
  inviteLink: string;
  expiresAt: Date;
};

export type Invite = {
  _id: string;
  invitedBy: string;
  name: string;
  email: string;
  tokenHash: string;
  organisation: string;
  used: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

type InviteContextType = {
  pendingInvite: Invite[] | [];
  acceptedInvite: Invite[] | [];
  resendInvite: (inviteId: string) => Promise<ResendInvite>;
  fetchInviteByToken: (token: string) => Promise<InviteSuccess>;
};

export const InviteContext = createContext<InviteContextType | undefined>(
  undefined,
);

export function InviteProvider({ children }: { children: React.ReactNode }) {
  const [pendingInvite, setPendingInvite] = useState<Invite[]>([]);

  const [acceptedInvite, setAcceptedInvite] = useState<Invite[]>([]);

  useEffect(() => {
    async function fetchPendingInvite() {
      try {
        const data = await api<{ pendingInvite: Invite[] }>("invites/pending", {
          method: "GET",
          credentials: "include",
        });
        setPendingInvite(data.pendingInvite);
      } catch (err) {
        handleError(err, "pendingInvite failed");
      }
    }
    fetchPendingInvite();
  }, []);

  useEffect(() => {
    async function fetchAcceptedInvite() {
      try {
        const data = await api<{ acceptedInvite: Invite[] }>(
          "invites/accepted",
          {
            method: "GET",
            credentials: "include",
          },
        );
        setAcceptedInvite(data.acceptedInvite);
      } catch (err) {
        handleError(err, "AcceptedInvite failed");
      }
    }
    fetchAcceptedInvite();
  }, []);

  async function resendInvite(inviteId: string) {
    return api<ResendInvite>(`invites/${inviteId}/resend`, {
      method: "PATCH",
      credentials: "include",
    });
  }

  async function fetchInviteByToken(inviteId: string) {
    return api<InviteSuccess>(`invites/${inviteId}/get`);
  }

  return (
    <InviteContext.Provider
      value={{
        pendingInvite,
        acceptedInvite,
        resendInvite,
        fetchInviteByToken,
      }}
    >
      {children}
    </InviteContext.Provider>
  );
}
