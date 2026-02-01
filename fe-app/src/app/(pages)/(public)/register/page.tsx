import { Heading } from "@/components/ui/typography/Heading";
import { CreateAccountForm } from "@/features/auth/CreateAccountForm";
import { Card, CardContent } from "@/components/ui/Card";
import { Link } from "@/components/ui/Link";
import { Text } from "@/components/ui/typography/Text";
import { StatusLayout } from "@/components/ui/StatusLayout";

export default function CreateAccountPage() {
  return (
    <StatusLayout>
      <div className="text-center space-y-2">
        <Card className="w-full max-w-md">
          <CardContent >
            <Heading level={4}>Create account </Heading>
            <CreateAccountForm />
            <Text variant="muted">
              <Link href="/login"> Already have an account? Sign in</Link>
            </Text>
          </CardContent>
        </Card>
      </div>
    </StatusLayout>
  );
}
