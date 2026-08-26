"use client";

import Image from "next/image";
import { cn } from "@/lib/utils/cn";

function GiftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={10}
      height={10}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 7v14" />
      <path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
      <path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5" />
      <rect x="3" y="7" width="18" height="4" rx="1" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function CheckboxVisual({
  checked,
  accent,
}: {
  checked: boolean;
  accent: "amber" | "blue";
}) {
  return (
    <div className="shrink-0">
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-md border-2 transition-all duration-300",
          checked
            ? accent === "amber"
              ? "border-[#f5970c] bg-[#f5970c]"
              : "border-[#030B19] bg-[#030B19]"
            : "border-zinc-200 bg-white group-hover:border-[#030B19]/50",
        )}
      >
        {checked ? (
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
          </svg>
        ) : null}
      </div>
    </div>
  );
}

export type AccessoryCardProps = {
  /** First row (free gift) uses amber when selected; others use blue when selected. */
  accent: "amber" | "blue";
  selected: boolean;
  onToggle: () => void;
  title: string;
  imageSrc: string;
  imageAlt: string;
  /** When `"Free Gift"`, shows gift badge and FREE line instead of price + external link. */
  subtitle?: string;
  priceLine?: string;
};

/** Compatible accessory row — checkbox, image, title, FREE or price (matches CB VELO styling). */
export function AccessoryCard({
  accent,
  selected,
  onToggle,
  title,
  imageSrc,
  imageAlt,
  subtitle,
  priceLine,
}: AccessoryCardProps) {
  const isFreeGift = subtitle === "Free Gift";
  const priceDisplay = priceLine?.replace(/^\+\s*/, "") ?? "";

  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "group relative flex w-full cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border p-3 text-left transition-all duration-300",
        selected
          ? accent === "amber"
            ? "border-[#f5970c]/40 bg-[#fff8ec] ring-1 ring-[#f5970c]/30"
            : "border-[#030B19]/20 bg-[#F0F6FF]/70 ring-1 ring-[#030B19]/15"
          : "border-zinc-100 bg-white hover:border-zinc-200 hover:bg-zinc-50/50",
      )}
    >
      <CheckboxVisual checked={selected} accent={accent} />
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="64px" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span className="text-[15px] font-bold leading-tight tracking-tight text-zinc-900">{title}</span>
          {isFreeGift ? (
            <span className="flex animate-pulse items-center gap-1 rounded bg-[#f5970c]/15 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#a85f00]">
              <GiftIcon />
              Free Gift
            </span>
          ) : (
            <ExternalLinkIcon className="text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </div>
        <div className="flex items-center gap-1 lg:mt-0.5">
          <span className="text-xs font-bold tracking-tight text-zinc-400">+</span>
          {isFreeGift ? (
            <span className="text-sm font-black uppercase tracking-tight text-[#a85f00]">FREE</span>
          ) : (
            <span className="text-sm font-black text-[#030B19]">{priceDisplay}</span>
          )}
        </div>
      </div>
    </button>
  );
}
