"use client";

import React, { createContext, useEffect, useState } from "react";
import { api, apiWithAutoRefresh } from "@/lib/api";
import { useRouter } from "next/navigation";
import { handleError } from "@/lib/error";
import { SetStateAction, Dispatch } from "react";
export type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isSuperUser: boolean;
  organisationId: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function fetchUser() {
      try {
        const data = await apiWithAutoRefresh<{ user: User }>("auth/me");
        if (mounted) {
          setUser(data.user);
        }
      } catch {
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchUser();
    return () => {
      mounted = false;
    };
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const data = await api<{ user: User }>("auth/login", {
        method: "POST",
        body: { email, password },
        credentials: "include",
      });
      setUser(data.user);
      router.push("/dashboard");
    } catch (err) {
      throw new Error(handleError(err, "Invalid email or password ❌"));
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await api("auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      router.push("/");
    } catch (err) {
      setUser(null);
      handleError(err, "Logout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
