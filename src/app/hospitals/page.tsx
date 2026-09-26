import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { HospitalCard } from "@/components/HospitalCard";
import { Reveal } from "@/components/Reveal";
import { getAllCityHubs, getAllHospitals } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Hospitals in India for Medical Tourism",
  description:
    "Browse TechdrHealth partner hospitals by city — Hyderabad, Delhi NCR, Mumbai, Chennai, and Bangalore — for international patients.",
  path: "/hospitals",
  keywords: ["hospitals in india for foreigners", "jci hospitals india medical tourism"],
});

export default function HospitalsHubPage() {
  const cities = getAllCityHubs();
  const hospitals = getAllHospitals();

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumb items={[{ name: "Hospitals", href: "/hospitals" }]} />
      <Reveal>
        <h1 className="font-display text-4xl font-medium tracking-tight text-navy">
          Partner hospitals by city
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Explore accredited hospitals TechdrHealth coordinates for international patients across India’s
          major medical hubs.
        </p>
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-3">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/hospitals/${city.slug}`}
            className="rounded-[var(--radius-sm)] border border-line bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-accent hover:text-accent"
          >
            {city.name}
          </Link>
        ))}
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hospitals.map((hospital, i) => (
          <Reveal key={hospital.slug} delay={(i % 3) * 60}>
            <HospitalCard hospital={hospital} />
          </Reveal>
        ))}
      </div>

      <div className="mt-14">
        <CTASection />
      </div>
    </Container>
  );
}
