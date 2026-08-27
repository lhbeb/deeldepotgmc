import { FeatureHighlightCard } from "./ui";
import { comfortFeatures } from "@/lib/ek6-data";

/** Horizontal snap carousel — “Built Around Your Comfort & Convenience”. */
export function ComfortFeatures() {
  return (
    <section id="comfort-section" className="overflow-hidden bg-black/[0.02] py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-4xl leading-tight font-bold tracking-tighter text-black md:mb-10 md:text-3xl lg:text-4xl">
          Built Around Your <br className="md:hidden" />
          <span className="text-blue-600">Comfort &amp; Convenience</span>
        </h2>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-12 md:gap-10">
          {comfortFeatures.map((f) => (
            <FeatureHighlightCard
              key={f.title}
              title={f.title}
              body={f.body}
              imageSrc={f.image}
              imageAlt={f.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
