import Image from "next/image";
import Link from "next/link";
import type { ContentHospital } from "@/lib/data";

type HospitalCardProps = {
  hospital: ContentHospital;
};

export function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <article className="overflow-hidden rounded-[var(--radius)] border border-line bg-white shadow-[var(--shadow-soft)]">
      <div className="relative aspect-[16/10] bg-neutral">
        <Image
          src={hospital.image}
          alt={hospital.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>
      <div className="p-4">
        <p className="data-label">{hospital.city}</p>
        <h3 className="mt-1 text-base font-semibold text-navy">{hospital.name}</h3>
        <p className="mt-1 text-sm text-muted">
          {hospital.accreditation.join(" · ")} · {hospital.rating.toFixed(1)} (
          {hospital.reviewCount.toLocaleString()} reviews)
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
          {hospital.shortAnswer}
        </p>
        <Link
          href={`/hospitals/${hospital.citySlug}`}
          className="mt-3 inline-block text-sm font-semibold text-accent hover:underline"
        >
          Hospitals in {hospital.city} →
        </Link>
      </div>
    </article>
  );
}
