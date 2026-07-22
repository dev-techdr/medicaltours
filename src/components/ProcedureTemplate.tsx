import Link from "next/link";
import Image from "next/image";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CostComparisonTable } from "@/components/CostComparisonTable";
import { CostHighlight } from "@/components/CostHighlight";
import { CTASection } from "@/components/CTASection";
import { DepthSections } from "@/components/DepthSections";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { TestimonialCard } from "@/components/TestimonialCard";
import { IconTile, TrustSignalIcon } from "@/components/HomeIcons";
import { TRUST_SIGNALS } from "@/lib/site";
import {
  costComparisonPath,
  doctorPath,
  getAllCountries,
  getCategoryBySlug,
  getDoctorsBySlugs,
  getFaqsForProcedure,
  getProcedureDepth,
  getRelatedProcedures,
  getTestimonialBySlug,
  procedurePath,
  type Procedure,
} from "@/lib/data";
import { COUNTRY_HUB_BY_SHORT_SLUG } from "@/data/countryRoutes";
import {
  breadcrumbSchema,
  faqSchema,
  medicalProcedureSchema,
  reviewSchema,
} from "@/lib/schema";

type ProcedureTemplateProps = {
  procedure: Procedure;
};

/** Priority markets shown on every treatment page for internal linking. */
const TREATMENT_COUNTRY_LINKS = [
  "nigeria",
  "kenya",
  "uae",
  "saudi-arabia",
  "bangladesh",
  "uk",
  "usa",
] as const;

export function ProcedureTemplate({ procedure }: ProcedureTemplateProps) {
  if (!procedure.costIndia || !procedure.costComparison?.length) {
    throw new Error(
      `Procedure "${procedure.slug}" is missing cost data for the standard template. Use pageVariant confidential-clinical instead.`
    );
  }
  const costIndia = procedure.costIndia;
  const costComparison = procedure.costComparison;

  const category = getCategoryBySlug(procedure.categorySlug);
  const path = procedurePath(procedure);
  const faqs = getFaqsForProcedure(procedure.faqSlugKey);
  const related = getRelatedProcedures(procedure);
  const depthSections = getProcedureDepth(procedure.slug);
  const linkedDoctors = getDoctorsBySlugs(procedure.doctorSlugs ?? []).slice(0, 3);
  const testimonial = procedure.testimonialSlug
    ? getTestimonialBySlug(procedure.testimonialSlug)
    : undefined;
  const countries = getAllCountries();
  const countryLinks = TREATMENT_COUNTRY_LINKS.map((short) => {
    const hub = COUNTRY_HUB_BY_SHORT_SLUG[short];
    const meta = countries.find((c) => c.slug === short);
    if (!hub) return null;
    return {
      href: `/countries/${hub}`,
      label: meta?.name ?? short,
    };
  }).filter((c): c is { href: string; label: string } => Boolean(c));
  const hero = procedure.images[0];

  const crumbs = [
    { name: "Treatments", href: "/treatments" },
    ...(category
      ? [{ name: category.name, href: `/treatments/${category.slug}` }]
      : []),
    { name: procedure.name, href: path },
  ];

  const geoCities =
    procedure.geoCities?.length
      ? procedure.geoCities
      : ["Hyderabad", "Delhi NCR", "Mumbai", "Chennai", "Bangalore"];

  const aeoAnswer =
    procedure.shortAnswer ??
    `${procedure.name} in India for international patients typically costs $${costIndia.min.toLocaleString()}–$${costIndia.max.toLocaleString()} USD at accredited partner hospitals — often 50–80% less than USA or UK packages, with care available in ${geoCities.join(", ")}.`;

  const schemas = [
    breadcrumbSchema(crumbs),
    medicalProcedureSchema({
      name: procedure.name,
      description: procedure.shortAnswer ?? procedure.overview,
      url: path,
      costMin: costIndia.min,
      costMax: costIndia.max,
    }),
    faqSchema(faqs),
    ...(testimonial
      ? [
          reviewSchema({
            authorName: testimonial.patientName,
            reviewBody: `${testimonial.summary} ${testimonial.outcome}`,
            ratingValue: testimonial.rating,
            itemName: procedure.name,
          }),
        ]
      : []),
  ];

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd data={schemas} />
      <Breadcrumb items={crumbs} />

      <Reveal>
        {hero ? (
          <div className="group relative mb-8 overflow-hidden rounded-[var(--radius)] border border-line">
            <div className="relative aspect-[21/9] min-h-[200px]">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="media-overlay media-overlay-navy-soft" />
            <div className="absolute bottom-0 left-0 p-5 text-white sm:p-8">
              {category ? (
                <p className="text-sm font-semibold text-white/80">{category.name}</p>
              ) : null}
              <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                {procedure.h1}
              </h1>
            </div>
          </div>
        ) : (
          <h1 className="font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl">
            {procedure.h1}
          </h1>
        )}
        <div className="mt-6 max-w-3xl">
          <AnswerBlock>
            {aeoAnswer} Typical India range:{" "}
            <CostHighlight>
              ${costIndia.min.toLocaleString()}–$
              {costIndia.max.toLocaleString()} USD
            </CostHighlight>
            .
          </AnswerBlock>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
          {procedure.overview}
        </p>
      </Reveal>

      {depthSections.length > 0 ? (
        <div className="mt-14">
          <DepthSections sections={depthSections} />
        </div>
      ) : null}

      <section className="mt-10" aria-labelledby="geo-heading">
        <Reveal>
          <h2
            id="geo-heading"
            className="font-display text-xl font-medium tracking-tight text-navy sm:text-2xl"
          >
            Where to get {procedure.name.toLowerCase()} in India
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
            TechdrHealth coordinates {procedure.name.toLowerCase()} packages for foreign patients at
            accredited hospitals across major medical tourism cities.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {geoCities.map((city) => {
              const citySlugMap: Record<string, string> = {
                Hyderabad: "hyderabad",
                "Delhi NCR": "delhi",
                Delhi: "delhi",
                Mumbai: "mumbai",
                Chennai: "chennai",
                Bangalore: "bangalore",
                Bengaluru: "bangalore",
              };
              const citySlug = citySlugMap[city];
              const href = citySlug ? `/cities/${citySlug}` : "/hospital-network";
              return (
                <li key={city}>
                  <Link
                    href={href}
                    className="inline-block rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-navy transition-colors hover:border-accent hover:text-accent"
                  >
                    {city}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </section>

      <div className="mt-12">
        <Reveal>
          <CostComparisonTable
            india={costIndia}
            comparisons={costComparison}
            procedureName={procedure.name}
            comparisonHref={costComparisonPath(procedure.slug)}
          />
        </Reveal>
      </div>

      <section className="mt-14" aria-labelledby="why-india-heading">
        <Reveal>
          <h2
            id="why-india-heading"
            className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl"
          >
            Why choose India for {procedure.name.toLowerCase()}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
            TechdrHealth coordinates care across accredited partner hospitals with end-to-end support for
            visa, travel, and recovery.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {TRUST_SIGNALS.map((signal) => (
              <li
                key={signal.label}
                className="flex items-start gap-3 rounded-[var(--radius-sm)] border border-line bg-white px-4 py-3"
              >
                <IconTile>
                  <TrustSignalIcon icon={signal.icon} />
                </IconTile>
                <span className="text-sm font-medium leading-snug text-navy">{signal.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mt-14" aria-labelledby="steps-heading">
        <Reveal>
          <h2
            id="steps-heading"
            className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl"
          >
            Procedure steps & recovery
          </h2>
          <p className="mt-2 text-sm text-muted sm:text-base">
            <span className="font-semibold text-navy">Recovery:</span> {procedure.recoveryTime}
          </p>
          <ol className="mt-6 space-y-3">
            {procedure.procedureSteps.map((step, index) => (
              <li
                key={step}
                className="flex gap-3 rounded-[var(--radius-sm)] border border-line bg-white px-4 py-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-light text-sm font-semibold text-accent">
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed text-muted sm:text-base">{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {testimonial ? (
        <section className="mt-14" aria-labelledby="story-heading">
          <Reveal>
            <h2
              id="story-heading"
              className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl"
            >
              Patient story
            </h2>
            <div className="mt-6">
              <TestimonialCard testimonial={testimonial} />
            </div>
          </Reveal>
        </section>
      ) : null}

      {linkedDoctors.length > 0 ? (
        <section className="mt-14" aria-labelledby="doctors-heading">
          <Reveal>
            <h2
              id="doctors-heading"
              className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl"
            >
              Specialists for {procedure.name.toLowerCase()}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
              Coordinating doctors experienced with international patients. Clinical decisions
              remain with the treating hospital team after evaluation.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {linkedDoctors.map((doctor) => (
                <li key={doctor.slug}>
                  <Link
                    href={doctorPath(doctor)}
                    className="block rounded-[var(--radius-sm)] border border-line bg-white px-4 py-3 transition-colors hover:border-accent"
                  >
                    <p className="text-sm font-semibold text-navy">{doctor.name}</p>
                    <p className="mt-1 text-xs text-muted">
                      {doctor.specialty} · {doctor.city} · {doctor.experienceYears}+ years
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{doctor.shortAnswer}</p>
                    <span className="mt-2 inline-block text-xs font-semibold text-accent">
                      View profile →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      ) : null}

      <div className="mt-14">
        <FAQAccordion faqs={faqs} includeSchema={false} />
      </div>

      {related.length > 0 ? (
        <section className="mt-14" aria-labelledby="related-heading">
          <Reveal>
            <h2
              id="related-heading"
              className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl"
            >
              Related procedures
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={procedurePath(item)}
                    className="block rounded-[var(--radius-sm)] border border-line bg-white px-4 py-3 text-sm font-semibold text-navy transition-colors hover:border-accent hover:text-accent"
                  >
                    {item.name}
                    <span className="mt-1 block text-xs font-normal text-muted">
                      {item.costIndia
                        ? `$${item.costIndia.min.toLocaleString()}–$${item.costIndia.max.toLocaleString()} USD`
                        : "Confidential clinical care"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      ) : null}

      {countryLinks.length > 0 ? (
        <section className="mt-14" aria-labelledby="countries-heading">
          <Reveal>
            <h2
              id="countries-heading"
              className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl"
            >
              {procedure.name} for international patients
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Country guides covering visa, cost planning, and hospital matching for{" "}
              {procedure.name.toLowerCase()} in India.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {countryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block rounded-[var(--radius-sm)] border border-line bg-white px-3 py-1.5 text-sm font-semibold text-navy transition-colors hover:border-accent hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/countries"
                  className="inline-block rounded-[var(--radius-sm)] border border-line bg-white px-3 py-1.5 text-sm font-semibold text-accent"
                >
                  All countries →
                </Link>
              </li>
            </ul>
          </Reveal>
        </section>
      ) : null}

      <div className="mt-14">
        <CTASection
          title={`Get a free ${procedure.name} estimate`}
          description="Share your reports and we’ll coordinate hospital options, written package costs, and travel support — usually within 24–48 hours."
        />
      </div>
    </Container>
  );
}
