"use client";

import Image from "next/image";
import { AccessoriesAndProtection } from "./BundleAndOptions";
import { FeaturesAndBox } from "./FeaturesAndBox";
import { ProductGallery } from "./ProductGallery";
import { ProductReviewSlider } from "./ProductReviewSlider";
import { SpecHighlightGrid } from "./SpecHighlightGrid";
import { RadioCard } from "./ui";
import { useProductSelection } from "@/contexts/ProductSelectionContext";
import { customerReviews } from "@/lib/ek6-customer-reviews";
import { bundleOptions, warrantyBadge1k, warrantyBadgeUl } from "@/lib/ek6-data";

const orange =
  "radial-gradient(circle at 35% 35%, #ffb347, #ff9f43 40%, #e67e22 75%, #d35400 100%)";
const silver =
  "radial-gradient(circle at 35% 35%, #ffffff, #ececec 40%, #b2b2b2 75%, #757575 100%)";
const black =
  "radial-gradient(circle at 35% 35%, #4c4c4c, #1a1a1a 40%, #0d0d0d 75%, #000000 100%)";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={className}
      aria-hidden
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}

/** Swatch order: orange → silver → black (gallery indices via ProductSelectionContext). */
const colors = [
  { id: "orange" as const, label: "Orange", g: orange },
  { id: "silver" as const, label: "Silver", g: silver },
  { id: "black" as const, label: "Black", g: black },
];

export function ProductMain() {
  const {
    bikeColors,
    galleryIndex,
    setGalleryIndex,
    setBikeColorAt,
    bundleId,
    setBundleId,
  } = useProductSelection();

  const bikeCount = Math.min(3, Math.max(1, parseInt(bundleId, 10) || 1));

  const scrollToReviewImages = () => {
    document.getElementById("product-review-slider")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      id="product-main"
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-6 lg:px-8"
    >
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-20">
        <div className="min-w-0 self-stretch">
          <div className="ek6-product-gallery-sticky">
            <ProductGallery activeIndex={galleryIndex} onActiveChange={setGalleryIndex} />
            <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 sm:grid-cols-2 sm:p-4">
              <div className="group flex min-h-[82px] items-center gap-3 rounded-xl border border-zinc-200/80 bg-white px-4 py-3">
                <div className="relative h-12 w-12 shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <Image src={warrantyBadge1k} alt="1 Year Warranty" fill className="object-contain" sizes="64px" />
                </div>
                <div className="min-w-0">
                  <span className="block text-sm font-black leading-5 tracking-tight text-zinc-900">
                    1 Year Warranty
                  </span>
                  <span className="mt-0.5 block text-xs font-medium leading-4 text-zinc-500">
                    Convenient, Professional Service
                  </span>
                </div>
              </div>
              <div className="group flex min-h-[82px] items-center gap-3 rounded-xl border border-zinc-200/80 bg-white px-4 py-3">
                <div className="relative h-12 w-12 shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <Image src={warrantyBadgeUl} alt="TUV Safety Certified" fill className="object-contain" sizes="64px" />
                </div>
                <div className="min-w-0">
                  <span className="block text-sm font-black leading-5 tracking-tight text-zinc-900">
                    TUV Safety Certified
                  </span>
                  <span className="mt-0.5 block text-xs font-medium leading-4 text-zinc-500">
                    Certified in accordance with UL2849/UL2271
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col space-y-0 py-0">
          <div className="space-y-4">
            <button
              type="button"
              onClick={scrollToReviewImages}
              className="flex w-full max-w-full items-center gap-1.5 rounded-lg text-left transition-colors hover:bg-zinc-50/80 sm:w-auto"
            >
              <div className="flex text-[#f5970c]" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <span className="text-sm font-bold text-zinc-900">4.9/5</span>
              <span className="text-sm font-medium text-zinc-500">
                ({customerReviews.length.toLocaleString()} reviews)
              </span>
            </button>
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-zinc-900 md:text-4xl">
              CB VELO EK6 Folding Electric Bike
            </h1>
            <div className="space-y-3 px-1 pt-1">
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 shrink-0 text-zinc-900"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                <span className="text-[17px] font-semibold tracking-tight text-zinc-900">
                  Free shipping in the USA
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative flex h-5 w-5 items-center justify-center">
                  <div className="absolute h-full w-full animate-pulse rounded-full bg-green-500/20" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                </div>
                <span className="text-[17px] font-semibold tracking-tight text-zinc-900">
                  In stock, ready to ship
                </span>
              </div>
            </div>

            {/* Sticky buy bar: boundary after hero content (single space-y rhythm with siblings below). */}
            <div id="product-hero-end" className="h-px w-full shrink-0 scroll-mt-0" aria-hidden />
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="mb-4 font-sans text-2xl font-black tracking-tight text-zinc-900">Bundle and Save More</h3>
            <div className="grid grid-cols-1 gap-3">
              {bundleOptions.map((b) => (
                <RadioCard
                  key={b.id}
                  selected={bundleId === b.id}
                  onSelect={() => setBundleId(b.id)}
                  title={b.title}
                  badge={b.badge || undefined}
                  save={b.save}
                  price={b.price}
                  compare={b.compare}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6 pt-8">
            <div className="space-y-6">
              {Array.from({ length: bikeCount }).map((_, bikeIdx) => {
                const selected = bikeColors[bikeIdx] ?? "silver";
                const colorLabel = colors.find((c) => c.id === selected)?.label ?? "Silver";
                const headingId =
                  bikeCount === 1 ? "bike-color-heading" : `bike-color-heading-${bikeIdx + 1}`;
                return (
                  <section key={bikeIdx} className="space-y-3" aria-labelledby={headingId}>
                    <h3
                      id={headingId}
                      className="font-sans text-lg font-bold tracking-tight text-zinc-900"
                    >
                      {bikeCount === 1 ? (
                        <>
                          Bike Color - <span className="font-extrabold text-[#030B19]">{colorLabel}</span>
                        </>
                      ) : (
                        <>
                          Bike {bikeIdx + 1} Color -{" "}
                          <span className="font-extrabold text-[#030B19]">{colorLabel}</span>
                        </>
                      )}
                    </h3>
                    <div
                      id={bikeIdx === 0 ? "product-color-swatches" : undefined}
                      className="flex gap-4 pb-7"
                    >
                      {colors.map(({ id, label, g }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setBikeColorAt(bikeIdx, id)}
                          className={`group relative cursor-pointer transition-all duration-300 ${
                            selected === id ? "scale-110" : "scale-100 hover:scale-105"
                          }`}
                        >
                          <div className="relative h-10 w-10">
                            <div
                              className={`absolute -inset-1.5 rounded-full border-[2.5px] transition-all duration-300 ${
                                selected === id
                                  ? "border-[#030B19] opacity-100 shadow-lg shadow-[#030B19]/20"
                                  : "border-transparent opacity-0 group-hover:border-zinc-200 group-hover:opacity-50"
                              }`}
                            />
                            <div
                              className="absolute inset-0 rounded-full border border-black/5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.2)]"
                              style={{ background: g }}
                            />
                          </div>
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100">
                            {label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>

            <SpecHighlightGrid />
          </div>

          <AccessoriesAndProtection />

          <FeaturesAndBox />


          <ProductReviewSlider />
        </div>
      </div>
    </div>
  );
}
