import Link from "next/link";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { UsdRange } from "@/components/CostHighlight";
import { HeroIntroCopy } from "@/components/HeroIntroCopy";
import { HeroVideoBackground } from "@/components/HeroVideoBackground";
import { MediaImage } from "@/components/MediaImage";
import { GlobalReach } from "@/components/GlobalReach";
import { NetworkStats } from "@/components/NetworkStats";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllCities } from "@/data/cities";
import { getAllCountries } from "@/data/countries";
import {
  COUNTRY_HUB_BY_SHORT_SLUG,
  PRIORITY_COUNTRY_SHORT_SLUGS,
} from "@/data/countryRoutes";
import { getAllStories } from "@/data/stories";
import { getGlobalFaqs } from "@/data/faqs";
import {
  getCategoryBySlug,
  getProcedureBySlug,
  procedurePath,
} from "@/lib/data";
import { cityImage, MEDIA } from "@/lib/media";
import { faqSchema, webSiteSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";

/** One flagship procedure per major specialty — not the raw JSON order (all cardiac). */
const FEATURED_TREATMENT_SLUGS = [
  "heart-bypass-surgery-cost-india",
  "total-knee-replacement-surgery-india",
  "chemotherapy-cost-india",
  "ivf-treatment-cost-india",
  "brain-tumor-surgery-india",
  "kidney-transplant-india",
] as const;

export default function HomePage() {
  const cities = getAllCities();
  const countries = getAllCountries();
  const stories = getAllStories();
  const globalFaqs = getGlobalFaqs();

  const featuredTreatments = FEATURED_TREATMENT_SLUGS.map((slug) =>
    getProcedureBySlug(slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const countryByHub = new Map(countries.map((c) => [c.slug, c]));
  const featuredCountries = PRIORITY_COUNTRY_SHORT_SLUGS.map(
    (short) => countryByHub.get(COUNTRY_HUB_BY_SHORT_SLUG[short])
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const featuredStories = stories.slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          webSiteSchema(),
          ...(globalFaqs.length ? [faqSchema(globalFaqs)] : []),
        ]}
      />
      {/* Full-bleed video hero — brand + one headline + one line + CTAs only */}
      <section className="relative min-h-[50vh] overflow-hidden sm:min-h-[82vh]">
        <HeroVideoBackground
          src={MEDIA.heroVideo}
          poster={MEDIA.hero}
          posterAlt="World-class international hospital care in India"
        />

        <Container className="relative flex min-h-[50vh] flex-col justify-end pb-8 pt-20 sm:min-h-[82vh] sm:pb-20 sm:pt-32">
          <HeroIntroCopy />
        </Container>
      </section>

      <Container className="py-14 sm:py-16">
        <Reveal>
          <div className="grid gap-8 overflow-hidden rounded-[var(--radius)] border border-line bg-white shadow-[var(--shadow-soft)] lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[260px] lg:min-h-[320px]">
              <MediaImage
                src={MEDIA.team}
                alt={`${SITE.name} team dedicated to international patient care`}
                fillParent
                zoomOnHover={false}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="!rounded-none lg:!rounded-l-[var(--radius)]"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <p className="data-label">Our team</p>
              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-navy">
                {SITE.teamCount} people dedicated to your process
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Based in Hyderabad, our coordinators stay with international patients and families
                from first enquiry through recovery — matching hospitals, clarifying costs, and
                arranging visa and stay support. {SITE.patientCount} families helped ·{" "}
                {SITE.hospitalCount} hospital partners.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-ink">
                {[
                  "JCI & NABH-linked hospital network",
                  "Transparent treatment cost ranges",
                  "Visa, travel, interpreter, and recovery support",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-0.5 text-accent" aria-hidden>
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <GlobalReach />
        </Reveal>

        {/* Patient stories */}
        <section className="mt-16">
          <Reveal>
            <p className="data-label">Patient stories</p>
            <h2 className="mt-2 max-w-2xl font-display text-3xl font-medium tracking-tight text-navy">
              Real journeys from families who travelled for care
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {featuredStories.map((story, index) => (
              <Reveal key={story.slug} delay={index * 80} as="article" className="quote-card">
                <p className="quote-mark">&ldquo;</p>
                <p className="mt-3 text-sm leading-relaxed text-ink sm:text-[0.95rem]">
                  {story.summary}
                </p>
                <div className="mt-5 border-t border-line pt-4">
                  <p className="font-semibold text-navy">{story.patientName}</p>
                  <p className="mt-1 text-sm text-muted">
                    {story.country} · {story.treatment}
                  </p>
                  <p className="mt-1 text-sm text-accent">{story.hospital}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6">
            <Link
              href="/patient-stories"
              className="text-sm font-semibold text-accent hover:text-navy"
            >
              Read more patient stories →
            </Link>
          </Reveal>
        </section>

        {/* How it works — 3 steps, no dossiers */}
        <section className="mt-16">
          <Reveal>
            <p className="data-label">How we help</p>
            <h2 className="mt-2 max-w-2xl font-display text-3xl font-medium tracking-tight text-navy">
              Three clear steps from first message to recovery
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Understand your case",
                body: "We review reports, clarify goals, and shortlist hospitals and doctors that fit your treatment and budget.",
              },
              {
                step: "2",
                title: "Plan travel with confidence",
                body: "Visa invitation, flights guidance, hotel near the hospital, airport pickup, and interpreter support as needed.",
              },
              {
                step: "3",
                title: "Stay supported on the ground",
                body: "Admission help, attendant guidance during treatment, and follow-up after discharge so families aren’t left alone.",
              },
            ].map((item, index) => (
              <Reveal key={item.step} delay={index * 70} className="relative pt-2">
                <span className="font-display text-5xl font-medium text-accent/25">{item.step}</span>
                <h3 className="-mt-2 text-xl font-semibold text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal className="mt-16">
          <NetworkStats />
        </Reveal>

        {/* Featured treatments with photos */}
        <section className="mt-16">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="data-label">Treatments</p>
                <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-navy">
                  Care pathways patients travel for most often
                </h2>
              </div>
              <Link
                href="/treatments"
                className="text-sm font-semibold text-accent hover:text-navy"
              >
                View all treatments →
              </Link>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTreatments.map((t, index) => {
              const category = getCategoryBySlug(t.categorySlug);
              const hero = t.images[0];
              return (
                <Reveal key={t.slug} delay={index * 50}>
                  <Link
                    href={procedurePath(t)}
                    className="group lift-card block overflow-hidden border border-line bg-white"
                  >
                    <MediaImage
                      src={hero?.src ?? MEDIA.hero}
                      alt={hero?.alt ?? t.name}
                      aspect="aspect-[16/10]"
                      zoomOnHover
                      overlay="navy-soft"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="!rounded-none"
                    />
                    <div className="p-5">
                      <p className="data-label">{category?.name ?? t.categorySlug}</p>
                      <h3 className="mt-1.5 text-lg font-semibold text-navy">{t.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted">{t.overview}</p>
                      <p className="mt-3 text-sm">
                        <UsdRange
                          min={t.costIndia.min}
                          max={t.costIndia.max}
                          suffix="USD"
                        />
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Countries + cities with imagery */}
        <section className="mt-16">
          <Reveal>
            <p className="data-label">Where patients come from</p>
            <h2 className="mt-2 max-w-2xl font-display text-3xl font-medium tracking-tight text-navy">
              Dedicated guidance for patients from your country
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCountries.map((country, index) => (
              <Reveal key={country.slug} delay={index * 40}>
                <Link
                  href={`/countries/${country.slug}`}
                  className="flex items-center rounded-[var(--radius-sm)] border border-line bg-white px-4 py-3.5 text-sm font-semibold text-navy shadow-[var(--shadow-soft)] transition hover:border-accent hover:bg-accent-light"
                >
                  {country.demonym} patients
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cities.slice(0, 4).map((city, index) => (
              <Reveal key={city.slug} delay={index * 50}>
                <Link
                  href={`/hospital-network/${city.slug}`}
                  className="group lift-card relative block overflow-hidden"
                >
                  <MediaImage
                    src={cityImage(city.slug)}
                    alt=""
                    aspect="aspect-[4/3]"
                    overlay="navy-soft"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <p className="font-display text-xl font-medium text-white">{city.name}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-white/75">{city.shortAnswer}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal className="mt-16">
          <div className="grid gap-8 overflow-hidden rounded-[var(--radius)] border border-line bg-white shadow-[var(--shadow-soft)] lg:grid-cols-2">
            <div className="p-8 sm:p-10">
              <p className="data-label">Free consultation</p>
              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-navy">
                Tell us about your case — we’ll help you plan the next step
              </h2>
              <p className="mt-4 text-muted">
                A short WhatsApp or call is enough to start. No pressure — just clearer hospital
                options, cost ranges, and what travel will look like.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Message us on WhatsApp
                </a>
                <Link href="/contact-us" className="btn btn-outline">
                  Contact form
                </Link>
              </div>
            </div>
            <div className="relative min-h-[220px]">
              <MediaImage
                src={MEDIA.consultation}
                alt="Medical consultation"
                fillParent
                zoomOnHover={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="!rounded-none lg:!rounded-r-[var(--radius)]"
              />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <FAQAccordion
            faqs={globalFaqs}
            title="Questions families ask before travelling"
            includeSchema={false}
          />
        </Reveal>

        <Reveal className="mt-16">
          <CTASection
            title="Ready for a clearer treatment plan?"
            description="Share your reports. We’ll help you compare hospitals, understand costs, and plan travel with a care team that stays with you."
          />
        </Reveal>
      </Container>
    </>
  );
}
