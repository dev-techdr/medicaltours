import type { Metadata } from "next";
import Link from "next/link";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { MediaImage } from "@/components/MediaImage";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllCountries } from "@/data/countries";
import { MEDIA } from "@/lib/media";
import { buildMetadata, countryItemListSchema, webPageSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Medical Tourism India by Country — Visa, Cost & Hospitals",
  description:
    "Nationality guides for medical treatment in India: Nigeria, Kenya, Bangladesh, UAE, Saudi Arabia, UK, USA, Nepal, Sri Lanka, Iran, Canada, Australia, and 30+ markets — visa help, local-currency costs, and hospital coordination.",
  path: "/countries",
  keywords: [
    "medical tourism india by country",
    "best hospital india for african patients",
    "medical tourism india for gulf patients",
    "medical tourism india for nepalis",
    "medical tourism india for foreigners",
    "medical visa india by nationality",
    "india medical treatment for international patients",
  ],
});

const JOURNEY_IMAGES = [
  MEDIA.visa,
  MEDIA.patient,
  MEDIA.careTeam,
  MEDIA.consultation,
  MEDIA.recovery,
  MEDIA.hospitalLobby,
  MEDIA.heroSecondary,
  MEDIA.surgery,
] as const;

export default function CountriesPage() {
  const countries = getAllCountries();

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd
        data={[
          webPageSchema({
            name: "Medical Tourism in India by Nationality",
            description:
              "Guides for international patients travelling to India for treatment, visa support, and hospital coordination.",
            url: "/countries",
          }),
          countryItemListSchema(
            countries.map((c) => ({
              name: c.name,
              demonym: c.demonym,
              url: `/countries/${c.slug}`,
              description: c.shortAnswer,
            }))
          ),
        ]}
      />

      <Breadcrumb items={[{ name: "Countries", href: "/countries" }]} />
      <Reveal>
        <h1 className="font-display text-4xl font-medium tracking-tight text-navy">
          Medical Tourism in India by Nationality
        </h1>
        <div className="mt-6">
          <AnswerBlock label="Who are these guides for?">
            Techdr Medical Tourism publishes nationality-specific guides for patients from Africa,
            the Middle East, South Asia, Europe, and the Americas — covering medical visas, local
            currency cost context, preferred Indian cities, and how hospital coordination works
            before you travel.
          </AnswerBlock>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 50}>
            <Link
              href={`/countries/${c.slug}`}
              className="group lift-card block overflow-hidden border border-line bg-white"
            >
              <MediaImage
                src={JOURNEY_IMAGES[i % JOURNEY_IMAGES.length]}
                alt={`Medical tourism in India for ${c.demonym} patients`}
                aspect="aspect-[16/10]"
                overlay="navy-soft"
                sizes="(max-width: 640px) 100vw, 33vw"
                className="!rounded-none"
              />
              <div className="p-5">
                <p className="data-label">{c.name}</p>
                <h2 className="mt-1.5 text-lg font-semibold text-navy group-hover:text-accent">
                  Medical Tourism for {c.demonym} Patients
                </h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted">{c.shortAnswer}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14">
        <CTASection
          title="Not sure which guide fits your case?"
          description="Message us with your nationality and reports — we’ll point you to the right hospitals, visa path, and cost range."
        />
      </Reveal>
    </Container>
  );
}
