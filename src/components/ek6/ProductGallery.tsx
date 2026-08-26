"use client";

import Image from "next/image";
import { useRef, type Dispatch, type SetStateAction } from "react";
import { productGallery } from "@/lib/ek6-data";

type Props = {
  activeIndex: number;
  onActiveChange: Dispatch<SetStateAction<number>>;
};

export function ProductGallery({ activeIndex, onActiveChange }: Props) {
  const n = productGallery.length;
  const touchStartX = useRef<number | null>(null);

  const pct = n > 0 ? (activeIndex * 100) / n : 0;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    const threshold = 48;
    if (dx > threshold) onActiveChange((prev) => (prev - 1 + n) % n);
    else if (dx < -threshold) onActiveChange((prev) => (prev + 1) % n);
  };

  return (
    <div className="flex w-full flex-col gap-4 lg:max-w-none">
      <div
        className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-100 select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="h-full w-full overflow-hidden">
          <div
            className="flex h-full will-change-transform transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-0"
            style={{
              width: `${n * 100}%`,
              transform: `translate3d(-${pct}%, 0, 0)`,
            }}
          >
            {productGallery.map((img, i) => (
              <div
                key={img.src}
                className="relative h-full min-h-0 min-w-0 shrink-0 overflow-hidden"
                style={{ flex: `0 0 ${100 / n}%` }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={i === 0}
                  loading={i === 0 ? undefined : "lazy"}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onActiveChange((prev) => (prev - 1 + n) % n)}
          className="absolute top-1/2 z-100 left-4 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-white/40 text-zinc-900 opacity-0 shadow-lg backdrop-blur-md transition-all hover:bg-white/80 lg:flex lg:pointer-events-auto lg:group-hover:opacity-100"
          aria-label="Previous image"
        >
          <svg className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onActiveChange((prev) => (prev + 1) % n)}
          className="absolute top-1/2 right-4 z-100 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-white/40 text-zinc-900 opacity-0 shadow-lg backdrop-blur-md transition-all hover:bg-white/80 lg:flex lg:pointer-events-auto lg:group-hover:opacity-100"
          aria-label="Next image"
        >
          <svg className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="overflow-hidden px-1 py-2">
        <div className="no-scrollbar flex gap-3 overflow-x-auto">
          {productGallery.map((img, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={img.src}
                type="button"
                onClick={() => onActiveChange(i)}
                className={`relative flex-[0_0_80px] shrink-0 cursor-pointer transition-all duration-300 ease-out sm:flex-[0_0_100px] lg:flex-[0_0_85px] ${
                  isActive ? "scale-[1.02] opacity-100" : "scale-100 opacity-50 hover:opacity-80"
                }`}
                aria-label={`Gallery image ${i + 1}`}
              >
                <div
                  className={`relative aspect-square w-full overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                    isActive ? "border-[#030B19] ring-4 ring-[#030B19]/10" : "border-zinc-100"
                  }`}
                >
                  <Image src={img.src} alt="" fill className="object-cover" sizes="100px" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
