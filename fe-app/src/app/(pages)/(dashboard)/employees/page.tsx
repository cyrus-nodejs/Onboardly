"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useConfirm } from "@/components/confirm/useConfirm";
import { Heading } from "@/components/ui/typography/Heading";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { DashboardTable, TableColumn } from "@/components/ui/DashboardTable";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { handleError } from "@/lib/error";
import { Users } from "@/context/UsersContext";
import { useUser } from "@/hooks/useUsers";
import { Text } from "@/components/ui/typography/Text";
import { Form } from "@/components/form/Form";

const messageSchema = yup.object({
  subject: yup.string().trim().required("Subject is required"),
  message: yup.string().trim().required("Message cannot be empty"),
});

type MessageFormData = yup.InferType<typeof messageSchema>;

export default function EmployeesPage() {
  const {
    allEmployees,
    setAllEmployees,
    sendMessage,
    upgradeToAdmin,
    deleteUser,
  } = useUser();
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { confirm } = useConfirm();

  const copyText = selectedUser
    ? `${selectedUser.name}  ${selectedUser.email}`
    : "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<MessageFormData>({
    resolver: yupResolver(messageSchema),
    mode: "onTouched",
    shouldFocusError: true,
  });

  const onSubmit: SubmitHandler<MessageFormData> = async (data) => {
    if (!selectedUser) return;

    try {
      setIsSending(true);
      sendMessage(selectedUser, data);
      toast.success("Message sent ✅");
      reset();
    } catch (err) {
      toast.error("Failed to send message ❌");
      handleError(err, "Failed to create superuser");
    } finally {
      setIsSending(false);
    }
  };

  const handleUpgradeToAdmin = async () => {
    if (!selectedUser || selectedUser.isAdmin) return;
    const ok = await confirm({
      title: "Upgrade Role",
      message: `Are you sure you want to upgrade ${selectedUser.name}?`,
      confirmText: "Upgrade",
      cancelText: "Cancel",
    });

    if (!ok) return;
    setIsUpgrading(true);
    try {
      upgradeToAdmin(selectedUser);

      setAllEmployees((prev: Users[]) =>
        prev.map((e) =>
          e._id === selectedUser._id ? { ...e, isAdmin: true } : e,
        ),
      );

      setSelectedUser((prev) => (prev ? { ...prev, isAdmin: true } : prev));
      toast.success(`${selectedUser.name} upgraded to Admin ✅`);
    } catch (err) {
      toast.error("Failed to upgrade role ❌");
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleDeleteEmployee = async () => {
    if (!selectedUser) return;
    const ok = await confirm({
      title: "Delete employee",
      message: `Are you sure you want to delete ${selectedUser.name}?`,
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    if (!ok) return;
    setIsDeleting(true);
    try {
      deleteUser(selectedUser);

      setAllEmployees((prev: Users[]) =>
        prev.filter((e) => e._id !== selectedUser._id),
      );

      setSelectedUser(null);
      toast.success("Employee deleted ✅");
    } catch (err) {
      toast.error("Failed to delete employee ❌");
    } finally {
      setIsDeleting(false);
    }
  };

  const employeeColumns: TableColumn<Users>[] = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: (row) => (row.isAdmin ? "Admin" : "Employee") },
    {
      header: "Status",
      accessor: () => <Badge variant="secondary">Active</Badge>,
    },
    {
      header: "Joined",
      accessor: (row) =>
        new Date(row.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading level={2}>Employees</Heading>
      </div>

      <DashboardTable
        title="All Employees"
        columns={employeeColumns}
        data={allEmployees || []}
        keyAccessor="_id"
        onAction={setSelectedUser}
        actionText="Manage"
      />

      <Modal
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title={selectedUser ? selectedUser.name : "Employee Details"}
        copyText={copyText}
      >
        {selectedUser && (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Input
                placeholder="Email subject"
                {...register("subject")}
                required
                aria-invalid={!!errors.subject}
              />
              {errors.subject && (
                <Text as="paragraph" variant="body" color="error">
                  {errors.subject.message}
                </Text>
              )}

              <Textarea
                label="Send Email Message"
                placeholder="Write your message here..."
                {...register("message")}
                required
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <Text as="paragraph" variant="body" color="error">
                  {errors.message.message}
                </Text>
              )}

              <Button
                type="submit"
                isLoading={isSending || isSubmitting}
                disabled={!isValid || isSending || isSubmitting}
              >
                Send Message
              </Button>
            </div>

            <div className="flex gap-2 mt-4">
              {!selectedUser.isAdmin && (
                <Button
                  variant="secondary"
                  onClick={handleUpgradeToAdmin}
                  isLoading={isUpgrading}
                >
                  Upgrade to Admin
                </Button>
              )}
              <Button
                variant="destructive"
                onClick={handleDeleteEmployee}
                isLoading={isDeleting}
              >
                Delete Employee
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
}
