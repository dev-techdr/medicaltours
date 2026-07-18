import type { Metadata } from "next";
import { IndiaFooter } from "@/components/india/IndiaFooter";
import { IndiaHeader } from "@/components/india/IndiaHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Surgery in Hyderabad for Indian Patients",
  description:
    "Affordable surgery and treatment in Hyderabad for Indian patients. Aarogyasri, Ayushman Bharat, EMI options, and end-to-end coordination from across India.",
  path: "/india/hyderabad",
  keywords: [
    "surgery hyderabad indian patients",
    "aarogyasri hospitals hyderabad",
    "ayushman bharat hyderabad",
    "low cost surgery hyderabad",
  ],
});

export default function IndiaDomesticLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <IndiaHeader />
      <main className="min-w-0 flex-1">{children}</main>
      <IndiaFooter />
    </div>
  );
}
