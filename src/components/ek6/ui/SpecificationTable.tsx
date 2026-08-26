import { cn } from "@/lib/utils/cn";

export type SpecRow = {
  label: string;
  value: string;
};

export type SpecificationTableProps = {
  rows: SpecRow[];
  className?: string;
};

/** Two-column responsive spec grid — label / value rows with hover. */
export function SpecificationTable({ rows, className }: SpecificationTableProps) {
  return (
    <div
      className={cn(
        "mx-auto grid w-full max-w-6xl grid-cols-1 gap-x-20 gap-y-0 md:grid-cols-2",
        className,
      )}
    >
      {rows.map((row, i) => (
        <div
          key={`${row.label}-${i}`}
          className="group flex items-baseline justify-between border-b border-zinc-100 px-4 py-6 transition-colors hover:bg-zinc-50/50"
        >
          <span className="text-base font-bold text-black md:text-lg">{row.label}</span>
          <span className="ml-4 shrink-0 text-right text-base font-medium text-zinc-500 md:text-lg">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}
