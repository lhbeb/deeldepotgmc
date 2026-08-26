"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  src: string | null;
  alt: string;
  onClose: () => void;
};

/** When true, the close control sits on the image; when false, it stays top-right of the viewport overlay. */
function isImageLargeInViewport(img: HTMLImageElement): boolean {
  const rect = img.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (rect.width < 1 || rect.height < 1) return false;

  const areaRatio = (rect.width * rect.height) / (vw * vh);
  const widthRatio = rect.width / vw;
  const heightRatio = rect.height / vh;

  return (
    widthRatio >= 0.48 ||
    heightRatio >= 0.48 ||
    areaRatio >= 0.28 ||
    (widthRatio >= 0.38 && heightRatio >= 0.38)
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function ReviewImageLightbox({ open, src, alt, onClose }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [closeOverImage, setCloseOverImage] = useState(false);

  const updateClosePlacement = useCallback(() => {
    const el = imgRef.current;
    if (!el || !el.complete || el.naturalWidth === 0) return;
    setCloseOverImage(isImageLargeInViewport(el));
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("resize", updateClosePlacement);
    return () => window.removeEventListener("resize", updateClosePlacement);
  }, [open, updateClosePlacement]);

  useLayoutEffect(() => {
    if (!open || !src) {
      return;
    }
    setCloseOverImage(false);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(updateClosePlacement);
    });
    return () => cancelAnimationFrame(id);
  }, [open, src, updateClosePlacement]);

  if (!open || !src) {
    return null;
  }

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal
      aria-label="Enlarged review photo"
      className="review-image-lightbox-overlay fixed inset-0 z-[100] bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Corner close — only when the image is small / letterboxed */}
      {!closeOverImage ? (
        <button
          type="button"
          onClick={handleCloseClick}
          className="absolute top-6 right-6 p-2 text-white/70 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none"
          aria-label="Close"
        >
          <CloseIcon />
        </button>
      ) : null}

      <div
        className="review-image-lightbox-inner flex h-full w-full items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative inline-block max-h-[90vh] max-w-full">
          {closeOverImage ? (
            <button
              type="button"
              onClick={handleCloseClick}
              className="absolute top-2 right-2 z-10 rounded-full bg-black/50 p-2 text-white/95 backdrop-blur-sm transition-colors hover:bg-black/65 hover:text-white focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          ) : null}

          {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary review URLs (e.g. external CDNs) */}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            onLoad={updateClosePlacement}
            className="block max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
