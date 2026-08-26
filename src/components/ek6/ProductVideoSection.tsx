"use client";

import { useLayoutEffect, useRef } from "react";

/** 0 when entering/leaving viewport edges, 1 when section is centered in the viewport. */
function viewportScrollProgress(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const range = vh + rect.height;
  if (range <= 0) return 0;
  const t = Math.max(0, Math.min(1, (vh - rect.top) / range));
  return t <= 0.5 ? t * 2 : (1 - t) * 2;
}

export function ProductVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const update = () => {
      el.style.setProperty("--product-video-p", String(viewportScrollProgress(el)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="product-video-section overflow-hidden bg-white py-12 md:py-24 px-4"
      aria-label="Product video"
    >
      <div className="product-video-shell mx-auto">
        <div className="product-video-frame relative aspect-video w-full overflow-hidden bg-zinc-100">
          <video
            className="h-full w-full object-cover"
            playsInline
            autoPlay
            loop
            muted
            preload="metadata"
            poster="/images/ek6/media/product-video-poster.jpg"
          >
            <source src="/images/ek6/media/product-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
