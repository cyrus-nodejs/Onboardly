import { Heading } from "@/components/ui/typography/Heading";
import LoginForm from "@/features/auth/LoginForm";
import { Card, CardContent } from "@/components/ui/Card";
import { Text } from "@/components/ui/typography/Text";
import { StatusLayout } from "@/components/ui/StatusLayout";

export default function LoginPage() {
  return (
    <StatusLayout>
      <div className="text-center space-y-2">
        <Card className="w-full max-w-md">
          <CardContent>
            <Heading level={4}>Sign in </Heading>
            <LoginForm />
            <Text variant="body">Don’t have access? Contact your admin</Text>
          </CardContent>
        </Card>
      </div>
    </StatusLayout>
  );
}
