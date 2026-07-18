"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MediaImage } from "@/components/MediaImage";
import { VerifiedPartnerBadge } from "@/components/VerifiedPartnerBadge";
import { hospitalImage } from "@/lib/media";
import type { HospitalSummary } from "@/lib/types";

type HospitalNetworkDirectoryProps = {
  hospitals: HospitalSummary[];
};

export function HospitalNetworkDirectory({ hospitals }: HospitalNetworkDirectoryProps) {
  const cities = useMemo(
    () => [...new Set(hospitals.map((h) => h.city))].sort(),
    [hospitals]
  );
  const specialties = useMemo(
    () => [...new Set(hospitals.flatMap((h) => h.specialties))].sort(),
    [hospitals]
  );
  const accreditations = useMemo(
    () => [...new Set(hospitals.flatMap((h) => h.accreditation))].sort(),
    [hospitals]
  );

  const [city, setCity] = useState("all");
  const [specialty, setSpecialty] = useState("all");
  const [accreditation, setAccreditation] = useState("all");
  const [sort, setSort] = useState<"name" | "rating" | "city">("name");

  const filtered = useMemo(() => {
    let list = hospitals.filter((h) => {
      if (city !== "all" && h.city !== city) return false;
      if (specialty !== "all" && !h.specialties.includes(specialty)) return false;
      if (accreditation !== "all" && !h.accreditation.includes(accreditation)) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "city") return a.city.localeCompare(b.city) || a.name.localeCompare(b.name);
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [hospitals, city, specialty, accreditation, sort]);

  return (
    <div>
      <div className="rounded-[var(--radius)] border border-line bg-white p-4 shadow-[var(--shadow-soft)] sm:p-5">
        <p className="data-label">Find a hospital</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className="mb-1.5 block text-xs text-muted">City</span>
            <select
              className="form-field"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="all">All cities</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs text-muted">Specialty</span>
            <select
              className="form-field"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <option value="all">All specialties</option>
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs text-muted">Accreditation</span>
            <select
              className="form-field"
              value={accreditation}
              onChange={(e) => setAccreditation(e.target.value)}
            >
              <option value="all">NABH / JCI / all</option>
              {accreditations.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs text-muted">Sort by</span>
            <select
              className="form-field"
              value={sort}
              onChange={(e) => setSort(e.target.value as "name" | "rating" | "city")}
            >
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="city">City</option>
            </select>
          </label>
        </div>
        <p className="mt-3 text-sm text-muted">
          Showing {filtered.length} of {hospitals.length} partner hospitals
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {filtered.map((h) => (
          <div
            key={h.slug}
            className="group lift-card grid overflow-hidden border border-line bg-white sm:grid-cols-[140px_1fr]"
          >
            <MediaImage
              src={hospitalImage(h.slug)}
              alt={`${h.name} partner hospital`}
              aspect="aspect-[4/3] sm:aspect-auto sm:h-full sm:min-h-[160px]"
              className="rounded-none"
              sizes="(max-width: 640px) 100vw, 140px"
            />
            <div className="flex flex-col gap-3 p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="data-label">{h.city}</p>
                <VerifiedPartnerBadge mouYear={h.mouYear} />
              </div>
              <h3 className="text-base font-semibold text-navy">{h.name}</h3>
              <div className="flex flex-wrap gap-1.5">
                {h.accreditation.map((a) => (
                  <span
                    key={a}
                    className="rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-semibold text-accent"
                  >
                    {a}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {h.specialties.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line px-2.5 py-0.5 text-xs font-medium text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted">
                ★ {h.rating} · {h.reviewCount.toLocaleString()} reviews
              </p>
              <Link
                href={`/hospital-network/${h.slug}`}
                className="text-sm font-semibold text-accent transition-colors duration-150 hover:text-navy"
              >
                View details →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 rounded-[var(--radius)] border border-line bg-white p-6 text-sm text-muted shadow-[var(--shadow-soft)]">
          No partner hospitals match these filters. Clear a filter or contact us for a custom
          shortlist.
        </p>
      )}
    </div>
  );
}
