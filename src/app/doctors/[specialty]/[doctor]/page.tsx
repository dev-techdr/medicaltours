import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { MdxContent } from "@/components/MdxContent";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getDoctorBySlug as getMdxDoctorBySlug,
  getAllDoctorSlugs as getAllMdxDoctorSlugs,
} from "@/data/doctors";
import {
  doctorPath,
  getAllDoctors,
  getDoctorBySlug,
  getHospitalBySlug,
  getSpecialtyHub,
  procedurePath,
  getAllProcedures,
} from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { physicianSchema, breadcrumbSchema } from "@/lib/schema";

type Props = {
  params: Promise<{ specialty: string; doctor: string }>;
};

export function generateStaticParams() {
  const fromJson = getAllDoctors().map((d) => ({
    specialty: d.specialtySlug,
    doctor: d.slug,
  }));
  const jsonSlugs = new Set(fromJson.map((d) => d.doctor));
  // Ensure MDX-only profiles still get routes if specialty can be inferred from JSON later
  for (const slug of getAllMdxDoctorSlugs()) {
    if (jsonSlugs.has(slug)) continue;
  }
  return fromJson;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { specialty, doctor: doctorSlug } = await params;
  const doctor = getDoctorBySlug(doctorSlug);
  if (!doctor || doctor.specialtySlug !== specialty) return {};

  return buildMetadata({
    title: `${doctor.name} — ${doctor.specialty} in ${doctor.city}`,
    description: doctor.shortAnswer,
    path: doctorPath(doctor),
    keywords: [
      doctor.name.toLowerCase(),
      `best ${doctor.specialty.toLowerCase()} doctor india`,
      `${doctor.specialty.toLowerCase()} specialist ${doctor.city.toLowerCase()}`,
      "doctors in india for foreigners",
    ],
  });
}

export default async function DoctorProfilePage({ params }: Props) {
  const { specialty, doctor: doctorSlug } = await params;
  const doctor = getDoctorBySlug(doctorSlug);
  if (!doctor || doctor.specialtySlug !== specialty) notFound();

  const specialtyHub = getSpecialtyHub(specialty);
  const hospital = getHospitalBySlug(doctor.hospitalSlug);
  const mdx = getMdxDoctorBySlug(doctorSlug);
  const path = doctorPath(doctor);

  const relatedProcedures = getAllProcedures()
    .filter((p) => p.doctorSlugs?.includes(doctor.slug))
    .slice(0, 6);

  const crumbs = [
    { name: "Doctors", href: "/doctors" },
    {
      name: specialtyHub?.name ?? doctor.specialty,
      href: `/doctors/${specialty}`,
    },
    { name: doctor.name, href: path },
  ];

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          physicianSchema({
            name: doctor.name,
            description: doctor.shortAnswer,
            url: path,
            specialty: doctor.specialty,
            hospitalName: hospital?.name ?? doctor.city,
          }),
        ]}
      />
      <Breadcrumb items={crumbs} />

      <Reveal>
        <p className="data-label">{doctor.specialty}</p>
        <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl">
          {doctor.name}
        </h1>
        <p className="mt-3 text-base text-muted">
          {doctor.experienceYears}+ years · {doctor.city}
          {hospital ? ` · ${hospital.name}` : ""}
        </p>
      </Reveal>

      <Reveal className="mt-8">
        <AnswerBlock label="At a glance">{doctor.shortAnswer}</AnswerBlock>
      </Reveal>

      {mdx?.content ? (
        <article className="prose-country mt-10">
          <MdxContent source={mdx.content} />
        </article>
      ) : (
        <Reveal className="mt-10 max-w-3xl space-y-4 text-base leading-relaxed text-muted">
          <p>
            {doctor.name} works with TechdrHealth to support international patients seeking{" "}
            {doctor.specialty.toLowerCase()} care in {doctor.city}. Coordination covers remote
            report review, hospital matching, and treatment planning before you travel.
          </p>
          <p>
            Clinical decisions remain with the treating specialist and hospital team after
            evaluation. Request a free second opinion to see whether this pathway fits your case.
          </p>
        </Reveal>
      )}

      {relatedProcedures.length > 0 ? (
        <section className="mt-12" aria-labelledby="related-procedures">
          <h2
            id="related-procedures"
            className="font-display text-2xl font-medium tracking-tight text-navy"
          >
            Related treatments
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {relatedProcedures.map((p) => (
              <li key={p.slug}>
                <Link
                  href={procedurePath(p)}
                  className="inline-block rounded-[var(--radius-sm)] border border-line bg-white px-3 py-1.5 text-sm font-semibold text-accent hover:border-accent"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-10 text-sm text-muted">
        <Link href={`/doctors/${specialty}`} className="font-semibold text-accent hover:underline">
          ← More {doctor.specialty.toLowerCase()} doctors
        </Link>
        {hospital ? (
          <>
            {" · "}
            <Link
              href={`/hospital-network/${hospital.slug}`}
              className="font-semibold text-accent hover:underline"
            >
              {hospital.name}
            </Link>
          </>
        ) : null}
      </p>

      <div className="mt-14">
        <CTASection
          title={`Request a consult pathway with ${doctor.name}`}
          description="Share your reports for a coordinated second opinion and hospital options — usually within 24–48 hours."
        />
      </div>
    </Container>
  );
}
