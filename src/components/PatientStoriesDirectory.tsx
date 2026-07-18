"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TestimonialCard } from "@/components/TestimonialCard";
import type { ContentCountry, Procedure, Testimonial } from "@/lib/data";

export type StoryCardData = {
  testimonial: Testimonial;
  procedureHref: string | null;
  procedureName: string | null;
};

type PatientStoriesDirectoryProps = {
  stories: StoryCardData[];
  countries: ContentCountry[];
  treatments: Pick<Procedure, "slug" | "name">[];
};

export function PatientStoriesDirectory({
  stories,
  countries,
  treatments,
}: PatientStoriesDirectoryProps) {
  const [country, setCountry] = useState("all");
  const [treatment, setTreatment] = useState("all");

  const filtered = useMemo(() => {
    return stories.filter(({ testimonial }) => {
      if (country !== "all" && testimonial.countrySlug !== country) return false;
      if (treatment !== "all" && testimonial.procedureSlug !== treatment) return false;
      return true;
    });
  }, [stories, country, treatment]);

  const hasFilters = country !== "all" || treatment !== "all";

  return (
    <div>
      <div className="rounded-[var(--radius)] border border-line bg-white p-4 shadow-[var(--shadow-soft)] sm:p-5">
        <p className="data-label">Filter stories</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs text-muted">Country</span>
            <select
              className="form-field"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              aria-label="Filter by country"
            >
              <option value="all">All countries</option>
              {countries.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs text-muted">Treatment</span>
            <select
              className="form-field"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              aria-label="Filter by treatment"
            >
              <option value="all">All treatments</option>
              {treatments.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-muted">
            Showing {filtered.length} of {stories.length} patient stories
          </p>
          {hasFilters ? (
            <button
              type="button"
              className="text-sm font-semibold text-accent hover:underline"
              onClick={() => {
                setCountry("all");
                setTreatment("all");
              }}
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="self-center text-xs font-semibold uppercase tracking-wide text-muted">
          By country
        </span>
        {countries.map((c) => (
          <Link
            key={c.slug}
            href={`/patient-stories/${c.slug}`}
            className="rounded-[var(--radius-sm)] border border-line bg-white px-3 py-1.5 text-sm font-semibold text-navy hover:border-accent hover:text-accent"
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="self-center text-xs font-semibold uppercase tracking-wide text-muted">
          By treatment
        </span>
        {treatments.map((t) => (
          <Link
            key={t.slug}
            href={`/patient-stories/treatment/${t.slug}`}
            className="rounded-[var(--radius-sm)] border border-line bg-white px-3 py-1.5 text-sm font-semibold text-navy hover:border-accent hover:text-accent"
          >
            {t.name}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-[var(--radius)] border border-dashed border-line bg-white p-8 text-center text-muted">
          No stories match these filters. Clear a filter or{" "}
          <Link href="/get-free-quote" className="font-semibold text-accent hover:underline">
            request a quote
          </Link>{" "}
          for your country and treatment.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map(({ testimonial, procedureHref, procedureName }, i) => (
            <div key={testimonial.slug} style={{ animationDelay: `${(i % 2) * 70}ms` }}>
              <TestimonialCard testimonial={testimonial} />
              {procedureHref && procedureName ? (
                <Link
                  href={procedureHref}
                  className="mt-3 inline-block text-sm font-semibold text-accent hover:underline"
                >
                  About {procedureName} →
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
