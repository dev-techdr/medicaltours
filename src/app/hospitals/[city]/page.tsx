import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { HospitalCard } from "@/components/HospitalCard";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getAllCityHubs,
  getCityHub,
  getHospitalsByCity,
} from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { hospitalSchema } from "@/lib/schema";

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return getAllCityHubs().map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityHub(slug);
  if (!city) return {};
  return buildMetadata({
    title: `Hospitals in ${city.name} for International Patients`,
    description: `Partner hospitals in ${city.name} for medical tourists — accreditation, specialties, and TechdrHealth coordination support.`,
    path: `/hospitals/${city.slug}`,
    keywords: [`hospitals in ${city.name.toLowerCase()}`, `medical tourism ${city.name.toLowerCase()}`],
  });
}

export default async function HospitalsByCityPage({ params }: Props) {
  const { city: slug } = await params;
  const city = getCityHub(slug);
  if (!city) notFound();

  const hospitals = getHospitalsByCity(city.slug);
  if (!hospitals.length) notFound();

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd
        data={hospitals.map((h) =>
          hospitalSchema({
            name: h.name,
            description: h.shortAnswer,
            url: `/hospitals/${city.slug}`,
            city: h.city,
            rating: h.rating,
            reviewCount: h.reviewCount,
            accreditation: h.accreditation,
          })
        )}
      />
      <Breadcrumb
        items={[
          { name: "Hospitals", href: "/hospitals" },
          { name: city.name, href: `/hospitals/${city.slug}` },
        ]}
      />

      <Reveal>
        <h1 className="font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl">
          Hospitals in {city.name}
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          TechdrHealth-coordinated hospitals in {city.name} for international patients seeking surgery,
          oncology, transplant, and specialty care.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {hospitals.map((hospital, i) => (
          <Reveal key={hospital.slug} delay={(i % 2) * 60}>
            <HospitalCard hospital={hospital} />
          </Reveal>
        ))}
      </div>

      <div className="mt-14">
        <CTASection title={`Need a hospital match in ${city.name}?`} />
      </div>
    </Container>
  );
}
