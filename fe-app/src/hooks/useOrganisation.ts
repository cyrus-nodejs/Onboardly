import { useContext } from "react";
import { OrganisationContext } from "@/context/organisationContext";
export function useOrganisation() {
  const ctx = useContext(OrganisationContext);
  if (!ctx) {
    throw new Error("useOrganisation must be used inside OrganisationProvider");
  }
  return ctx;
}
