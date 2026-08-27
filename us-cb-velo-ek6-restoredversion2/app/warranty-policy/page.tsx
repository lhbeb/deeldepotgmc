import type { Metadata } from "next";
import { StoreShell } from "@/components/ek6/StoreShell";
import { WarrantyPolicyContent } from "@/components/ek6/policies/WarrantyPolicyContent";

export const metadata: Metadata = {
  title: "Warranty Policy | CB VELO",
  description: "CB VELO limited warranty coverage, exclusions, and how to make a claim.",
};

export default function WarrantyPolicyPage() {
  return (
    <StoreShell>
      <WarrantyPolicyContent />
    </StoreShell>
  );
}
