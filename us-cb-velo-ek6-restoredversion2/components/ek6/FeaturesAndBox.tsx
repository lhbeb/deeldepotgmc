"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { FooterPaymentIcons } from "./FooterPaymentIcons";
import { IconChevronDown } from "./icons";
import { faqItems, featuresAtGlanceSections, whatsInBoxItems } from "@/lib/ek6-data";

function AccordionRow({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-zinc-100 last:border-0">
      <button
        type="button"
        className="group flex w-full items-center justify-between py-4 transition-all"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="text-left text-sm font-black uppercase tracking-widest text-zinc-900">{title}</span>
        <IconChevronDown
          className={`h-5 w-5 text-zinc-400 transition-transform duration-300 ease-out group-hover:text-zinc-600 ${
            open ? "rotate-180 text-blue-600" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[2000px] pb-6 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-sm leading-relaxed text-zinc-600">{children}</div>
      </div>
    </div>
  );
}

/** Accordion stack for the product column: Features, What’s in the box (image grid), FAQs. */
export function FeaturesAndBox() {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [boxOpen, setBoxOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <div className="mt-0 border-t border-zinc-100">
      <AccordionRow title="Features at a Glance" open={featuresOpen} onToggle={() => setFeaturesOpen((o) => !o)}>
        <div className="space-y-6">
          {featuresAtGlanceSections.map((sec) => (
            <div key={sec.heading} className="space-y-3">
              <h4 className="text-[11px] font-black tracking-[0.2em] text-blue-600/80 uppercase">{sec.heading}</h4>
              <div className="space-y-2">
                {sec.rows.map((row) => (
                  <div key={row.label} className="flex items-start justify-between border-b border-zinc-50 pb-2">
                    <span className="font-medium text-zinc-500">{row.label}</span>
                    <span className="ml-4 text-right font-bold text-zinc-900">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AccordionRow>

      <AccordionRow title="What&apos;s in the box" open={boxOpen} onToggle={() => setBoxOpen((o) => !o)}>
        <div className="grid grid-cols-3 gap-4">
          {whatsInBoxItems.map((item) => (
            <div
              key={item.label}
              className="group flex flex-col items-center gap-2 rounded-xl bg-zinc-50 p-2 transition-colors hover:bg-zinc-100"
            >
              <div className="relative h-16 w-16 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
              <span className="text-center text-[10px] font-bold leading-tight text-zinc-900">{item.label}</span>
            </div>
          ))}
        </div>
      </AccordionRow>

      <AccordionRow title="FAQs" open={faqOpen} onToggle={() => setFaqOpen((o) => !o)}>
        <div className="space-y-6">
          {faqItems.map((item) => (
            <div key={item.q} className="space-y-2 border-b border-zinc-50 pb-4 last:border-0 last:pb-0">
              <h5 className="font-black leading-tight text-zinc-900">{item.q}</h5>
              <p className="font-medium text-zinc-500">{item.a}</p>
            </div>
          ))}
        </div>
      </AccordionRow>

      <div className="flex justify-center pt-6">
        <FooterPaymentIcons />
      </div>
    </div>
  );
}
