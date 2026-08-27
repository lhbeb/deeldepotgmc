import type { Metadata } from "next";
import { StoreShell } from "@/components/ek6/StoreShell";
import { ShippingPolicyContent } from "@/components/ek6/policies/ShippingPolicyContent";

export const metadata: Metadata = {
  title: "Shipping Policy | CB VELO",
  description: "Shipping confirmation, domestic and international rates, damages, and customs.",
};

export default function ShippingPolicyPage() {
  return (
    <StoreShell>
      <ShippingPolicyContent />
    </StoreShell>
  );
}
