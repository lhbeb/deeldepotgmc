"use client";

import { useCallback, useEffect, useState } from "react";
import { useProductSelection, type BikeColor } from "@/contexts/ProductSelectionContext";
import { BuyNowButton } from "./ui";
import { IconShoppingBag } from "./icons";

const orange =
  "radial-gradient(circle at 35% 35%, #ffb347, #ff9f43 40%, #e67e22 75%, #d35400 100%)";
const silver =
  "radial-gradient(circle at 35% 35%, #ffffff, #ececec 40%, #b2b2b2 75%, #757575 100%)";
const black =
  "radial-gradient(circle at 35% 35%, #4c4c4c, #1a1a1a 40%, #0d0d0d 75%, #000000 100%)";

const swatches: { id: BikeColor; g: string }[] = [
  { id: "orange", g: orange },
  { id: "silver", g: silver },
  { id: "black", g: black },
];

/** Bottom edge of main nav — sticky buy bar sits flush under it (tracks py-3 ↔ py-1 transition). */
function getSiteHeaderBottomPx(): number {
  if (typeof document === "undefined") return 49;
  const nav = document.getElementById("site-header");
  if (!nav) return 49;
  return nav.getBoundingClientRect().bottom;
}

export function StickyBuyBar() {
  const { color, selectColor } = useProductSelection();
  const [visible, setVisible] = useState(false);
  const [headerOffsetPx, setHeaderOffsetPx] = useState(49);

  useEffect(() => {
    const sentinel = document.getElementById("product-hero-end");
    const nav = document.getElementById("site-header");
    if (!sentinel) return;

    const update = () => {
      const bottom = getSiteHeaderBottomPx();
      document
        .querySelector<HTMLElement>(".ek6-product-page")
        ?.style.setProperty("--ek6-site-header-bottom", `${bottom}px`);
      setHeaderOffsetPx(bottom);
      setVisible(sentinel.getBoundingClientRect().top < bottom);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    let ro: ResizeObserver | undefined;
    if (nav && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => update());
      ro.observe(nav);
    }

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, []);

  const scrollToProduct = useCallback(() => {
    document.getElementById("product-main")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 left-0 z-40 border-b border-zinc-100 bg-white transition-all duration-500 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{
        transform: visible ? `translateY(${headerOffsetPx}px)` : "translateY(-100%)",
      }}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="min-w-0">
            <h2 className="text-sm font-black leading-none text-black">EK6 Up to 100Mile,36mph</h2>
            <span className="mt-1 block text-sm font-bold text-blue-600">$199.00</span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <div className="mr-2 flex items-center gap-2 pr-2">
            {swatches.map(({ id, g }) => (
              <button
                key={id}
                type="button"
                onClick={() => selectColor(id)}
                className="group relative h-6 w-6 cursor-pointer rounded-full transition-all duration-300"
                aria-label={`Color ${id}`}
              >
                <div
                  className={`absolute -inset-1 rounded-full border-[2px] transition-all duration-300 ${
                    color === id
                      ? "border-blue-600 opacity-100"
                      : "border-transparent opacity-0 group-hover:border-zinc-200 group-hover:opacity-50"
                  }`}
                />
                <div className="absolute inset-0 rounded-full" style={{ background: g }} />
              </button>
            ))}
          </div>
          <BuyNowButton
            variant="compact"
            onClick={scrollToProduct}
            icon={<IconShoppingBag className="h-[18px] w-[18px]" aria-hidden />}
          >
            <span className="hidden sm:inline">Buy Now</span>
            <span className="sm:hidden">Buy</span>
          </BuyNowButton>
        </div>
      </div>
    </div>
  );
}
