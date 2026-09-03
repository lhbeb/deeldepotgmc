import type { Metadata } from "next";
import { Clock3, MessageCircle, ShieldCheck } from "lucide-react";
import EmbeddedLiveChat from "@/components/EmbeddedLiveChat";

export const metadata: Metadata = {
  title: "Live Chat Support | Deel Depot",
  description: "Chat with Deel Depot customer support online, 24 hours a day, 7 days a week.",
  alternates: {
    canonical: "/lviechat",
  },
};

export default function LiveChatPage() {
  return (
    <div className="relative overflow-hidden bg-[#F0F6FF] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="pointer-events-none absolute -left-32 top-8 h-72 w-72 rounded-full bg-[#f5970c]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-8 h-80 w-80 rounded-full bg-[#030B19]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_450px] lg:gap-14">
        <section>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#030B19] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#F0F6FF] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#f5970c] shadow-[0_0_0_4px_rgba(245,151,12,0.18)]" />
            Support is online
          </div>

          <h1 className="max-w-xl text-4xl font-bold leading-[1.05] tracking-tight text-[#030B19] sm:text-5xl lg:text-6xl">
            Real help, right when you need it.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-[#475569] sm:text-lg">
            Have a product, delivery, or order question? Start a conversation with the Deel Depot support team. Live chat is available 24/7.
          </p>

          <div className="mt-8 grid max-w-lg gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#030B19]/10 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
              <Clock3 className="mb-3 h-5 w-5 text-[#f5970c]" aria-hidden="true" />
              <p className="text-sm font-bold text-[#030B19]">Available 24/7</p>
            </div>
            <div className="rounded-2xl border border-[#030B19]/10 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
              <MessageCircle className="mb-3 h-5 w-5 text-[#f5970c]" aria-hidden="true" />
              <p className="text-sm font-bold text-[#030B19]">Fast assistance</p>
            </div>
            <div className="rounded-2xl border border-[#030B19]/10 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
              <ShieldCheck className="mb-3 h-5 w-5 text-[#f5970c]" aria-hidden="true" />
              <p className="text-sm font-bold text-[#030B19]">Secure support</p>
            </div>
          </div>
        </section>

        <section aria-label="Deel Depot live chat" className="mx-auto w-full max-w-[450px]">
          <div className="rounded-[22px] bg-[#030B19] p-2.5 shadow-[0_24px_70px_rgba(3,11,25,0.22)]">
            <div className="flex items-center justify-between px-3 pb-2 pt-1 text-[#F0F6FF]">
              <span className="text-xs font-bold uppercase tracking-[0.14em]">Deel Depot Support</span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-[#F0F6FF]/75">
                <span className="h-2 w-2 rounded-full bg-[#f5970c]" /> Online
              </span>
            </div>
            <EmbeddedLiveChat />
          </div>
        </section>
      </div>
    </div>
  );
}
