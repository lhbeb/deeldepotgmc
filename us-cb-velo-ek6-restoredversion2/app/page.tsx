import { CustomerReviewsSection } from "@/components/ek6/CustomerReviewsSection";
import { ComfortFeatures } from "@/components/ek6/ComfortFeatures";
import { FaqSection } from "@/components/ek6/FaqSection";
import { GeometrySection } from "@/components/ek6/GeometrySection";
import { ProductSectionTabs } from "@/components/ek6/ProductSectionTabs";
import { SizeFitSection } from "@/components/ek6/SizeFitSection";
import { SpecTable } from "@/components/ek6/SpecTable";
import { FlashSaleBanner } from "@/components/ek6/FlashSaleBanner";
import { ProductMain } from "@/components/ek6/ProductMain";
import { RideChoice } from "@/components/ek6/RideChoice";
import { SiteFooter } from "@/components/ek6/SiteFooter";
import { SiteHeader } from "@/components/ek6/SiteHeader";
import { StickyBuyBar } from "@/components/ek6/StickyBuyBar";
import { ProductVideoSection } from "@/components/ek6/ProductVideoSection";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "CB VELO EK6",
  description:
    "High-torque, long-range step-through folding electric bike with up to 100 mile range and 36mph top speed.",
  brand: { "@type": "Brand", name: "Cybervelo" },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "199.00",
    availability: "https://schema.org/InStock",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="ek6-product-page flex min-h-screen flex-col bg-white font-sans selection:bg-blue-600 selection:text-white">
        <FlashSaleBanner />
        <SiteHeader />
        <StickyBuyBar />
        <main className="grow ">
          <ProductMain />
          <ProductSectionTabs
            specPanel={<SpecTable />}
            geometryPanel={<GeometrySection />}
            sizeFitPanel={<SizeFitSection />}
            faqPanel={<FaqSection />}
          />
          <ComfortFeatures />
          <ProductVideoSection />
          <RideChoice />
          <CustomerReviewsSection />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
