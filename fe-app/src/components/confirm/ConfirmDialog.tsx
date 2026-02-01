"use client";
import { Text } from "../ui/typography/Text";
import { Button } from "../ui/Button";
import { Heading } from "../ui/typography/Heading";
type Props = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  title = "Confirm action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
        <Heading level={2}>{title}</Heading>
        <Text as="paragraph">{message}</Text>

        <div className="flex justify-end gap-3">
          <Button onClick={onCancel}>{cancelText}</Button>
          <Button onClick={onConfirm} variant="destructive">
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
