import Image from "next/image";
import { geometryImage, geometryMeasurements } from "@/lib/ek6-data";

export function GeometrySection() {
  return (
    <section id="geometry-section" className="w-full py-12 md:py-16" aria-labelledby="geometry-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-16 md:flex-row md:items-center">
          <div className="relative aspect-video w-full min-w-0 overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm md:flex-1">
            <Image
              src={geometryImage}
              alt="Product Geometry"
              fill
              className="object-contain p-4 md:p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <ul className="grid w-full min-w-0 grid-cols-1 gap-8 sm:grid-cols-2 md:flex-1 lg:grid-cols-2">
            {geometryMeasurements.map((line) => (
              <li
                key={line}
                className="flex items-center gap-4 rounded-2xl border border-transparent bg-zinc-50/50 p-3 text-base font-bold text-zinc-600 transition-all hover:border-zinc-200 md:text-base"
              >
                <div className="h-3 w-3 shrink-0 rounded-full bg-blue-500" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
