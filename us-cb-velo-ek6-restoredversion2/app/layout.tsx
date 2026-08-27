import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { ProductSelectionProvider } from "@/contexts/ProductSelectionContext";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "CB VELO EK6 | 100 Mile Range Folding Electric Bike",
  description:
    "The CB VELO EK6 is a high-torque, long-range step-through ebike. Featuring a 750W motor, Samsung battery, and superior comfort for all-terrain riding.",
  openGraph: {
    title: "CB VELO EK6 | 100 Mile Range Folding Electric Bike",
    description:
      "The CB VELO EK6 is a high-torque, long-range step-through ebike. Featuring a 750W motor, Samsung battery, and superior comfort for all-terrain riding.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full`}>
      <body className={`${jakarta.className} flex min-h-full flex-col antialiased`}>
        {/* Facebook Pixel — fires PageView automatically on every page load */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '926381683549915');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=926381683549915&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <ProductSelectionProvider>{children}</ProductSelectionProvider>
      </body>
    </html>
  );
}
