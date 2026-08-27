import type { Metadata } from "next";
import { StoreShell } from "@/components/ek6/StoreShell";
import { PrivacyPolicyContent } from "@/components/ek6/policies/PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | CB VELO",
  description:
    "How cybervelopro.com collects, uses, and discloses your personal information when you visit or make a purchase.",
};

export default function PrivacyPolicyPage() {
  return (
    <StoreShell>
      <PrivacyPolicyContent />
    </StoreShell>
  );
}
