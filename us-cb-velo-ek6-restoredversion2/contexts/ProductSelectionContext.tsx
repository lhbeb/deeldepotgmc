"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { accessories, bundleOptions, SHIPPING_PROTECTION_WOO_ID } from "@/lib/ek6-data";

/**
 * WordPress / WooCommerce checkout domain.
 * The PHP plugin on this site accepts:
 *   ?bundle=N        — bundle quantity tier (1, 2, or 3)
 *   &addons=ID,ID    — comma-separated WooCommerce product IDs for add-ons
 */
const WOO_CHECKOUT_BASE = "https://order.cybervelopro.com";

export type BikeColor = "orange" | "silver" | "black";

const COLOR_GALLERY_INDEX: Record<BikeColor, number> = {
  black: 0,
  orange: 1,
  silver: 2,
};

type Ctx = {
  /** Primary bike color (bike 1) — used for gallery + sticky bar. */
  color: BikeColor;
  bikeColors: BikeColor[];
  galleryIndex: number;
  setGalleryIndex: React.Dispatch<React.SetStateAction<number>>;
  selectColor: (id: BikeColor) => void;
  setBikeColorAt: (index: number, id: BikeColor) => void;
  bundleId: string;
  setBundleId: (id: string) => void;
  /** Optional accessory titles → selected (mandatory ones are always added to URL). */
  selectedAccessories: Record<string, boolean>;
  toggleAccessory: (title: string) => void;
  /** Builds the Checkout Champ URL for the current selection. */
  buildCheckoutUrl: (includeProtection?: boolean) => string;
  reset: () => void;
};

const ProductSelectionContext = createContext<Ctx | null>(null);

function normalizeBikeColors(prev: BikeColor[], count: number): BikeColor[] {
  const next = prev.slice(0, count);
  while (next.length < count) next.push("silver");
  return next;
}

export function ProductSelectionProvider({ children }: { children: ReactNode }) {
  const [bundleId, setBundleIdState] = useState("1");
  const [bikeColors, setBikeColors] = useState<BikeColor[]>(["silver"]);
  const [galleryIndex, setGalleryIndex] = useState(COLOR_GALLERY_INDEX.silver);
  const [selectedAccessories, setSelectedAccessories] = useState<Record<string, boolean>>({});

  const color = bikeColors[0] ?? "silver";

  const setBundleId = useCallback((id: string) => {
    setBundleIdState(id);
    const n = Math.min(3, Math.max(1, parseInt(id, 10) || 1));
    setBikeColors((prev) => normalizeBikeColors(prev, n));
  }, []);

  const setBikeColorAt = useCallback((index: number, id: BikeColor) => {
    setBikeColors((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const next = [...prev];
      next[index] = id;
      return next;
    });
    if (index === 0) {
      setGalleryIndex(COLOR_GALLERY_INDEX[id]);
    }
  }, []);

  const selectColor = useCallback((id: BikeColor) => {
    setBikeColorAt(0, id);
  }, [setBikeColorAt]);

  const toggleAccessory = useCallback((title: string) => {
    setSelectedAccessories((prev) => ({ ...prev, [title]: !prev[title] }));
  }, []);

  const buildCheckoutUrl = useCallback((includeProtection?: boolean) => {
    const bundle = bundleOptions.find((b) => b.id === bundleId);
    // Bundle quantity tier (1, 2, or 3) — matches PHP OB_BUNDLE_PRICES keys
    const bundleQty = bundle?.bundleQty ?? 1;

    // Collect WooCommerce product IDs for selected add-ons
    const addonIds: number[] = [];

    // 1. Mandatory add-ons (e.g. Rear Basket, WC ID 43) — always sent
    accessories.forEach((a) => {
      if (a.mandatory) {
        addonIds.push(a.wooProductId);
      }
    });

    // 2. Optional selected accessories
    accessories.forEach((a) => {
      if (!a.mandatory && selectedAccessories[a.title]) {
        addonIds.push(a.wooProductId);
      }
    });

    // 3. Shipping Protection (WC ID 47) — only if toggled on
    if (includeProtection) {
      addonIds.push(SHIPPING_PROTECTION_WOO_ID);
    }

    // Build URL: /checkout/?bundle=2&addons=43,30,32,47
    const params = new URLSearchParams();
    params.set("bundle", String(bundleQty));
    if (addonIds.length > 0) {
      params.set("addons", addonIds.join(","));
    }

    return `${WOO_CHECKOUT_BASE}/checkout/?${params.toString()}`;
  }, [bundleId, selectedAccessories]);

  const reset = useCallback(() => {
    setBundleIdState("1");
    setBikeColors(["silver"]);
    setGalleryIndex(COLOR_GALLERY_INDEX.silver);
    setSelectedAccessories({});
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  const value = useMemo(
    () => ({
      color,
      bikeColors,
      galleryIndex,
      setGalleryIndex,
      selectColor,
      setBikeColorAt,
      bundleId,
      setBundleId,
      selectedAccessories,
      toggleAccessory,
      buildCheckoutUrl,
      reset,
    }),
    [color, bikeColors, galleryIndex, selectColor, setBikeColorAt, bundleId, setBundleId, selectedAccessories, toggleAccessory, buildCheckoutUrl, reset],
  );

  return <ProductSelectionContext.Provider value={value}>{children}</ProductSelectionContext.Provider>;
}

export function useProductSelection() {
  const ctx = useContext(ProductSelectionContext);
  if (!ctx) {
    throw new Error("useProductSelection must be used within ProductSelectionProvider");
  }
  return ctx;
}
