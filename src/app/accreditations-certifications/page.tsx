import type { Metadata } from "next";
import Link from "next/link";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { TrustBadges } from "@/components/TrustBadges";
import { JsonLd } from "@/components/seo/JsonLd";
import { HOSPITAL_ACCREDITATIONS } from "@/lib/accreditations";
import { buildMetadata, webPageSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";

const pagePath = "/accreditations-certifications";
const pageTitle = "Hospital Accreditations — JCI, NABH & NABL Explained";
const pageDescription =
  "What JCI, NABH, and NABL accreditations mean for international patients choosing hospitals in India. How TechdrHealth selects accredited partner hospitals.";

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "jci accredited hospitals india",
    "nabh accredited hospitals india",
    "nabl accredited labs india medical tourism",
  ],
});

export default function AccreditationsPage() {
  return (
    <Container className="py-10 sm:py-14">
      <JsonLd data={webPageSchema({ name: pageTitle, description: pageDescription, url: pagePath })} />
      <Breadcrumb items={[{ name: "Accreditations", href: pagePath }]} />

      <Reveal>
        <p className="data-label">Quality standards</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight text-navy sm:text-5xl">
          JCI, NABH, and NABL — what the badges mean for your care
        </h1>
      </Reveal>

      <Reveal className="mt-8">
        <AnswerBlock label="Quick answer">
          JCI, NABH, and NABL are independent quality standards for hospitals and laboratories in
          India. TechdrHealth prioritizes partner hospitals with recognized accreditations so international
          patients can compare safety and quality — not just marketing claims.
        </AnswerBlock>
      </Reveal>

      <Reveal className="mt-10">
        <TrustBadges variant="grid" />
      </Reveal>

      <div className="mt-12 space-y-6">
        {HOSPITAL_ACCREDITATIONS.map((item, index) => (
          <Reveal
            key={item.acronym}
            delay={index * 60}
            className="rounded-[var(--radius)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8"
          >
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="rounded-[var(--radius-sm)] bg-accent-light px-3 py-1 font-mono text-sm font-semibold text-navy">
                {item.acronym}
              </span>
              <h2 className="font-display text-2xl font-medium tracking-tight text-navy">
                {item.name}
              </h2>
            </div>
            <p className="mt-1 text-sm text-muted">Issued by {item.issuer}</p>
            <p className="mt-4 text-base leading-relaxed text-ink">{item.summary}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              <strong className="text-navy">Why it matters:</strong> {item.whyItMatters}
            </p>
            <p className="mt-4">
              <a
                href={item.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-accent hover:underline"
              >
                Verify on {item.acronym} official site →
              </a>
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 rounded-[var(--radius)] bg-navy p-6 text-white sm:p-8">
        <h2 className="font-display text-2xl font-medium tracking-tight text-white">
          How TechdrHealth uses accreditations
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75">
          Accreditation is one filter — not the only one. We also match hospitals by specialty depth,
          doctor experience, international patient volume, and package transparency. Our{" "}
          {SITE.hospitalCount} hospital network includes JCI and NABH institutions across major Indian
          cities.
        </p>
        <p className="mt-4 text-sm text-white/65">
          See partner hospitals on the{" "}
          <Link href="/hospital-network" className="font-semibold text-accent-light hover:underline">
            hospital network
          </Link>{" "}
          page or read{" "}
          <Link href="/reviews" className="font-semibold text-accent-light hover:underline">
            patient reviews
          </Link>
          .
        </p>
      </Reveal>

      <Reveal className="mt-12">
        <CTASection
          title="Want hospitals matched to your case?"
          description="Share your diagnosis — we shortlist accredited hospitals with the right specialty depth and transparent packages."
        />
      </Reveal>
    </Container>
  );
}
