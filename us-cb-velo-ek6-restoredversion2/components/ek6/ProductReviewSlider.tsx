"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ReviewImageLightbox } from "./ReviewImageLightbox";
import { reviewSliderSlides } from "@/lib/ek6-customer-reviews";

const SLIDE_MS = 6000;

const STAR_PATH =
  "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z";

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="#EAB308"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-yellow-500"
      aria-hidden
    >
      <path d={STAR_PATH} />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function ProductReviewSlider() {
  const slides = reviewSliderSlides;
  const n = slides.length;
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = useCallback(() => {
    const slide = slides[idx];
    if (!slide) return;
    setLightbox({ src: slide.src, alt: slide.alt });
  }, [idx, slides]);

  useEffect(() => {
    if (n <= 1) {
      return;
    }
    const t = setInterval(() => setIdx((i) => (i + 1) % n), SLIDE_MS);
    return () => clearInterval(t);
  }, [n]);

  if (n === 0) {
    return null;
  }

  const current = slides[idx];

  const goPrev = () => setIdx((i) => (i - 1 + n) % n);
  const goNext = () => setIdx((i) => (i + 1) % n);

  return (
    <section
      id="product-review-slider"
      className="mt-8 scroll-mt-28 overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50"
      aria-label="Customer review highlight"
    >
      <div className="relative h-[400px]">
        <div className="absolute inset-0">
          {slides.map((slide, i) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              className={`object-cover transition-opacity duration-500 ${
                i === idx ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={i === 0}
            />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <button
          type="button"
          onClick={openLightbox}
          className="absolute inset-0 z-[5] cursor-pointer bg-transparent focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label="Enlarge review photo"
        />

        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end p-6 text-white">
          <div className="pointer-events-auto mb-3 flex gap-1" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
          <h3 className="pointer-events-auto mb-2 text-xl font-black leading-tight">&ldquo;{current.title}&rdquo;</h3>
          <p className="pointer-events-auto mb-4 line-clamp-4 text-sm italic leading-relaxed text-zinc-200">{current.body}</p>
          <div className="pointer-events-auto flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">— Verified Buyer</span>
            {n > 1 ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  className="rounded-full bg-white/10 p-2 backdrop-blur-md transition-colors hover:bg-white/20"
                  aria-label="Previous review"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-full bg-white/10 p-2 backdrop-blur-md transition-colors hover:bg-white/20"
                  aria-label="Next review"
                >
                  <ChevronRightIcon />
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {n > 1 ? (
          <div className="absolute top-6 left-6 z-20 flex gap-1">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                className={`pointer-events-auto h-1 rounded-full transition-all duration-300 ${
                  i === idx ? "w-8 bg-blue-500" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Review slide ${i + 1}`}
                aria-current={i === idx ? "true" : undefined}
              />
            ))}
          </div>
        ) : null}
      </div>

      <ReviewImageLightbox
        open={Boolean(lightbox)}
        src={lightbox?.src ?? null}
        alt={lightbox?.alt ?? "Enlarged review"}
        onClose={() => setLightbox(null)}
      />
    </section>
  );
}
