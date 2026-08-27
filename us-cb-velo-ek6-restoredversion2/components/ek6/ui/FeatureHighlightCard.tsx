import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export type FeatureHighlightCardProps = {
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
};

/** Image + title + copy — used in comfort carousel and similar rows. */
export function FeatureHighlightCard({
  title,
  body,
  imageSrc,
  imageAlt,
  className,
}: FeatureHighlightCardProps) {
  return (
    <div className={cn("group min-w-[85vw] snap-center sm:min-w-[45vw] lg:min-w-[30vw]", className)}>
      <div className="relative mb-6 aspect-square overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50 md:aspect-[4/3]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw"
        />
      </div>
      <h3 className="mb-3 text-xl font-black text-black md:text-2xl">{title}</h3>
      <p className="text-sm font-medium leading-relaxed text-zinc-500 md:text-base">{body}</p>
    </div>
  );
}
