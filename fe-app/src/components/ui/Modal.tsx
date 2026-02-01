"use client";

import React, { ReactNode, useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { Heading } from "./typography/Heading";
type ModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children: ReactNode;
  className?: string;
  title?: string;
  confirmText?: string;
  cancelText?: string;

  copyText?: string;
  copyLabel?: string;
};

export function Modal({
  open,
  onClose,
  onConfirm,
  children,
  className,
  title,
  confirmText = "Confirm",
  cancelText = "Cancel",
  copyText,
  copyLabel = "Copy",
}: ModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleCopy = async () => {
    if (!copyText) return;
    await navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={clsx(
          "bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex justify-between items-center mb-4">
            <Heading level={4}>{title}</Heading>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        )}

        <div className="mb-4">{children}</div>

        <div className="flex justify-end gap-2">
          {copyText && (
            <Button variant="outline" onClick={handleCopy}>
              {copied ? "Copied!" : copyLabel}
            </Button>
          )}

          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>

          {onConfirm && (
            <Button variant="destructive" onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
