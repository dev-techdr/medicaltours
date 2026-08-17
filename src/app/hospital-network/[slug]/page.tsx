import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { HospitalProfile } from "@/components/HospitalProfile";
import { MdxContent } from "@/components/MdxContent";
import { buildMetadata } from "@/lib/seo";
import { getAllCitySlugs, getCityBySlug } from "@/data/cities";
import {
  getAllHospitalSlugs,
  getAllHospitals,
  getHospitalBySlug,
  getHospitalsByCity,
} from "@/data/hospitals";
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
      title: `${hospital.name}, ${hospital.city} — Address & Appointment`,
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

function getAllHospitalsByCityExcept(citySlug: string, exceptSlug: string) {
  const sameCity = getHospitalsByCity(citySlug).filter((hospital) => hospital.slug !== exceptSlug);
  if (sameCity.length >= 2) return sameCity.slice(0, 4);
  const others = getAllHospitals().filter(
    (hospital) => hospital.slug !== exceptSlug && hospital.citySlug !== citySlug
  );
  return [...sameCity, ...others].slice(0, 4);
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
    const similarHospitals = getAllHospitalsByCityExcept(hospital.citySlug, hospital.slug);

    return (
      <HospitalProfile
        hospital={hospital}
        similarHospitals={similarHospitals}
        faqs={faqs}
      />
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
