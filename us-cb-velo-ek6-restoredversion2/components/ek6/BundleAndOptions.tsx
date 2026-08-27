"use client";

import { useEffect, useState } from "react";
import { AccessoryCard, BuyNowButton, Toggle } from "./ui";
import { accessories, bundleOptions } from "@/lib/ek6-data";
import { useProductSelection } from "@/contexts/ProductSelectionContext";
import { trackEvent } from "@/lib/fbq";

/** Accessories, primary CTA, and shipping protection — sits in the product column under spec highlights. */
export function AccessoriesAndProtection() {
  const { selectedAccessories, toggleAccessory, buildCheckoutUrl, bundleId } = useProductSelection();
  const [protection, setProtection] = useState(true);

  // Fire ViewContent once when the product section mounts
  useEffect(() => {
    const bundle = bundleOptions.find((b) => b.id === bundleId);
    const price = bundle ? parseFloat(bundle.price.replace(/[^0-9.]/g, "")) : 199;
    trackEvent("ViewContent", {
      content_name: "EK6 Electric Bike",
      content_ids: [bundle?.checkoutId ?? 1],
      content_type: "product",
      currency: "USD",
      value: price,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
          <h3 className="text-lg font-medium text-zinc-900">Compatible Accessories</h3>
        </div>
        <div className="space-y-3">
          {accessories.map((a, index) => {
            const selected = a.mandatory ? true : !!selectedAccessories[a.title];
            return (
              <AccessoryCard
                key={a.title}
                accent={index === 0 ? "amber" : "blue"}
                selected={selected}
                onToggle={() => { if (!a.mandatory) toggleAccessory(a.title); }}
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
              content_name: "EK6 Electric Bike",
              content_ids: [bundle?.checkoutId ?? 1],
              content_type: "product",
              currency: "USD",
              value: price,
            });
            window.location.href = buildCheckoutUrl(protection);
          }}
        >Buy Now</BuyNowButton>
        </div>

        <Toggle enabled={protection} onToggle={() => setProtection((p) => !p)} />
      </div>
    </div>
  );
}
