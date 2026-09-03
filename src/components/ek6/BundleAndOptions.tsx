"use client";

import { AccessoryCard, BuyNowButton } from "./ui";
import { accessories, bundleOptions } from "@/lib/ek6-data";
import { useProductSelection } from "@/contexts/ProductSelectionContext";
import { trackEvent } from "@/lib/fbq";
import { EK6_PRODUCT_SLUG } from "@/lib/ek6-product";

/** Included accessory and primary CTA — sits in the product column under spec highlights. */
export function AccessoriesAndProtection() {
  const { buildCheckoutUrl, bundleId } = useProductSelection();

  return (
    <div className="space-y-6">
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
          <h3 className="text-lg font-medium text-zinc-900">Compatible Accessories</h3>
        </div>
        <div className="space-y-3">
          {accessories.map((a, index) => {
            return (
              <AccessoryCard
                key={a.title}
                accent={index === 0 ? "amber" : "blue"}
                selected
                onToggle={() => {}}
                title={a.title}
                imageSrc={a.image}
                imageAlt={a.title}
                subtitle={a.subtitle || undefined}
                priceLine={a.subtitle ? undefined : a.price}
              />
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex w-full gap-2">
          <BuyNowButton
          variant="hero"
          onClick={() => {
            const bundle = bundleOptions.find((b) => b.id === bundleId);
            const price = bundle ? parseFloat(bundle.price.replace(/[^0-9.]/g, "")) : 199;
            trackEvent("AddToCart", {
              content_name: bundle?.title || "EK6 Electric Bike",
              content_ids: [EK6_PRODUCT_SLUG],
              content_type: "product",
              currency: "USD",
              value: price,
            });
            window.location.href = buildCheckoutUrl();
          }}
        >Buy Now</BuyNowButton>
        </div>
      </div>
    </div>
  );
}
