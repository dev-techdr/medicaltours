import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { MdxContent } from "@/components/MdxContent";
import { getAllCitySlugs, getCityBySlug } from "@/data/cities";
import { getHospitalsByCity } from "@/data/hospitals";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ "city-slug": string }> };

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ "city-slug": slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { "city-slug": slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return buildMetadata({
    title: `Medical Tourism in ${city.name}, India`,
    description: city.shortAnswer,
    path: `/cities/${city.slug}`,
    keywords: [city.primaryKeyword, `medical tourism ${city.name.toLowerCase()}`],
  });
}

export default async function CityPage({ params }: Props) {
  const { "city-slug": slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const cityHospitals = getHospitalsByCity(city.slug);

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumb
        items={[{ name: city.name, href: `/cities/${city.slug}` }]}
      />
      <h1 className="font-display text-4xl font-medium tracking-tight text-navy">
        Medical Tourism in {city.name}
      </h1>
      <div className="mt-6">
        <AnswerBlock>{city.shortAnswer}</AnswerBlock>
      </div>
      <div className="mt-8">
        <MdxContent source={city.content} />
      </div>

      <ul className="divider-grid mt-8 sm:grid-cols-2">
        {city.highlights.map((h) => (
          <li key={h}>
            <p className="text-sm text-ink">{h}</p>
          </li>
        ))}
      </ul>

      <section className="mt-12">
        <p className="data-label">Hospitals</p>
        <h2 className="mt-1 font-display text-2xl font-medium text-navy">Hospitals in {city.name}</h2>
        <div className="divider-grid mt-4 sm:grid-cols-2">
          {cityHospitals.map((h) => (
            <Link
              key={h.slug}
              href={`/hospital-network/${h.slug}`}
              className="divider-grid-item block"
            >
              <p className="font-medium text-navy">{h.name}</p>
            </Link>
          ))}
        </div>
        <Link
          href={`/hospital-network/${city.slug}`}
          className="mt-4 inline-block text-sm font-medium text-accent"
        >
          Full {city.name} hospital network →
        </Link>
      </section>

      <div className="mt-12">
        <CTASection />
      </div>
    </Container>
  );
}
