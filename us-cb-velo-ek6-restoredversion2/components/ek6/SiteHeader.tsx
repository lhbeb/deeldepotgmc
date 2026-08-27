"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useProductSelection } from "@/contexts/ProductSelectionContext";
import { menuLinks, logoUrl } from "@/lib/ek6-data";
import {
  IconCart,
  IconChevronRight,
  IconClock,
  IconMail,
  IconMapPin,
  IconMenu,
  IconPhone,
  IconX,
} from "./icons";

const SCROLL_COMPACT_PX = 8;

export function SiteHeader() {
  const pathname = usePathname();
  const { reset } = useProductSelection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_COMPACT_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`z-drawer-overlay fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-out ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`z-drawer-panel fixed top-0 left-0 bottom-0 w-[85%] max-w-sm transform bg-white shadow-2xl transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50 p-6">
            <div className="relative h-8 w-32">
              <Image src={logoUrl} alt="CB VELO" fill className="object-contain object-left" sizes="128px" />
            </div>
            <button
              type="button"
              className="rounded-full p-2 transition-colors hover:bg-white"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <IconX className="h-6 w-6 text-zinc-400" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <section className="mb-10">
              <h3 className="mb-6 text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">Menu</h3>
              <nav className="space-y-1">
                {menuLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="group flex items-center justify-between border-b border-zinc-50 py-4 transition-all duration-300 hover:px-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-sm font-bold tracking-tight text-zinc-900 uppercase">{l.label}</span>
                    <IconChevronRight className="h-4 w-4 text-zinc-300 transition-colors group-hover:text-blue-600" />
                  </Link>
                ))}
              </nav>
            </section>
            <section className="space-y-8">
              <h3 className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">Contact Us</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-50">
                    <IconPhone className="h-[18px] w-[18px] text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="pointer-events-none mb-1 text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                      Phone Support
                    </p>
                    <a
                      href="tel:+12094490894"
                      className="block truncate text-sm font-bold text-black transition-colors hover:text-blue-600"
                    >
                      +1 209 449 0894
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-50">
                    <IconMail className="h-[18px] w-[18px] text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="pointer-events-none mb-1 text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                      Email Support
                    </p>
                    <a
                      href="mailto:support@cybervelopro.com"
                      className="block truncate text-sm font-bold text-black transition-colors hover:text-blue-600"
                    >
                      support@cybervelopro.com
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-50">
                    <IconClock className="h-[18px] w-[18px] text-blue-600" />
                  </div>
                  <div>
                    <p className="pointer-events-none mb-1 text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                      Working Hours
                    </p>
                    <p className="text-sm font-bold text-black">9 AM–10 PM (UTC+8)</p>
                    <p className="text-xs font-bold tracking-tighter text-zinc-500 uppercase">Monday – Friday</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-50">
                    <IconMapPin className="h-[18px] w-[18px] text-blue-600" />
                  </div>
                  <div>
                    <p className="pointer-events-none mb-1 text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                      Address
                    </p>
                    <p className="text-sm font-bold leading-tight text-black">
                      FLAT/ROOM 1802.BEVERLY HOUSE
                      <br />
                      93-107 LOCKHART ROAD
                      <br />
                      WAN CHAI, HONG KONG
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="p-8">
            <div className="relative mb-4 h-8 w-32 opacity-100">
              <Image src={logoUrl} alt="CB VELO" fill className="object-contain object-left" sizes="128px" />
            </div>
            <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase leading-relaxed">
              © 2026 CB VELO
              <br />
              Premium E-Mobility
            </p>
          </div>
        </div>
      </aside>

      <nav
        id="site-header"
        role="navigation"
        aria-label="Main"
        className={`sticky top-0 z-50 w-full border-b border-zinc-100 bg-white text-black transition-all duration-300 ${
          scrolled ? "py-1" : "py-3"
        }`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-6">
          <div className="flex justify-start">
            <button
              type="button"
              className="-ml-2 cursor-pointer rounded-full p-2 transition-colors hover:bg-zinc-50"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <IconMenu className="h-6 w-6" />
            </button>
          </div>
          <Link
            href="/"
            className="group flex flex-col items-center justify-center"
            onClick={(e) => {
              reset();
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <div className="relative h-10 w-40 transition-transform group-hover:scale-[1.02]">
              <Image src={logoUrl} alt="CB VELO" fill priority className="object-contain" sizes="160px" />
            </div>
          </Link>
          <div className="flex justify-end">
            <button
              type="button"
              className="relative -mr-2 cursor-pointer rounded-full p-2 transition-colors hover:bg-zinc-50"
              aria-label="Shopping cart"
            >
              <IconCart className="h-6 w-6" />
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                0
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
