/** Shared layout for policy pages — matches storefront legal typography (prose + uppercase headings). */

export function LegalPage({
  title,
  children,
  lastUpdated = "March 2026",
}: {
  title: string;
  children: React.ReactNode;
  lastUpdated?: string;
}) {
  return (
    <div className="prose prose-zinc mx-auto max-w-4xl">
      <h1 className="not-prose mb-6 text-4xl font-black tracking-tight text-black uppercase sm:mb-8">{title}</h1>
      <div className="not-prose space-y-6 font-medium leading-relaxed text-zinc-600 sm:space-y-8 [&_strong]:font-bold [&_strong]:text-zinc-900 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        <p>Last updated: {lastUpdated}</p>
        {children}
      </div>
    </div>
  );
}

export function LegalH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-xl font-bold tracking-wide text-black uppercase">{children}</h2>
  );
}

export function LegalH3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-6 mb-2 text-lg font-bold text-black">{children}</h3>;
}

/** Three-column policy table — matches storefront legal table styling. */
export function PolicyTable({
  headers,
  rows,
}: {
  headers: [string, string, string];
  rows: [string, string, string][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="border-b border-zinc-200">
          <tr className="text-left text-black uppercase">
            <th className="py-2 pr-4">{headers[0]}</th>
            <th className="py-2 px-4">{headers[1]}</th>
            <th className="py-2 pl-4">{headers[2]}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {rows.map((row, i) => (
            <tr key={i}>
              <td className="py-3 pr-4">{row[0]}</td>
              <td className="py-3 px-4">{row[1]}</td>
              <td className="py-3 pl-4">{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
