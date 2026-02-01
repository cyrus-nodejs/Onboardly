import { useContext } from "react";
import { InviteContext } from "@/context/InviteContext";
export function useInvite() {
  const ctx = useContext(InviteContext);
  if (!ctx) {
    throw new Error("useInvite must be used inside InviteProvider");
  }
  return ctx;
}
