import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import { AppChrome } from "@/components/AppChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-Y26C8Z0VJQ";
const META_PIXEL_ID = "274251915068218";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  adjustFontFallback: true,
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  adjustFontFallback: true,
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: "/favicon.png",
  },
  other: {
    "dmca-site-verification":
      "aWs0cEgwL1duUmw2Tk11RnNPcWllQ3hmZHJFZlhDZnl3bUVJQ1IzdTN6MD01",
  },
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
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <JsonLd data={organizationSchema()} />
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
