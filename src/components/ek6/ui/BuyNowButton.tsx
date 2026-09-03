"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type BuyNowButtonProps = {
  onClick?: () => void;
  href?: string;
  children?: ReactNode;
  variant?: "hero" | "compact";
  className?: string;
  type?: "button" | "submit";
  icon?: ReactNode;
};

const baseClass =
  "inline-flex cursor-pointer items-center justify-center bg-[#f5970c] font-black tracking-wider text-[#030B19] transition-all hover:bg-[#ffad2f] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5970c] focus-visible:ring-offset-2 active:scale-[0.98] active:bg-[#df8400]";

/** Primary orange CTA — full “Buy Now” or compact sticky bar. Renders an <a> when href is provided. */
export function BuyNowButton({
  onClick,
  href,
  children = "Buy Now",
  variant = "hero",
  className,
  type = "button",
  icon,
}: BuyNowButtonProps) {
  const classes = cn(
    baseClass,
    variant === "hero" && "w-full flex-1 rounded-md py-4 text-xl shadow-lg shadow-[#f5970c]/30",
    variant === "compact" &&
      "h-10 shrink-0 gap-2 rounded-lg px-4 text-xs tracking-widest uppercase shadow-md shadow-[#f5970c]/25 sm:px-8",
    className,
  );

  const inner = (
    <>
      {icon ? <span className="shrink-0">{icon}</span> : null}
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
