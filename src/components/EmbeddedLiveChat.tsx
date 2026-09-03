"use client";

import { useEffect } from "react";

const EMBED_SCRIPT_SRC = "https://chatapppay-rust.vercel.app/widget.js";
const EMBED_CHAT_URL = "https://chatapppay-rust.vercel.app/livechat";

declare global {
  interface Window {
    HFChat?: unknown;
  }
}

export default function EmbeddedLiveChat() {
  useEffect(() => {
    const container = document.getElementById("livechat-embed");
    if (!container) return;

    container.replaceChildren();
    window.HFChatConfig = {
      chatUrl: EMBED_CHAT_URL,
      target: "#livechat-embed",
      color: "#f5970c",
      siteName: "Deel Depot",
      siteUrl: window.location.href,
    };

    const script = document.createElement("script");
    script.src = EMBED_SCRIPT_SRC;
    script.async = true;
    script.dataset.target = "#livechat-embed";
    script.dataset.chatUrl = EMBED_CHAT_URL;
    script.dataset.color = "#f5970c";
    document.body.appendChild(script);

    return () => {
      script.remove();
      container.replaceChildren();
      delete window.HFChatConfig;
      delete window.HFChat;
    };
  }, []);

  return (
    <div
      id="livechat-embed"
      className="h-[600px] w-full overflow-hidden rounded-xl border border-[#f5970c]/60 bg-white"
    />
  );
}
