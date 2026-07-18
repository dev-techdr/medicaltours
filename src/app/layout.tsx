import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import { AppChrome } from "@/components/AppChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-Y26C8Z0VJQ";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${SITE.name} | Medical Tourism India for International Patients`,
    description: SITE.description,
    path: "/",
    keywords: [
      "medical tourism india",
      "medical tourism in india",
      "best medical tourism company in india",
      "medical treatment in india for foreigners",
      "international patient services india",
    ],
  }),
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${fraunces.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <JsonLd data={organizationSchema()} />
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
