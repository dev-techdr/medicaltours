import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { HospitalNetworkDirectory } from "@/components/HospitalNetworkDirectory";
import { MediaImage } from "@/components/MediaImage";
import { Reveal } from "@/components/Reveal";
import { TrustBadges } from "@/components/TrustBadges";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHospitalSummaries } from "@/data/hospitals";
import { MEDIA } from "@/lib/media";
import { buildMetadata, hospitalItemListSchema, hospitalSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "200+ MOU Hospital Partners Across India",
  description:
    "Techdr Medical Tourism partners directly with 200+ JCI and NABH accredited hospitals across India — no middleman markup. Browse by city, specialty, and accreditation.",
  path: "/hospital-network",
  keywords: [
    "medical tourism company with hospital tie ups india",
    "JCI accredited hospitals in india",
    "NABH accredited hospitals india list",
  ],
});

export default function HospitalNetworkPage() {
  const hospitals = getHospitalSummaries();

  const schemaHospitals = hospitals.map((h) => ({
    name: h.name,
    description: `${h.name} in ${h.city} — Techdr MOU partner hospital for international patients.`,
    url: `/hospital-network/${h.slug}`,
    city: h.city,
    rating: h.rating,
    reviewCount: h.reviewCount,
    accreditation: h.accreditation,
  }));

  return (
    <>
      <JsonLd data={hospitalItemListSchema(schemaHospitals)} />
      <JsonLd data={schemaHospitals.map((h) => hospitalSchema(h))} />

      <section className="relative min-h-[420px] overflow-hidden border-b border-line sm:min-h-[480px]">
        <div className="absolute inset-0">
          <MediaImage
            src={MEDIA.hospitalLobby}
            alt="Partner hospital network for international patients in India"
            fillParent
            priority
            kenBurns
            zoomOnHover={false}
            overlay="navy"
            sizes="100vw"
            className="!rounded-none"
          />
        </div>
        <Container className="relative z-10 py-14 sm:py-20">
          <div className="hero-enter max-w-3xl text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
            <p className="text-sm font-semibold text-white/95">Trusted hospital partners</p>
            <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
              {SITE.hospitalCount} hospital partners across India
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/90 sm:text-lg">
              Direct partnerships with accredited hospitals mean transparent packages and support you
              can feel on the ground. We coordinate admissions across JCI and NABH centers in
              Hyderabad, Delhi NCR, Chennai, Mumbai, Bangalore, and beyond. Featured hospital
              profiles with photos are listed below — the full {SITE.hospitalCount} network is
              matched to your case after medical review.
            </p>
            <div className="mt-10">
              <TrustBadges />
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-10 sm:py-14">
        <Breadcrumb items={[{ name: "Hospital Network", href: "/hospital-network" }]} />

        <Reveal>
          <HospitalNetworkDirectory hospitals={hospitals} />
        </Reveal>

        <Reveal className="mt-14">
          <CTASection
            title="Need help choosing the right hospital?"
            description="Share your reports on WhatsApp. We shortlist partner hospitals by specialty, city, and budget — with written estimates, not pressure."
          />
        </Reveal>
      </Container>
    </>
  );
}
