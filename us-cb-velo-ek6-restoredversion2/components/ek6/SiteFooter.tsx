import Image from "next/image";
import { footerPolicies, footerSupport, logoUrl } from "@/lib/ek6-data";
import Link from "next/link";
import { FooterPaymentIcons } from "./FooterPaymentIcons";

export function SiteFooter() {
  return (
    <footer className="bg-zinc-900 py-10 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 border-b border-zinc-800 pb-12 md:grid-cols-4">
          <div className="col-span-1 space-y-6 md:col-span-2">
            <Link href="/" className="inline-block">
              <div className="relative h-12 w-48 invert">
                <Image
                  src={logoUrl}
                  alt="CB VELO"
                  fill
                  className="object-contain object-left"
                  sizes="192px"
                />
              </div>
            </Link>
            <div className="space-y-4 text-sm font-bold uppercase leading-relaxed tracking-tight text-zinc-400">
              <div className="space-y-1">
                <p className="text-white">Contact Us</p>
                <p>
                  Phone:{" "}
                  <a href="tel:+12094490894" className="transition-colors hover:text-blue-400">
                    +1 209 449 0894
                  </a>
                </p>
                <p>
                  Pre-sales:{" "}
                  <a href="mailto:support@cybervelopro.com" className="transition-colors hover:text-blue-400">
                    support@cybervelopro.com
                  </a>
                </p>
                <p>
                  After-sales:{" "}
                  <a href="mailto:sales@cybervelopro.com" className="transition-colors hover:text-blue-400">
                    sales@cybervelopro.com
                  </a>
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-white">Address</p>
                <p>FLAT/ROOM 1802.BEVERLY HOUSE</p>
                <p>93-107 LOCKHART ROAD</p>
                <p>WAN CHAI, HONG KONG</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-zinc-100">Policies</h3>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-tight text-zinc-400">
              {footerPolicies.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-blue-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-zinc-100">Support</h3>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-tight text-zinc-400">
              {footerSupport.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-blue-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-8 text-[10px] font-bold text-zinc-200 md:flex-row">
          <p>© 2026 CB VELO. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <FooterPaymentIcons />
          </div>
        </div>
      </div>
    </footer>
  );
}
