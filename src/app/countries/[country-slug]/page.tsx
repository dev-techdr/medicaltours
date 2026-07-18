import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CountryCostComparison } from "@/components/CountryCostComparison";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { MediaImage } from "@/components/MediaImage";
import { MdxContent } from "@/components/MdxContent";
import { NetworkStats } from "@/components/NetworkStats";
import { Reveal } from "@/components/Reveal";
import { VisaProcess } from "@/components/VisaProcess";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildCountryAeoFaqs,
  getAllCountrySlugs,
  getCountryBySlug,
} from "@/data/countries";
import { patientStoriesPathFromHub } from "@/data/countryRoutes";
import { getAllStories } from "@/data/stories";
import { getTreatmentBySlug } from "@/data/treatments";
import { getTestimonialsByCountry } from "@/lib/data";
import { MEDIA } from "@/lib/media";
import {
  buildMetadata,
  countryMedicalTravelSchema,
  faqSchema,
  visaHowToSchema,
  webPageSchema,
} from "@/lib/seo";
import type { Treatment } from "@/lib/types";

type Props = { params: Promise<{ "country-slug": string }> };

export async function generateStaticParams() {
  return getAllCountrySlugs().map((slug) => ({ "country-slug": slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { "country-slug": slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return {};

  const title = `Medical Tourism India for ${country.demonym === "UAE Resident" ? "UAE Residents" : `${country.demonym} Patients`} — Cost, Visa & Hospitals`;
  const description =
    country.shortAnswer.length > 155
      ? `${country.shortAnswer.slice(0, 152)}…`
      : country.shortAnswer;

  return buildMetadata({
    title,
    description,
    path: `/countries/${country.slug}`,
    keywords: [
      country.primaryKeyword,
      `medical tourism india for ${country.demonym.toLowerCase()} patients`,
      `medical treatment india for ${country.name.toLowerCase()}`,
      `medical visa india for ${country.demonym.toLowerCase()}s`,
      `best hospital india for ${country.demonym.toLowerCase()} patients`,
      `india surgery cost for ${country.demonym.toLowerCase()} patients`,
      `${country.name.toLowerCase()} medical tourism india`,
      `affordable treatment india ${country.name.toLowerCase()}`,
      `heart surgery india for ${country.demonym.toLowerCase()} patients`,
      `cancer treatment india for ${country.demonym.toLowerCase()} patients`,
    ],
  });
}

export default async function CountryPage({ params }: Props) {
  const { "country-slug": slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  const path = `/countries/${country.slug}`;
  const audienceLabel =
    country.demonym === "UAE Resident"
      ? "UAE Residents"
      : `${country.demonym} Patients`;
  const pageTitle = `Medical Tourism in India for ${audienceLabel}`;

  const popular = country.popularTreatments
    .map((s) => getTreatmentBySlug(s))
    .filter((t): t is Treatment => Boolean(t));

  const meta = {
    currencyCode: country.currencyCode,
    currencySymbol: country.currencySymbol,
    usdToLocalApprox: country.usdToLocalApprox,
  };

  const aeoFaqs = buildCountryAeoFaqs(country);

  const relatedStories = getAllStories()
    .filter(
      (story) =>
        story.country.toLowerCase().includes(country.name.toLowerCase()) ||
        story.country.toLowerCase().includes(country.demonym.toLowerCase()) ||
        (country.name === "United States" && /usa|united states|america/i.test(story.country)) ||
        (country.name === "United Kingdom" && /uk|united kingdom|britain/i.test(story.country)) ||
        (country.name === "UAE" && /uae|dubai|emirates/i.test(story.country))
    )
    .slice(0, 2);

  const storiesPath = patientStoriesPathFromHub(country.slug);
  const shortSlug = storiesPath?.replace("/patient-stories/", "");
  const jsonStories = shortSlug ? getTestimonialsByCountry(shortSlug).slice(0, 2) : [];
  const displayStories =
    relatedStories.length > 0
      ? relatedStories.map((s) => ({
          slug: s.slug,
          patientName: s.patientName,
          country: s.country,
          treatment: s.treatment,
          summary: s.summary,
          href: shortSlug ? `/patient-stories/${shortSlug}` : "/patient-stories",
        }))
      : jsonStories.map((s) => ({
          slug: s.slug,
          patientName: s.patientName,
          country: s.country,
          treatment: s.treatment,
          summary: s.summary,
          href: `/patient-stories/${s.countrySlug}`,
        }));

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd
        data={[
          webPageSchema({
            name: pageTitle,
            description: country.shortAnswer,
            url: path,
          }),
          countryMedicalTravelSchema({
            countryName: country.name,
            demonym: country.demonym,
            description: country.shortAnswer,
            url: path,
            isoCountryCode: country.isoCountryCode,
            languages: country.languages,
          }),
          visaHowToSchema({
            demonym: country.demonym,
            countryName: country.name,
            steps: country.visaSteps,
            url: path,
          }),
          faqSchema(aeoFaqs),
        ]}
      />

      <Breadcrumb
        items={[
          { name: "Countries", href: "/countries" },
          { name: country.name, href: path },
        ]}
      />

      <Reveal>
        <div className="relative mb-8 overflow-hidden rounded-[var(--radius)]">
          <MediaImage
            src={MEDIA.visa}
            alt={`Medical tourism support for ${country.demonym} patients travelling to India`}
            aspect="aspect-[21/9] min-h-[180px]"
            priority
            overlay="hero"
            sizes="100vw"
            className="!rounded-none"
          />
          <div className="absolute bottom-0 left-0 p-5 text-white sm:p-8">
            <p className="text-sm font-semibold text-white/85">
              Patients from {country.name} · {country.isoCountryCode}
            </p>
            <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
              {pageTitle}
            </h1>
          </div>
        </div>
      </Reveal>

      {/* AEO: answer-first before other content */}
      <Reveal>
        <AnswerBlock
          label={`Is India a good option for ${audienceLabel.toLowerCase()}?`}
        >
          {country.shortAnswer}
        </AnswerBlock>
      </Reveal>

      <Reveal className="mt-6">
        <AnswerBlock label={`How does Techdr help families from ${country.name}?`}>
          Techdr Medical Tourism coordinates hospital matching, transparent package estimates,
          medical visa invitation letters, airport pickup, interpreters when needed, and recovery
          stay support for {country.demonym} patients — with a Hyderabad-based team available on
          call and WhatsApp.
        </AnswerBlock>
      </Reveal>

      <article className="prose-country mt-10">
        <MdxContent source={country.content} />
      </article>

      <section className="mt-12" aria-labelledby="cities-heading">
        <p className="data-label">Where patients travel</p>
        <h2 id="cities-heading" className="mt-1 font-display text-2xl font-medium text-navy">
          Popular treatment cities for {country.demonym} patients
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">{country.travelNote}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {country.popularCities.map((city) => {
            const slugMap: Record<string, string | null> = {
              Hyderabad: "hyderabad",
              Delhi: "delhi",
              Chennai: "chennai",
              Mumbai: "mumbai",
              Bangalore: "bangalore",
              Kolkata: null,
            };
            const citySlug = slugMap[city];
            const href = citySlug
              ? `/hospital-network/${citySlug}`
              : "/hospital-network";
            return (
              <Link
                key={city}
                href={href}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-navy shadow-[var(--shadow-soft)] transition hover:border-accent hover:bg-accent-light"
              >
                {city}
              </Link>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-muted">
          Care languages we commonly support: {country.languages.join(", ")}.
        </p>
      </section>

      <CountryCostComparison
        demonym={country.demonym}
        treatments={popular}
        meta={meta}
      />

      <div className="mt-12">
        <VisaProcess
          countryName={country.name}
          demonym={country.demonym}
          steps={country.visaSteps}
        />
      </div>

      {displayStories.length > 0 && (
        <section className="mt-12" aria-labelledby="stories-heading">
          <p className="data-label">Patient stories</p>
          <h2 id="stories-heading" className="mt-1 font-display text-2xl font-medium text-navy">
            Outcomes shared by families from {country.name}
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {displayStories.map((story) => (
              <article key={story.slug} className="quote-card">
                <p className="quote-mark">&ldquo;</p>
                <p className="mt-3 text-sm leading-relaxed text-ink">{story.summary}</p>
                <div className="mt-4 border-t border-line pt-4">
                  <p className="font-semibold text-navy">{story.patientName}</p>
                  <p className="mt-1 text-sm text-muted">
                    {story.country} · {story.treatment}
                  </p>
                  <Link
                    href={story.href}
                    className="mt-3 inline-block text-sm font-semibold text-accent"
                  >
                    More {country.name} patient stories →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {storiesPath ? (
            <p className="mt-4">
              <Link href={storiesPath} className="text-sm font-semibold text-accent hover:underline">
                Browse all patient stories from {country.name} →
              </Link>
            </p>
          ) : null}
        </section>
      )}

      <div className="mt-12">
        <FAQAccordion
          faqs={aeoFaqs}
          title={`FAQs for ${country.demonym} patients travelling to India`}
          includeSchema={false}
        />
      </div>

      <section className="mt-12">
        <p className="data-label">Why patients choose us</p>
        <h2 className="mt-1 font-display text-2xl font-medium text-navy">
          Support designed for {country.demonym} families
        </h2>
        <div className="mt-6">
          <NetworkStats />
        </div>
      </section>

      <nav className="mt-12 rounded-[var(--radius)] border border-line bg-white p-6 shadow-[var(--shadow-soft)]" aria-label="Related guides">
        <p className="data-label">Related guides</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          <li>
            <Link href="/medical-visa-assistance" className="text-sm font-semibold text-accent hover:text-navy">
              Medical visa assistance →
            </Link>
          </li>
          <li>
            <Link href="/hospital-network" className="text-sm font-semibold text-accent hover:text-navy">
              Hospital network →
            </Link>
          </li>
          <li>
            <Link href="/cost-calculator" className="text-sm font-semibold text-accent hover:text-navy">
              Cost calculator →
            </Link>
          </li>
          <li>
            <Link href="/countries" className="text-sm font-semibold text-accent hover:text-navy">
              All nationality guides →
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-12">
        <CTASection
          title={`Planning treatment from ${country.name}?`}
          description={`Share your reports on WhatsApp for a free opinion, ${country.currencyCode}-aware cost estimate, and medical visa guidance for ${country.demonym} patients.`}
        />
      </div>
    </Container>
  );
}
