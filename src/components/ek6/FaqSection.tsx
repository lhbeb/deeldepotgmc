"use client";

import { FooterPaymentIcons } from "./FooterPaymentIcons";
import { FaqAccordion } from "./ui";
import { faqItems } from "@/lib/ek6-data";

const items = faqItems.map((item) => ({
  question: item.q,
  answer: item.a,
}));

export function FaqSection() {
  return (
    <section id="faq-section" className="w-full bg-zinc-50/80 py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FaqAccordion items={items} numbered />
        <div className="mt-10 flex justify-center border-t border-zinc-200/80 pt-10">
          <FooterPaymentIcons />
        </div>
      </div>
    </section>
  );
}
