"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { IconCircleCheck, IconThumbsDown, IconThumbsUp } from "./icons";
import { ReviewImageLightbox } from "./ReviewImageLightbox";
import {
  CUSTOMER_REVIEWS_PAGE_SIZE,
  customerReviewSummary,
  customerReviews,
} from "@/lib/ek6-customer-reviews";

const STAR_PATH =
  "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z";

function StarShape({
  size,
  fill,
  className,
}: {
  size: number;
  fill: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={STAR_PATH} />
    </svg>
  );
}

function BreakdownRow({
  filledStars,
  percent,
  count,
}: {
  filledStars: number;
  percent: number;
  count: number;
}) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex w-24 gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarShape
            key={i}
            size={12}
            fill={i < filledStars ? "#EAB308" : "transparent"}
            className={i < filledStars ? "text-yellow-500" : "text-zinc-200"}
          />
        ))}
      </div>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-1000"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="w-8 text-zinc-400">({count})</div>
    </div>
  );
}

function ReviewStarsBlue() {
  return (
    <div className="mb-2 flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarShape key={i} size={14} fill="#3B82F6" className="text-blue-500" />
      ))}
    </div>
  );
}

/** Compact pagination: start `1 2 3 … last`; near end `1 … last-2 last-1 last` (so 3 shows on page 2, 8 on page 9). */
function getPaginationSlots(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 2) {
    return [1, 2, 3, "ellipsis", total];
  }

  if (current >= total - 2) {
    return [1, "ellipsis", total - 2, total - 1, total];
  }

  if (current === 3) {
    return [1, 2, 3, 4, "ellipsis", total];
  }

  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

function PaginationBar({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const slots = getPaginationSlots(page, totalPages);

  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-zinc-100 pt-8 sm:flex-row">
      <div className="flex flex-wrap items-center justify-center gap-1">
        {slots.map((item, i) =>
          item === "ellipsis" ? (
            <span key={`e-${i}`} className="w-8 text-center text-sm text-zinc-400">
              …
            </span>
          ) : (
            <button
              key={`p-${item}-${i}`}
              type="button"
              onClick={() => onPageChange(item)}
              className={`h-10 w-10 rounded-md text-sm font-bold transition-all ${
                page === item ? "bg-blue-600 text-white" : "text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              {item}
            </button>
          ),
        )}
      </div>
      <div className="text-xs font-medium text-zinc-400">
        Page {page} of {totalPages}
      </div>
    </div>
  );
}

export function CustomerReviewsSection() {
  const totalPages = Math.max(1, Math.ceil(customerReviews.length / CUSTOMER_REVIEWS_PAGE_SIZE));
  const [page, setPage] = useState(1);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const pageItems = useMemo(() => {
    const start = (page - 1) * CUSTOMER_REVIEWS_PAGE_SIZE;
    return customerReviews.slice(start, start + CUSTOMER_REVIEWS_PAGE_SIZE);
  }, [page]);

  useEffect(() => {
    const el = document.getElementById("reviews-list");
    if (el && page > 1) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [page]);

  return (
    <section
      id="reviews-section"
      className="border-t border-zinc-100 bg-white px-4 py-6 sm:px-6 lg:px-8"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-4xl">
        <h2 id="reviews-heading" className="mb-6 text-center text-2xl font-black text-black">
          Customer reviews
        </h2>

        <div className="mb-6 flex flex-col items-center">
          <div className="mb-2 text-5xl font-black text-blue-600">{customerReviewSummary.average}</div>
          <div className="mb-1 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarShape key={i} size={20} fill="#EAB308" className="text-yellow-500" />
            ))}
          </div>
          <div className="mb-8 text-sm text-zinc-500">{customerReviewSummary.totalLabel}</div>

          <div className="mb-10 w-full max-w-md space-y-2">
            {customerReviewSummary.distribution.map((row) => (
              <BreakdownRow
                key={row.stars}
                filledStars={row.stars}
                percent={row.percent}
                count={row.count}
              />
            ))}
          </div>
        </div>

        <div id="reviews-list" className="relative min-h-[400px] space-y-12">
          {pageItems.map((r, idx) => (
            <article
              key={`${r.author}-${r.date}-${r.title}-${idx}`}
              className="border-b border-zinc-100 pb-12 last:border-b-0"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 font-black text-blue-600">
                    {r.initial}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-black">{r.author}</span>
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-green-600">
                        <IconCircleCheck className="h-3 w-3" />
                        Verified
                      </span>
                    </div>
                    <span className="text-xs capitalize text-zinc-400">
                      {r.country} • {r.date}
                    </span>
                  </div>
                </div>
              </div>

              <ReviewStarsBlue />
              <h3 className="mb-2 font-black text-black">{r.title}</h3>
              <p className="mb-6 whitespace-pre-wrap text-sm leading-relaxed text-zinc-600">{r.body}</p>

              {r.images && r.images.length > 0 ? (
                <div className="mb-6 flex flex-wrap gap-2">
                  {r.images.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() =>
                        setLightbox({
                          src,
                          alt: `Review photo ${i + 1} — ${r.title}`,
                        })
                      }
                      className="relative h-24 w-24 cursor-pointer overflow-hidden rounded-lg border border-zinc-100 transition-opacity hover:opacity-90 active:scale-95"
                      aria-label={`Enlarge review photo ${i + 1}`}
                    >
                      <Image src={src} alt="" fill className="object-cover" sizes="96px" />
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="flex items-center justify-end gap-4 text-xs font-medium text-zinc-400">
                <span>Is this helpful?</span>
                <button type="button" className="flex items-center gap-1 transition-colors hover:text-black">
                  <IconThumbsUp className="h-3.5 w-3.5" /> {r.helpfulUp}
                </button>
                <button type="button" className="flex items-center gap-1 transition-colors hover:text-black">
                  <IconThumbsDown className="h-3.5 w-3.5" /> {r.helpfulDown}
                </button>
              </div>
            </article>
          ))}
        </div>

        <PaginationBar page={page} totalPages={totalPages} onPageChange={setPage} />
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
