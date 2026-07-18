import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { DoctorCard } from "@/components/DoctorCard";
import { Reveal } from "@/components/Reveal";
import { getAllDoctors, getAllSpecialtyHubs } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Doctors in India for Medical Tourism",
  description:
    "Browse specialists by specialty — cardiology, orthopedics, oncology, fertility, neurosurgery, and transplant — across Techdr partner hospitals.",
  path: "/doctors",
  keywords: ["best doctors in india for foreigners", "specialist doctors india medical tourism"],
});

export default function DoctorsHubPage() {
  const specialties = getAllSpecialtyHubs();
  const doctors = getAllDoctors();

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumb items={[{ name: "Doctors", href: "/doctors" }]} />
      <Reveal>
        <h1 className="font-display text-4xl font-medium tracking-tight text-navy">
          Specialists by specialty
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Meet doctors coordinating international patient care across our hospital network.
        </p>
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-3">
        {specialties.map((specialty) => (
          <Link
            key={specialty.slug}
            href={`/doctors/${specialty.slug}`}
            className="rounded-[var(--radius-sm)] border border-line bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-accent hover:text-accent"
          >
            {specialty.name}
          </Link>
        ))}
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor, i) => (
          <Reveal key={doctor.slug} delay={(i % 3) * 60}>
            <DoctorCard doctor={doctor} />
          </Reveal>
        ))}
      </div>

      <div className="mt-14">
        <CTASection />
      </div>
    </Container>
  );
}
