"use client";

import { useState } from "react";
import { IconMinus, IconPlus } from "../icons";
import { cn } from "@/lib/utils/cn";

export type FaqAccordionItem = {
  question: string;
  answer: string;
};

export type FaqAccordionProps = {
  items: FaqAccordionItem[];
  /** Prefix questions with "1. ", "2. ", … */
  numbered?: boolean;
  className?: string;
};

/** Expand/collapse FAQ rows — plus/minus, bordered cards. */
export function FaqAccordion({ items, numbered = true, className }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("space-y-6", className)}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const label = numbered ? `${i + 1}. ${item.question}` : item.question;
        return (
          <div
            key={`${item.question}-${i}`}
            className="overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all hover:border-zinc-200"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-zinc-50/50 md:p-4"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="pr-8 text-base font-bold text-black md:text-lg">{label}</span>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-50 text-zinc-400 transition-transform duration-300">
                {isOpen ? <IconMinus className="h-6 w-6" /> : <IconPlus className="h-6 w-6" />}
              </div>
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-[min(80vh,1200px)] opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <div className="border-t border-zinc-50 p-6 pt-0 md:p-8 md:pt-0">
                <p className="text-base font-medium leading-relaxed text-zinc-500 md:text-lg">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
