import { IndiaFooter } from "@/components/india/IndiaFooter";
import { IndiaHeader } from "@/components/india/IndiaHeader";

export default function TeluguDomesticLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col" lang="te">
      <IndiaHeader />
      <main className="min-w-0 flex-1">{children}</main>
      <IndiaFooter />
    </div>
  );
}
