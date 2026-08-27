import Image from "next/image";
import { rideChoices } from "@/lib/ek6-data";

export function RideChoice() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-2xl font-black text-zinc-900">Your Ride. Your Choice.</h2>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-4 md:pb-0">
          {rideChoices.map((img) => (
            <div
              key={img.src}
              className="min-w-[80vw] snap-center sm:min-w-[45vw] md:min-w-0"
            >
              <div className="group relative aspect-4/5 overflow-hidden rounded-xl bg-zinc-100 md:rounded-2xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 80vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
