import Image from "next/image";
import Link from "next/link";
import type { ContentDoctor } from "@/lib/data";
import { getHospitalBySlug } from "@/lib/data";

type DoctorCardProps = {
  doctor: ContentDoctor;
};

export function DoctorCard({ doctor }: DoctorCardProps) {
  const hospital = getHospitalBySlug(doctor.hospitalSlug);

  return (
    <article className="overflow-hidden rounded-[var(--radius)] border border-line bg-white shadow-[var(--shadow-soft)]">
      <div className="relative aspect-[4/3] bg-neutral">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>
      <div className="p-4">
        <p className="data-label">{doctor.specialty}</p>
        <h3 className="mt-1 text-base font-semibold text-navy">{doctor.name}</h3>
        <p className="mt-1 text-sm text-muted">
          {doctor.experienceYears}+ years · {doctor.city}
          {hospital ? ` · ${hospital.name}` : ""}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
          {doctor.shortAnswer}
        </p>
        <Link
          href={`/doctors/${doctor.specialtySlug}`}
          className="mt-3 inline-block text-sm font-semibold text-accent hover:underline"
        >
          More {doctor.specialty.toLowerCase()} doctors →
        </Link>
      </div>
    </article>
  );
}
