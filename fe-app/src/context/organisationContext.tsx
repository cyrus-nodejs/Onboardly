"use client";

import React, { createContext, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { handleError } from "@/lib/error";

export type Organisation = {
  name: string;
  createdBy: string;
};

export type ActivityLogs = {
  _id: string;
  title: string;
  description: string;
  organisation: string;
};

export type OrganisationData = {
  name: string;
  email: string;
};

type OrganisationContextType = {
  activityLogs: ActivityLogs[] | [];
  currentOrganisation: OrganisationData | null;
};

export const OrganisationContext = createContext<
  OrganisationContextType | undefined
>(undefined);

export function OrganisationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activityLogs, setActivityLog] = useState<ActivityLogs[]>([]);
  const [currentOrganisation, setCurrentOrganisation] =
    useState<OrganisationData | null>(null);

  useEffect(() => {
    async function fetchOrganisation() {
      try {
        const data = await api<{ currentOrganisation: OrganisationData }>(
          "organisations/current",
          {
            method: "GET",
            credentials: "include",
          },
        );
        setCurrentOrganisation(data.currentOrganisation);
      } catch (err) {
        handleError(err, "fetch currentOrganisation failed");
      }
    }
    fetchOrganisation();
  }, []);

  useEffect(() => {
    async function fetchActivityLogs() {
      try {
        const data = await api<{ activityLogs: ActivityLogs[] }>(
          "activity/logs",
          {
            method: "GET",
            credentials: "include",
          },
        );
        setActivityLog(data.activityLogs);
      } catch (err) {
        handleError(err, "fetch Activity Logs failed");
      }
    }
    fetchActivityLogs();
  }, []);

  return (
    <OrganisationContext.Provider value={{ currentOrganisation, activityLogs }}>
      {children}
    </OrganisationContext.Provider>
  );
}
