"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

function RadioCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export type RadioCardProps = {
  selected: boolean;
  onSelect: () => void;
  title: ReactNode;
  save: string;
  price: string;
  compare: string;
  badge?: string;
};

/** Bundle “save more” row — radio + title/badge + prices. */
export function RadioCard({
  selected,
  onSelect,
  title,
  save,
  price,
  compare,
  badge,
}: RadioCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative flex w-full items-center justify-between rounded-2xl border-2 p-4 text-left transition-all duration-300",
        selected
          ? "border-[#030B19] bg-[#F0F6FF]/70 ring-1 ring-[#030B19]"
          : "border-zinc-200 bg-white shadow-sm hover:border-zinc-300 hover:shadow-md",
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            selected ? "border-[#030B19] bg-[#030B19] text-[#F0F6FF]" : "border-zinc-300 bg-white text-transparent",
          )}
        >
          <RadioCheckIcon />
        </div>
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="text-lg font-bold leading-none text-zinc-900">{title}</span>
            {badge ? (
              <span className="rounded-full bg-[#f5970c] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#030B19]">
                {badge}
              </span>
            ) : null}
          </div>
          <div className="text-sm font-medium text-zinc-500">{save}</div>
        </div>
      </div>
      <div className="shrink-0 pl-2 text-right">
        <div className="text-xl font-black text-[#d47b00]">{price}</div>
        <div className="text-sm text-zinc-400 line-through">{compare}</div>
      </div>
      {selected ? (
        <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-[#030B19]/20" aria-hidden />
      ) : null}
    </button>
  );
}
