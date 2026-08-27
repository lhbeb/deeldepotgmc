import { SPEC_HIGHLIGHT_INNER_HTML } from "@/lib/spec-inner";

export function SpecHighlightGrid() {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4"
      dangerouslySetInnerHTML={{ __html: SPEC_HIGHLIGHT_INNER_HTML }}
    />
  );
}
