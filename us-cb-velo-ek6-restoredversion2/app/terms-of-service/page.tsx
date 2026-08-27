import type { Metadata } from "next";
import { StoreShell } from "@/components/ek6/StoreShell";
import { TermsOfServiceContent } from "@/components/ek6/policies/TermsOfServiceContent";

export const metadata: Metadata = {
  title: "Terms of Service | CB VELO",
  description: "Terms and conditions for using cybervelopro.com.",
};

export default function TermsOfServicePage() {
  return (
    <StoreShell>
      <TermsOfServiceContent />
    </StoreShell>
  );
}
