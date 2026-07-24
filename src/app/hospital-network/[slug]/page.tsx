import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CaseFileCard } from "@/components/CaseFileCard";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { MediaImage } from "@/components/MediaImage";
import { MdxContent } from "@/components/MdxContent";
import { Reveal } from "@/components/Reveal";
import { VerifiedPartnerBadge } from "@/components/VerifiedPartnerBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import { hospitalImage } from "@/lib/media";
import { getAllCitySlugs, getCityBySlug } from "@/data/cities";
import {
  getAllHospitalSlugs,
  getHospitalBySlug,
  getHospitalsByCity,
} from "@/data/hospitals";
import { buildMetadata, hospitalSchema } from "@/lib/seo";
import type { FAQItem } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const hospitalSlugs = getAllHospitalSlugs().map((slug) => ({ slug }));
  const citySlugs = getAllCitySlugs().map((slug) => ({ slug }));
  return [...hospitalSlugs, ...citySlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hospital = getHospitalBySlug(slug);
  if (hospital) {
    return buildMetadata({
      title: `${hospital.name} for International Patients`,
      description: hospital.shortAnswer,
      path: `/hospital-network/${hospital.slug}`,
      keywords: [
        `${hospital.name.toLowerCase()} international patients`,
        `best hospitals in ${hospital.city.toLowerCase()} for international patients`,
      ],
    });
  }

  const city = getCityBySlug(slug);
  if (city) {
    return buildMetadata({
      title: `Best Hospitals in ${city.name} for International Patients`,
      description: city.shortAnswer,
      path: `/hospital-network/${city.slug}`,
      keywords: [city.primaryKeyword],
    });
  }

  return {};
}

function hospitalFaqs(name: string): FAQItem[] {
  return [
    {
      question: `How do I book at ${name}?`,
      answer: `Share your medical reports with Medical Tours India on WhatsApp. We coordinate a free opinion, package estimate, and admission at ${name} — including visa invitation letters when required.`,
    },
    {
      question: "What does the MOU mean for my treatment cost?",
      answer:
        "Our MOU is a direct partnership with the hospital. You receive transparent package pricing through TechdrHealth without an extra middleman markup on clinical fees. Final quotes depend on medical evaluation and package inclusions.",
    },
    {
      question: `Does ${name} treat international patients?`,
      answer: `Yes. ${name} works with TechdrHealth’s international patient pathway for admissions, interpreters on request, and discharge planning for foreign patients.`,
    },
    {
      question: "Can I get a second opinion before I travel?",
      answer:
        "Yes. We arrange online second opinions from partner specialists so you can decide with clarity before booking flights.",
    },
  ];
}

export default async function HospitalNetworkSlugPage({ params }: Props) {
  const { slug } = await params;
  const hospital = getHospitalBySlug(slug);

  if (hospital) {
    const faqs = hospitalFaqs(hospital.name);

    return (
      <Container className="py-10 sm:py-14">
        <JsonLd
          data={hospitalSchema({
            name: hospital.name,
            description: hospital.shortAnswer,
            url: `/hospital-network/${hospital.slug}`,
            city: hospital.city,
            rating: hospital.rating,
            reviewCount: hospital.reviewCount,
            accreditation: hospital.accreditation,
          })}
        />
        <Breadcrumb
          items={[
            { name: "Hospital Network", href: "/hospital-network" },
            { name: hospital.name, href: `/hospital-network/${hospital.slug}` },
          ]}
        />

        <Reveal className="mb-8 overflow-hidden border border-line">
          <MediaImage
            src={hospitalImage(hospital.slug)}
            alt={`${hospital.name} campus`}
            aspect="aspect-[21/9] min-h-[200px]"
            className="rounded-none"
            priority
            sizes="100vw"
          />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="data-label text-accent">{hospital.city}</p>
              <VerifiedPartnerBadge mouYear={hospital.mouYear} />
            </div>
            <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-navy">
              {hospital.name} for International Patients
            </h1>
            <div className="mt-6">
              <AnswerBlock>{hospital.shortAnswer}</AnswerBlock>
            </div>
          </div>

          <CaseFileCard
            label="Partner hospital"
            referenceId={`${hospital.city} · since ${hospital.mouYear}`}
            rows={[
              { label: "City", value: hospital.city },
              {
                label: "Accreditation",
                value: hospital.accreditation.join(" · "),
                accent: true,
              },
              {
                label: "Specialties",
                value: hospital.specialties.slice(0, 3).join(" · "),
              },
              {
                label: "Partnership since",
                value: String(hospital.mouYear),
                accent: true,
              },
              {
                label: "Patient rating",
                value: `★ ${hospital.rating} · ${hospital.reviewCount}`,
              },
            ]}
          />
        </div>

        <section className="mt-12">
          <p className="data-label">About</p>
          <h2 className="mt-1 font-display text-2xl font-medium text-navy">
            About the hospital
          </h2>
          <div className="mt-4">
            <MdxContent source={hospital.content} />
          </div>
        </section>

        <section className="mt-12">
          <p className="data-label">Clinical focus</p>
          <h2 className="mt-1 font-display text-2xl font-medium text-navy">
            Specialties
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {hospital.specialties.map((s) => (
              <span
                key={s}
                className="rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-ink"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <p className="data-label">Campus</p>
          <h2 className="mt-1 font-display text-2xl font-medium text-navy">Facilities</h2>
          <div className="divider-grid mt-4 sm:grid-cols-2">
            {hospital.facilities.map((f) => (
              <div key={f}>
                <p className="text-sm font-medium text-navy">{f}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <p className="data-label">Reviews</p>
          <h2 className="mt-1 font-display text-2xl font-medium text-navy">
            Patient reviews & ratings
          </h2>
          <CaseFileCard
            className="mt-4 max-w-md"
            label="Patient ratings"
            referenceId={`${hospital.name}`}
            rows={[
              {
                label: "Rating",
                value: `★ ${hospital.rating} / 5`,
                accent: true,
              },
              {
                label: "Reviews",
                value: hospital.reviewCount.toLocaleString(),
              },
              {
                label: "Network status",
                value: "Verified partner",
                accent: true,
              },
            ]}
          />
        </section>

        <section className="mt-12">
          <p className="data-label">International care</p>
          <h2 className="mt-1 font-display text-2xl font-medium text-navy">
            International patient services
          </h2>
          <div className="divider-grid mt-4 sm:grid-cols-2 lg:grid-cols-3">
            {hospital.internationalServices.map((s) => (
              <div key={s}>
                <p className="text-sm font-medium text-navy">{s}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12">
          <FAQAccordion faqs={faqs} title={`FAQs about ${hospital.name}`} />
        </div>

        <div className="mt-12">
          <CTASection title={`Enquire about treatment at ${hospital.name}`} />
        </div>
      </Container>
    );
  }

  const city = getCityBySlug(slug);
  if (!city) notFound();

  const cityHospitals = getHospitalsByCity(city.slug);

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumb
        items={[
          { name: "Hospital Network", href: "/hospital-network" },
          { name: city.name, href: `/hospital-network/${city.slug}` },
        ]}
      />
      <h1 className="font-display text-4xl font-medium tracking-tight text-navy">
        Best Hospitals in {city.name} for International Patients
      </h1>
      <div className="mt-6">
        <AnswerBlock>{city.shortAnswer}</AnswerBlock>
      </div>
      <div className="mt-6">
        <MdxContent source={city.content} />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {city.highlights.map((h) => (
          <span
            key={h}
            className="rounded-full bg-accent-light px-3 py-1.5 text-sm font-medium text-accent"
          >
            {h}
          </span>
        ))}
      </div>

      <section className="mt-12">
        <p className="data-label">Hospitals</p>
        <h2 className="mt-1 font-display text-2xl font-medium text-navy">
          Partner hospitals in {city.name}
        </h2>
        <div className="divider-grid mt-4 sm:grid-cols-2">
          {cityHospitals.map((h) => (
            <Link
              key={h.slug}
              href={`/hospital-network/${h.slug}`}
              className="divider-grid-item block"
            >
              <p className="data-label">{h.city}</p>
              <h3 className="mt-2 text-base font-semibold text-navy">{h.name}</h3>
              <p className="mt-1 text-xs font-medium text-accent">
                {h.accreditation.join(" · ")}
              </p>
              <p className="mt-2 text-sm text-muted">{h.shortAnswer}</p>
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-8 text-sm text-muted">
        Also see our{" "}
        <Link href={`/cities/${city.slug}`} className="font-medium text-accent">
          {city.name} medical tourism city guide
        </Link>
        .
      </p>

      <div className="mt-12">
        <CTASection />
      </div>
    </Container>
  );
}
