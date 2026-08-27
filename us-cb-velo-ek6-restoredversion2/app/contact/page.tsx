import type { Metadata } from "next";
import { StoreShell } from "@/components/ek6/StoreShell";
import { ContactPageContent } from "@/components/ek6/policies/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Us | CB VELO",
  description: "Phone, email, and contact form for CB VELO pre-sales and after-sales support.",
};

export default function ContactPage() {
  return (
    <StoreShell>
      <ContactPageContent />
    </StoreShell>
  );
}
