import type { Metadata } from "next";
import { StoreShell } from "@/components/ek6/StoreShell";
import { CookiePolicyContent } from "@/components/ek6/policies/CookiePolicyContent";

export const metadata: Metadata = {
  title: "Cookie Policy | CB VELO",
  description: "How CB VELO uses cookies and how you can control preferences.",
};

export default function CookiePolicyPage() {
  return (
    <StoreShell>
      <CookiePolicyContent />
    </StoreShell>
  );
}
