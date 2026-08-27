import type { Metadata } from "next";
import { StoreShell } from "@/components/ek6/StoreShell";
import { RefundPolicyContent } from "@/components/ek6/policies/RefundPolicyContent";

export const metadata: Metadata = {
  title: "Refund Policy | CB VELO",
  description: "CB VELO return window, RMA process, restocking fees, and non-returnable items.",
};

export default function RefundPolicyPage() {
  return (
    <StoreShell>
      <RefundPolicyContent />
    </StoreShell>
  );
}
