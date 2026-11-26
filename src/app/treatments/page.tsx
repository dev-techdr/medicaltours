import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import {
  getAllCategories,
  getAllProcedures,
  getProceduresByCategory,
  procedurePath,
} from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Medical Treatments in India for Foreigners",
  description:
    "Explore medical treatment categories in India — cardiac, orthopedics, cancer, IVF, neurosurgery, and more — with transparent USD cost ranges.",
  path: "/treatments",
  keywords: ["india medical tourism packages", "medical treatment in india for foreigners"],
});

export default function TreatmentsHubPage() {
  const categories = getAllCategories();
  const procedures = getAllProcedures();

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumb items={[{ name: "Treatments", href: "/treatments" }]} />
      <Reveal>
        <h1 className="font-display text-4xl font-medium tracking-tight text-navy">
          Medical Treatments in India
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
          One template powers every procedure page. Browse by specialty category, compare India costs,
          and request a free package estimate.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, i) => {
          const count = getProceduresByCategory(category.slug).length;
          return (
            <Reveal key={category.slug} delay={(i % 3) * 60}>
              <Link
                href={`/treatments/${category.slug}`}
                className="group block overflow-hidden rounded-[var(--radius)] border border-line bg-white shadow-[var(--shadow-soft)]"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={category.heroImage}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-navy group-hover:text-accent">
                    {category.name}
                  </h2>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{category.description}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">
                    {count} procedure{count === 1 ? "" : "s"} live
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      {procedures.length > 0 ? (
        <section className="mt-16">
          <Reveal>
            <h2 className="font-display text-2xl font-medium text-navy">Featured procedures</h2>
          </Reveal>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {procedures.map((p) => (
              <li key={p.slug}>
                <Link
                  href={procedurePath(p)}
                  className="block rounded-[var(--radius-sm)] border border-line bg-white px-4 py-3 hover:border-accent"
                >
                  <span className="font-semibold text-navy">{p.name}</span>
                  <span className="mt-1 block text-sm text-muted">
                    {p.costIndia
                      ? `$${p.costIndia.min.toLocaleString()}–$${p.costIndia.max.toLocaleString()} USD`
                      : "Confidential clinical care"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-14">
        <CTASection />
      </div>
    </Container>
  );
}
