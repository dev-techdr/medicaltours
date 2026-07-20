import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { DoctorCard } from "@/components/DoctorCard";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getAllSpecialtyHubs,
  getDoctorsBySpecialty,
  getHospitalBySlug,
  getSpecialtyHub,
} from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { physicianSchema } from "@/lib/schema";

type Props = { params: Promise<{ specialty: string }> };

export function generateStaticParams() {
  return getAllSpecialtyHubs().map((s) => ({ specialty: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { specialty: slug } = await params;
  const specialty = getSpecialtyHub(slug);
  if (!specialty) return {};
  return buildMetadata({
    title: `${specialty.name} Doctors in India for Foreign Patients`,
    description: `Find ${specialty.name.toLowerCase()} specialists at TechdrHealth partner hospitals for international medical tourists.`,
    path: `/doctors/${specialty.slug}`,
    keywords: [`${specialty.name.toLowerCase()} doctors india`, `best ${specialty.name.toLowerCase()} India`],
  });
}

export default async function DoctorsBySpecialtyPage({ params }: Props) {
  const { specialty: slug } = await params;
  const specialty = getSpecialtyHub(slug);
  if (!specialty) notFound();

  const doctors = getDoctorsBySpecialty(specialty.slug);
  if (!doctors.length) notFound();

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd
        data={doctors.map((d) =>
          physicianSchema({
            name: d.name,
            description: d.shortAnswer,
            url: `/doctors/${specialty.slug}`,
            specialty: d.specialty,
            hospitalName: getHospitalBySlug(d.hospitalSlug)?.name ?? d.city,
          })
        )}
      />
      <Breadcrumb
        items={[
          { name: "Doctors", href: "/doctors" },
          { name: specialty.name, href: `/doctors/${specialty.slug}` },
        ]}
      />

      <Reveal>
        <h1 className="font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl">
          {specialty.name} doctors in India
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Specialists experienced with international patients seeking {specialty.name.toLowerCase()}{" "}
          care through TechdrHealth’s hospital partners.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor, i) => (
          <Reveal key={doctor.slug} delay={(i % 3) * 60}>
            <DoctorCard doctor={doctor} />
          </Reveal>
        ))}
      </div>

      <div className="mt-14">
        <CTASection title={`Looking for a ${specialty.name.toLowerCase()} second opinion?`} />
      </div>
    </Container>
  );
}
