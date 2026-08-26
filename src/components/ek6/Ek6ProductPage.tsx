"use client";

import type { Product } from "@/types/product";
import { ProductSelectionProvider } from "@/contexts/ProductSelectionContext";
import { ProductMain } from "./ProductMain";
import { ProductSectionTabs } from "./ProductSectionTabs";
import { SpecTable } from "./SpecTable";
import { GeometrySection } from "./GeometrySection";
import { SizeFitSection } from "./SizeFitSection";
import { FaqSection } from "./FaqSection";
import { ComfortFeatures } from "./ComfortFeatures";
import { ProductVideoSection } from "./ProductVideoSection";
import { RideChoice } from "./RideChoice";
import { CustomerReviewsSection } from "./CustomerReviewsSection";
import { StickyBuyBar } from "./StickyBuyBar";

export default function Ek6ProductPage({ product }: { product: Product }) {
  return (
    <ProductSelectionProvider product={product}>
      <div className="ek6-product-page bg-white text-zinc-900 selection:bg-[#f5970c] selection:text-[#030B19]">
        <StickyBuyBar />
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
      </div>
    </ProductSelectionProvider>
  );
}
