import type { Metadata } from "next";
import { IndiaFooter } from "@/components/india/IndiaFooter";
import { IndiaHeader } from "@/components/india/IndiaHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "హైదరాబాద్‌లో శస్త్రచికిత్స — భారతీయ రోగులకు",
  description:
    "తెలుగు రాష్ట్రాల నుండి హైదరాబాద్‌లో అర్థవంతమైన శస్త్రచికిత్స. ఆరోగ్యశ్రీ, ఆయుష్మాన్ భారత్ మరియు EMI ఎంపికలు.",
  path: "/te/hyderabad",
  keywords: [
    "హైదరాబాద్ శస్త్రచికిత్స",
    "ఆరోగ్యశ్రీ ఆసుపత్రులు హైదరాబాద్",
    "ఆయుష్మాన్ భారత్ హైదరాబాద్",
  ],
});

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
