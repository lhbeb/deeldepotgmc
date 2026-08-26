"use client";

import { IconShieldCheck } from "../icons";
import { cn } from "@/lib/utils/cn";

export type ToggleProps = {
  enabled: boolean;
  onToggle: () => void;
  title?: string;
  subtitle?: string;
  price?: string;
};

/** Shipping protection row — shield, copy, price, switch. */
export function Toggle({
  enabled,
  onToggle,
  title = "Shipping Protection",
  subtitle = "From Damage, Loss & Theft",
  price = "$18.99",
}: ToggleProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl border-2 border-dashed p-3 transition-all",
        enabled ? "border-[#030B19] bg-[#F0F6FF]/70" : "border-zinc-200 bg-zinc-50/80",
      )}
    >
      <div className="flex min-w-0 items-center gap-4">
        <div
          className={cn(
            "relative flex h-12 w-12 shrink-0 items-center justify-center rounded border transition-colors",
            enabled ? "border-[#030B19]/10 bg-white" : "border-zinc-200 bg-white",
          )}
        >
          <IconShieldCheck className={cn("h-6 w-6", enabled ? "text-[#030B19]" : "text-zinc-400")} />
        </div>
        <div className="min-w-0 space-y-0.5">
          <h4 className={cn("text-[15px] font-bold", enabled ? "text-[#030B19]" : "text-zinc-900")}>{title}</h4>
          <p className="text-[12px] font-bold leading-tight text-zinc-500">{subtitle}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <div className="flex flex-col items-end text-right">
          <span className="text-[16px] font-black text-zinc-900">{price}</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={onToggle}
          className={cn(
            "relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none",
            enabled ? "bg-[#030B19]" : "bg-zinc-300",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200",
              enabled ? "translate-x-5" : "translate-x-0",
            )}
          />
        </button>
      </div>
    </div>
  );
}
