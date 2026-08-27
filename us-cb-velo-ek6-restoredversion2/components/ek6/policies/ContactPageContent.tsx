"use client";

import { type FormEvent, useState } from "react";
import { IconClock, IconMail, IconPhone } from "../icons";

const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-bold transition-all focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20";

const labelClass = "text-xs font-black uppercase tracking-widest text-zinc-400";

const sectionTitleClass =
  "mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-400";

export function ContactPageContent() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-8 text-5xl font-black tracking-tighter text-black uppercase sm:mb-12">Contact Us</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col gap-16 md:gap-12">
          <section>
            <h2 className={sectionTitleClass}>
              <IconPhone className="h-4 w-4 shrink-0 text-blue-600" aria-hidden />
              Phone Support
            </h2>
            <div className="space-y-4">
              <div>
                <p className="mb-1 text-xs font-bold tracking-wider text-zinc-500 uppercase">Call Us</p>
                <div className="text-xl font-bold">
                  <span className="text-zinc-100 text-lg">//+1 659 220 0616</span>{" "}
                  <a href="tel:+12094490894" className="text-black transition-colors hover:text-blue-600">
                    +1 209 449 0894
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className={sectionTitleClass}>
              <IconMail className="h-4 w-4 shrink-0 text-blue-600" aria-hidden />
              Email Support
            </h2>
            <div className="space-y-4">
              <div>
                <p className="mb-1 text-xs font-bold tracking-wider text-zinc-500 uppercase">Pre-sales</p>
                <a
                  href="mailto:support@cybervelopro.com"
                  className="text-xl font-bold text-black transition-colors hover:text-blue-600"
                >
                  support@cybervelopro.com
                </a>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold tracking-wider text-zinc-500 uppercase">After-sales</p>
                <a
                  href="mailto:sales@cybervelopro.com"
                  className="text-xl font-bold text-black transition-colors hover:text-blue-600"
                >
                  sales@cybervelopro.com
                </a>
              </div>
            </div>
          </section>

          <section>
            <h2 className={sectionTitleClass}>
              <IconClock className="h-4 w-4 shrink-0 text-blue-600" aria-hidden />
              Working Hours
            </h2>
            <div>
              <p className="text-xl font-bold text-black">9 AM–10 PM (UTC+8)</p>
              <p className="mt-1 text-sm font-bold text-zinc-500">Monday – Friday</p>
            </div>
          </section>

          <div className="rounded-2xl bg-blue-600 p-6 text-white sm:p-8">
            <h3 className="mb-2 text-xl font-black uppercase italic tracking-wider">Fast Response</h3>
            <p className="text-sm font-bold leading-relaxed text-blue-100">
              Our support team typically responds to all inquiries within 12-24 business hours. We&apos;re here to help
              you get back on the road!
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-black tracking-tight text-black uppercase sm:mb-8">Send us a message</h2>
          {sent ? (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
              Thanks — your message has been recorded. We&apos;ll get back to you at the email you provided.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className={labelClass}>
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="John Doe"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className={labelClass}>
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="john@example.com"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-subject" className={labelClass}>
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="How can we help?"
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Your message here..."
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-4 font-black tracking-widest text-white uppercase shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
