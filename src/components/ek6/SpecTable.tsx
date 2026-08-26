import { SpecificationTable } from "./ui";
import { specRows } from "@/lib/ek6-data";

export function SpecTable() {
  return (
    <section id="spec-heading" className="scroll-mt-28 pb-12" aria-label="Product specification">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SpecificationTable rows={specRows} />
      </div>
    </section>
  );
}
