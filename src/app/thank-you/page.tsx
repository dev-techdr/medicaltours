import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Thank You | Enquiry Received",
  description:
    "Your medical tourism enquiry has been received. Our care team will respond within 24–48 hours.",
  path: "/thank-you",
  noIndex: true,
});

type Props = { searchParams: Promise<{ audience?: string }> };

export default async function ThankYouPage({ searchParams }: Props) {
  const { audience } = await searchParams;
  const western = audience === "western";

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-[var(--radius)] border border-line bg-white p-8 text-center shadow-[var(--shadow-soft)] sm:p-10">
        <p className="data-label justify-center">Thank you</p>
        <h1 className="mt-4 font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl">
          Your enquiry has been received
        </h1>
        {western ? (
          <>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Expect a written reply within 24–48 hours with hospital options, an indicative USD
              package range, and suggested stay length. We will contact you by email first unless
              you asked for phone or WhatsApp.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              To speed the review, email any reports you have to{" "}
              <a href={`mailto:${SITE.email}`} className="font-semibold text-accent hover:underline">
                {SITE.email}
              </a>{" "}
              — diagnosis summary, imaging reports, current medications, and home cash-pay or
              wait-list quotes if available.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`mailto:${SITE.email}`} className="btn btn-secondary">
                Email reports
              </a>
              <Link href="/free-second-opinion" className="btn btn-outline">
                Second opinion checklist
              </Link>
              <Link href="/for-usa-uk-canada-australia" className="btn btn-outline">
                Western patient guide
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Our care team will review your details and get back within 24–48 hours with hospital
              options and next steps.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Message on WhatsApp
              </a>
              <Link href="/" className="btn btn-outline">
                Back to homepage
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
