import * as React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/typography/Heading";

import { List } from "@/components/ui/List";
type ActivityLog = {
  _id: string;
  title: string;
  description: string;
};

type RecentActivityCardProps = {
  activityLogs?: ActivityLog[];
  className?: string;
  heading?: string;
};

export function RecentActivityCard({
  activityLogs,
  className,
  heading = "Recent Activity",
}: RecentActivityCardProps) {
  const logsToShow = activityLogs?.length ? activityLogs : [];

  return (
    <Card >
      <CardContent >
        <Heading level={2}>{heading}</Heading>
        <List
          items={logsToShow}
          keyExtractor={(item) => item._id}
          emptyState={<Text>No activity found.</Text>}
          renderItem={(item) => (
            <div className="flex justify-between border-b p-2">
              <Text>{item.description}</Text>
              <Badge variant="success">{item.title}</Badge>
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
}
