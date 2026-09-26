import Image from "next/image";
import Link from "next/link";
import { StarRating } from "@/components/StarRating";
import type { ContentHospital } from "@/lib/data";

type HospitalCardProps = {
  hospital: ContentHospital;
};

export function HospitalCard({ hospital }: HospitalCardProps) {
  const href = `/hospital-network/${hospital.slug}`;

  return (
    <article className="overflow-hidden rounded-[var(--radius)] border border-line bg-white shadow-[var(--shadow-soft)]">
      <Link href={href} className="relative block aspect-[16/10] bg-neutral">
        <Image
          src={hospital.image}
          alt={hospital.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </Link>
      <div className="p-4">
        <p className="data-label">{hospital.city}</p>
        <h3 className="mt-1 text-base font-semibold text-navy">
          <Link href={href} className="hover:text-accent">
            {hospital.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted">{hospital.accreditation.join(" · ")}</p>
        <div className="mt-1.5">
          <StarRating rating={hospital.rating} count={hospital.reviewCount} size="sm" />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
          {hospital.shortAnswer}
        </p>
        <Link
          href={href}
          className="mt-3 inline-block text-sm font-semibold text-accent hover:underline"
        >
          View hospital →
        </Link>
      </div>
    </article>
  );
}
