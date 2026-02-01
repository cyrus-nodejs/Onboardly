import { Card, CardContent } from "@/components/ui/Card";

import { Text } from "@/components/ui/typography/Text";

export function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardContent >
        <Text variant="muted">{title}</Text>
        <Text variant="statsValue">{value}</Text>
      </CardContent>
    </Card>
  );
}
