"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

export type ProductSectionTabId = "spec" | "geometry" | "sizefit" | "faq";

const TABS: { id: ProductSectionTabId; label: string; hash: string }[] = [
  { id: "spec", label: "Specification", hash: "#spec-heading" },
  { id: "geometry", label: "Geometry", hash: "#geometry-section" },
  { id: "sizefit", label: "Size & Fit", hash: "#size-fit-section" },
  { id: "faq", label: "FAQs", hash: "#faq-section" },
];

function tabFromHash(hash: string): ProductSectionTabId {
  const found = TABS.find((t) => t.hash === hash);
  return found?.id ?? "spec";
}

export type ProductSectionTabsProps = {
  specPanel: ReactNode;
  geometryPanel: ReactNode;
  sizeFitPanel: ReactNode;
  faqPanel: ReactNode;
};

const PANEL_IDS: Record<ProductSectionTabId, string> = {
  spec: "panel-spec",
  geometry: "panel-geometry",
  sizefit: "panel-sizefit",
  faq: "panel-faq",
};

export function ProductSectionTabs({
  specPanel,
  geometryPanel,
  sizeFitPanel,
  faqPanel,
}: ProductSectionTabsProps) {
  const [active, setActive] = useState<ProductSectionTabId>("spec");

  const panels: Record<ProductSectionTabId, ReactNode> = {
    spec: specPanel,
    geometry: geometryPanel,
    sizefit: sizeFitPanel,
    faq: faqPanel,
  };

  const syncFromHash = useCallback(() => {
    const h = window.location.hash;
    if (!h || !TABS.some((t) => t.hash === h)) return;
    setActive(tabFromHash(h));
  }, []);

  /** Initial visit with #spec-heading etc.: sync tab + scroll once. Tab button clicks do not scroll. */
  useEffect(() => {
    const h = window.location.hash;
    if (!h || !TABS.some((t) => t.hash === h)) return;
    setActive(tabFromHash(h));
    requestAnimationFrame(() => {
      document.querySelector(h)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      syncFromHash();
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [syncFromHash]);

  const select = (id: ProductSectionTabId) => {
    setActive(id);
    const hash = TABS.find((t) => t.id === id)?.hash ?? "";
    window.history.replaceState(null, "", hash);
  };

  return (
    <div className="w-full pt-12">
      <nav className="w-full" aria-label="Product sections">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="mb-2 flex flex-wrap justify-start gap-4 overflow-x-auto scroll-smooth border-b border-zinc-100 pb-0.5 no-scrollbar sm:gap-6 md:justify-center md:gap-16"
            role="tablist"
          >
            {TABS.map((t) => {
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  id={`tab-${t.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(t.id)}
                  className={`relative whitespace-nowrap border-b-4 px-1.5 pb-4 text-sm font-medium tracking-tight transition-all sm:px-2 sm:text-base md:text-sm ${
                    isActive
                      ? "border-black text-black"
                      : "border-transparent text-zinc-400 hover:text-black"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <div>
        {(Object.keys(panels) as ProductSectionTabId[]).map((id) => (
          <div
            key={id}
            role="tabpanel"
            id={PANEL_IDS[id]}
            aria-labelledby={`tab-${id}`}
            className={active === id ? "block" : "hidden"}
          >
            {panels[id]}
          </div>
        ))}
      </div>
    </div>
  );
}
