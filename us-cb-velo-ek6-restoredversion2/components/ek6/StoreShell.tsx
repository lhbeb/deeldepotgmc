import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function StoreShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-blue-600 selection:text-white">
      <SiteHeader />
      <main className="grow px-3 py-12 sm:px-6 sm:py-20 lg:px-8">{children}</main>
      <SiteFooter />
    </div>
  );
}
