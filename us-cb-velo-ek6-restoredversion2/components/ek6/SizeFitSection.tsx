import Image from "next/image";
import { sizeFitImages } from "@/lib/ek6-data";

export function SizeFitSection() {
  return (
    <section id="size-fit-section" className="w-full py-12 md:py-16" aria-labelledby="size-fit-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 md:flex-row">
          {sizeFitImages.map((img) => (
            <div
              key={img.src}
              className="relative aspect-video w-full min-w-0 flex-1 overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm md:aspect-[21/9]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-contain p-4 md:p-0"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
