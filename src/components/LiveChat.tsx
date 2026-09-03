"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const LIVE_CHAT_SCRIPT_SRC = "https://chatapppay-rust.vercel.app/livechat.js";
const LIVE_CHAT_BRAND_COLOR = "#f5970c";

export default function LiveChat() {
  const pathname = usePathname();
  const shouldHide = pathname?.startsWith("/admin") || pathname?.startsWith("/checkout") || pathname === "/lviechat";

  useEffect(() => {
    let openWhenReady = false;

    const updateVisibility = () => {
      const widget = document.getElementById("lc-container");
      if (widget) widget.style.display = shouldHide ? "none" : "flex";

      const liveChatButton = document.getElementById("lc-btn");
      if (openWhenReady && liveChatButton && !shouldHide) {
        openWhenReady = false;
        liveChatButton.click();
      }
    };

    const openLiveChat = () => {
      const liveChatButton = document.getElementById("lc-btn");
      if (liveChatButton && !shouldHide) {
        liveChatButton.click();
      } else {
        openWhenReady = true;
      }
    };

    updateVisibility();
    window.addEventListener("openLiveChat", openLiveChat);

    const observer = new MutationObserver(updateVisibility);
    observer.observe(document.body, { childList: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("openLiveChat", openLiveChat);
    };
  }, [shouldHide]);

  if (shouldHide) return null;

  return (
    <>
      <style>{`
        #lc-btn {
          background: ${LIVE_CHAT_BRAND_COLOR} !important;
          box-shadow: 0 6px 22px rgba(3, 11, 25, 0.24) !important;
        }
        #lc-btn svg {
          fill: #030B19 !important;
        }
        #lc-tooltip {
          background: #030B19 !important;
          color: #F0F6FF !important;
          border: 1px solid rgba(245, 151, 12, 0.55) !important;
          box-shadow: 0 6px 20px rgba(3, 11, 25, 0.22) !important;
        }
        #lc-iframe-wrap {
          border-color: rgba(245, 151, 12, 0.7) !important;
          box-shadow: 0 12px 40px rgba(3, 11, 25, 0.2) !important;
        }
      `}</style>
      <Script
        id="live-support-chat-script"
        src={LIVE_CHAT_SCRIPT_SRC}
        strategy="lazyOnload"
        data-color={LIVE_CHAT_BRAND_COLOR}
        data-position="bottom-right"
        data-button-size="60"
        data-label="Live Support"
      />
    </>
  );
}
