"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function FlashSaleBanner() {
  const [remaining, setRemaining] = useState(() => 11 * 3600 + 7 * 60 + 9);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemaining((s) => (s <= 0 ? 11 * 3600 + 7 * 60 + 9 : s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const sec = remaining % 60;

  return (
    <div className="relative z-50 bg-blue-600 py-1.5 px-4 text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-row items-center justify-center gap-4 sm:gap-8">
        <div className="flex flex-col items-end">
          <span className="text-right text-lg font-black leading-none sm:text-2xl">⚡FLASH SALE</span>
          <span className="block text-[10px] font-bold uppercase tracking-widest opacity-80">Ends In:</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex flex-col items-center">
            <span className="text-xl font-black tabular-nums leading-none sm:text-3xl">{pad(h)}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Hours</span>
          </div>
          <span className="mb-3 text-xl font-black opacity-50 sm:mb-4 sm:text-2xl">:</span>
          <div className="flex flex-col items-center">
            <span className="text-xl font-black tabular-nums leading-none sm:text-3xl">{pad(m)}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Mins</span>
          </div>
          <span className="mb-3 text-xl font-black opacity-50 sm:mb-4 sm:text-2xl">:</span>
          <div className="flex flex-col items-center">
            <span className="text-xl font-black tabular-nums leading-none sm:text-3xl">{pad(sec)}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Secs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
