"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { bundleOptions } from "@/lib/ek6-data";
import { addToCart } from "@/utils/cart";
import type { Product } from "@/types/product";

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
  /** Builds the Checkout Champ URL for the current selection. */
  buildCheckoutUrl: () => string;
  reset: () => void;
};

const ProductSelectionContext = createContext<Ctx | null>(null);

function normalizeBikeColors(prev: BikeColor[], count: number): BikeColor[] {
  const next = prev.slice(0, count);
  while (next.length < count) next.push("silver");
  return next;
}

export function ProductSelectionProvider({ children, product }: { children: ReactNode; product: Product }) {
  const [bundleId, setBundleIdState] = useState("1");
  const [bikeColors, setBikeColors] = useState<BikeColor[]>(["silver"]);
  const [galleryIndex, setGalleryIndex] = useState(COLOR_GALLERY_INDEX.silver);

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

  const buildCheckoutUrl = useCallback(() => {
    const bundle = bundleOptions.find((b) => b.id === bundleId);
    const bundleIndex = bundleOptions.findIndex((option) => option.id === bundleId);
    const basePrice = bundle ? Number(bundle.price.replace(/[^0-9.]/g, "")) : product.price;
    const checkoutFlow = product.checkoutFlow || "buymeacoffee";
    const bundleCheckoutLink = checkoutFlow === "buymeacoffee"
      ? product.meta?.ek6_bundle_checkout_links?.[bundleIndex]?.trim()
      : undefined;
    const colorSummary = bikeColors
      .map((bikeColor, index) => `Bike ${index + 1}: ${bikeColor}`)
      .join(", ");
    const optionSummary = [
      bundle?.title ?? "1x EK6 Step-Through",
      colorSummary,
      "Rear basket (free gift)",
    ].join(" · ");

    addToCart({
      ...product,
      price: Number(basePrice.toFixed(2)),
      checkoutLink: bundleCheckoutLink || product.checkoutLink,
      checkoutFlow,
      selectedSize: optionSummary,
    } as Product & { selectedSize: string });

    return "/checkout";
  }, [bikeColors, bundleId, product]);

  const reset = useCallback(() => {
    setBundleIdState("1");
    setBikeColors(["silver"]);
    setGalleryIndex(COLOR_GALLERY_INDEX.silver);
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
      buildCheckoutUrl,
      reset,
    }),
    [color, bikeColors, galleryIndex, selectColor, setBikeColorAt, bundleId, setBundleId, buildCheckoutUrl, reset],
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
