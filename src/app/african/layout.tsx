import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { buildMetadata, absoluteUrl } from "@/lib/seo";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-african-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-african-body",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-african-mono",
  display: "swap",
});

const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-PFZ54LNZ";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Medical Treatment in India for African Patients | Free Consult | Medical Tours India",
    description:
      "Affordable surgery & treatment in India for patients from Nigeria, Kenya, Ghana, Ethiopia and all of Africa. Free teleconsultation, visa assistance and full travel support.",
    path: "/african",
    noIndex: true,
    keywords: [
      "medical treatment in india for african patients",
      "medical tourism india africa",
      "india treatment cost for nigeria",
      "medical visa india africa",
    ],
  }),
  openGraph: {
    title: "Medical Treatment in India for African Patients | Free Consult | Medical Tours India",
    description:
      "Affordable surgery & treatment in India for patients from Nigeria, Kenya, Ghana, Ethiopia and all of Africa. Free teleconsultation, visa assistance and full travel support.",
    url: absoluteUrl("/african"),
    siteName: "Medical Tours India",
    type: "website",
  },
};

export default function AfricanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${fraunces.variable} ${plusJakartaSans.variable} ${ibmPlexMono.variable} min-h-screen`}
    >
      <Script id="gtm-african" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      {children}
    </div>
  );
}
