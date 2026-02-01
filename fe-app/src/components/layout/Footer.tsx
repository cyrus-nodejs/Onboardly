import { Text } from "@/components/ui/typography/Text";
import { APP_NAME } from "@/lib/constant";
export function Footer() {
  return (
    <footer className="py-6 text-center border-t">
      <Text variant="muted">
        © {new Date().getFullYear()} {APP_NAME}
      </Text>
    </footer>
  );
}
