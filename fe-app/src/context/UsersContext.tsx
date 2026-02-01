"use client";

import React, { createContext, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { handleError } from "@/lib/error";
export type Users = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isSuperUser: boolean;
  organisationId: string;
  createdAt: Date;
  updatedAt: Date;
};

type messageData = {
  subject: string;
  message: string;
};

type UserContextType = {
  allEmployees: Users[] | [];
  totalEmployees: number;
  setAllEmployees: React.Dispatch<React.SetStateAction<Users[]>>;
  sendMessage: (selectedUser: Users, _data: messageData) => Promise<void>;
  upgradeToAdmin: (selectedUser: Users) => Promise<void>;
  deleteUser: (selectedUser: Users) => Promise<void>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [totalEmployees, setTotalEmployees] = useState<number>(0);
  const [allEmployees, setAllEmployees] = useState<Users[]>([]);

  useEffect(() => {
    async function fetchTotalEmployees() {
      try {
        const data = await api<{ totalEmployees: number }>(
          "users/employees/total",
          {
            method: "GET",
            credentials: "include",
          },
        );

        setTotalEmployees(data.totalEmployees);
      } catch (err) {
        handleError(err, "Fetch Total failed");
      }
    }
    fetchTotalEmployees();
  }, []);

  useEffect(() => {
    async function fetchAllEmployees() {
      try {
        const data = await api<{ allEmployees: Users[] }>(
          "users/employees/all",
          {
            method: "GET",
            credentials: "include",
          },
        );
        setAllEmployees(data.allEmployees);
      } catch (err) {
        handleError(err, "Fetch  employees failed");
      }
    }
    fetchAllEmployees();
  }, []);

  async function sendMessage(selectedUser: Users, data: messageData) {
    await api("messages/send", {
      method: "POST",
      credentials: "include",
      body: {
        to: selectedUser.email,
        subject: data.subject.trim(),
        message: data.message.trim(),
      },
    });
  }

  async function upgradeToAdmin(selectedUser: Users) {
    await api(`users/employees/${selectedUser._id}/role`, {
      method: "PATCH",
      credentials: "include",
    });
  }

  async function deleteUser(selectedUser: Users) {
    await api(`users/employees/${selectedUser._id}/delete`, {
      method: "DELETE",
      credentials: "include",
    });
  }

  return (
    <UserContext.Provider
      value={{
        totalEmployees,
        allEmployees,
        setAllEmployees,
        sendMessage,
        upgradeToAdmin,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
