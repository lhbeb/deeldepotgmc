"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const LIVE_CHAT_SCRIPT_SRC = "https://chatapppay-rust.vercel.app/livechat.js";

export default function LiveChat() {
  const pathname = usePathname();
  const shouldHide = pathname?.startsWith("/admin") || pathname?.startsWith("/checkout");

  useEffect(() => {
    const updateVisibility = () => {
      const widget = document.getElementById("lc-container");
      if (widget) widget.style.display = shouldHide ? "none" : "flex";
    };

    updateVisibility();

    const observer = new MutationObserver(updateVisibility);
    observer.observe(document.body, { childList: true });

    return () => observer.disconnect();
  }, [shouldHide]);

  if (shouldHide) return null;

  return (
    <Script
      id="live-support-chat-script"
      src={LIVE_CHAT_SCRIPT_SRC}
      strategy="lazyOnload"
      data-color="#0070ba"
      data-position="bottom-right"
      data-button-size="60"
      data-label="Live Support"
    />
  );
}
