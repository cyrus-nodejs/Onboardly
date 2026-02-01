"use client";
import { Heading } from "@/components/ui/typography/Heading";
import { useInvite } from "@/hooks/useInvite";
import { useUser } from "@/hooks/useUsers";
import { useOrganisation } from "@/hooks/useOrganisation";
import { StatCard } from "@/features/dashboard/StatsCard";
import { RecentActivityCard } from "@/components/ui/RecentActivityCard";

export default function DashboardPage() {
  const { pendingInvite } = useInvite();
  const { currentOrganisation, activityLogs } = useOrganisation();
  const { totalEmployees } = useUser();

  const pendingInvites = pendingInvite?.length;
  const activeOrganisations = currentOrganisation ? 1 : 0;
  const totalEmployee = totalEmployees;

  return (
    <div className="space-y-8">
      <Heading level={2}>Dashboard</Heading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Employees" value={totalEmployee} />
        <StatCard title="Pending Invites" value={pendingInvites} />
        <StatCard title="Active Organisations" value={activeOrganisations} />
      </div>

      <RecentActivityCard activityLogs={activityLogs} />
    </div>
  );
}
