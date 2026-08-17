import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import {
  IconBadgeCheck,
  IconClipboard,
  IconHeartPulse,
  IconHospital,
  IconHotel,
  IconMapPin,
  IconStethoscope,
  IconTile,
  IconUsers,
  TreatmentCategoryIcon,
} from "@/components/HomeIcons";
import { MediaImage } from "@/components/MediaImage";
import { MdxContent } from "@/components/MdxContent";
import { PatientEnquiryForm } from "@/components/PatientEnquiryForm";
import { Reveal } from "@/components/Reveal";
import { StarRating } from "@/components/StarRating";
import { VerifiedPartnerBadge } from "@/components/VerifiedPartnerBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import { hospitalImage, hospitalLogo } from "@/lib/media";
import {
  hospitalGallery,
  hospitalMapsHref,
  hospitalWhatsAppHref,
  specialtyHref,
} from "@/lib/hospital-profile";
import { hospitalSchema } from "@/lib/seo";
import type { FAQItem, Hospital } from "@/lib/types";

type SimilarHospital = Pick<
  Hospital,
  "slug" | "name" | "city" | "citySlug" | "accreditation" | "rating" | "reviewCount" | "specialties"
>;

type HospitalProfileProps = {
  hospital: Hospital;
  similarHospitals: SimilarHospital[];
  faqs: FAQItem[];
};

function FactCell({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: ReactNode;
  href?: string;
}) {
  const inner = (
    <>
      <span className="mt-0.5 text-accent">{icon}</span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-navy">{label}</span>
        <span className={`mt-0.5 block text-sm ${href ? "font-medium text-accent" : "text-muted"}`}>
          {value}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className="hospital-fact hospital-fact-link">
        {inner}
      </a>
    );
  }

  return <div className="hospital-fact">{inner}</div>;
}

function CheckItem({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-2.5 py-1.5 text-sm text-ink">
      <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M4.8 8.2 6.7 10l4.5-4.6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </li>
  );
}

export function HospitalProfile({
  hospital,
  similarHospitals,
  faqs,
}: HospitalProfileProps) {
  const gallery = hospitalGallery(hospital);
  const heroGallery = gallery.slice(0, 2);
  const waHref = hospitalWhatsAppHref(hospital.name, hospital.city);
  const mapsHref = hospitalMapsHref(hospital);
  const path = `/hospital-network/${hospital.slug}`;
  const logo = hospitalLogo(hospital.slug);

  return (
    <Container className="py-8 sm:py-12">
      <JsonLd
        data={hospitalSchema({
          name: hospital.name,
          description: hospital.shortAnswer,
          url: path,
          city: hospital.city,
          rating: hospital.rating,
          reviewCount: hospital.reviewCount,
          accreditation: hospital.accreditation,
        })}
      />
      <Breadcrumb
        items={[
          { name: "Hospital Network", href: "/hospital-network" },
          { name: "India", href: "/hospital-network" },
          { name: hospital.city, href: `/hospital-network/${hospital.citySlug}` },
          { name: hospital.name, href: path },
        ]}
      />

      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {logo ? (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[var(--radius)] border border-line bg-white p-2 shadow-[var(--shadow-soft)] sm:h-24 sm:w-24">
              <Image
                src={logo}
                alt={`${hospital.name} logo`}
                width={96}
                height={96}
                className="h-full w-full object-contain"
              />
            </div>
          ) : null}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <VerifiedPartnerBadge mouYear={hospital.mouYear} />
              {hospital.accreditation.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-accent-light px-2.5 py-1 text-xs font-semibold text-accent"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-navy sm:text-5xl">
              {hospital.name}
            </h1>
            <StarRating rating={hospital.rating} count={hospital.reviewCount} />
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
              <IconMapPin className="h-4 w-4 text-accent" />
              {hospital.city}, India
            </p>
          </div>
        </div>
      </Reveal>

      <div className="hospital-gallery mt-8">
        {heroGallery.map((image, index) => (
          <MediaImage
            key={image.src}
            src={image.src}
            alt={image.alt}
            aspect="aspect-[16/10] min-h-[180px]"
            className="rounded-[var(--radius)]"
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ))}
      </div>

      <div className="hospital-facts mt-6">
        <FactCell
          href="#enquiry-form"
          icon={<IconUsers className="h-6 w-6" />}
          label="Appointment"
          value="Click here"
        />
        <FactCell
          icon={<IconMapPin className="h-6 w-6" />}
          label="Location"
          value={hospital.city}
        />
        <FactCell
          icon={<IconBadgeCheck className="h-6 w-6" />}
          label="Established in"
          value={String(hospital.establishedYear)}
        />
        <FactCell
          icon={<IconClipboard className="h-6 w-6" />}
          label="Accreditations"
          value={
            <span className="mt-1 flex flex-wrap gap-1.5">
              {(hospital.accreditation.length ? hospital.accreditation : ["NABH"]).map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center rounded-full bg-accent-light px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent"
                >
                  {badge}
                </span>
              ))}
            </span>
          }
        />
        <FactCell
          icon={<IconHeartPulse className="h-6 w-6" />}
          label="Specialty"
          value={hospital.specialtyType}
        />
        <FactCell
          href="#hospital-images"
          icon={<IconHospital className="h-6 w-6" />}
          label="Images"
          value="Click here"
        />
        <FactCell
          icon={<IconHotel className="h-6 w-6" />}
          label="Number of beds"
          value={String(hospital.beds)}
        />
        <FactCell
          href="#facilities"
          icon={<IconStethoscope className="h-6 w-6" />}
          label="Facilities"
          value="Click here"
        />
      </div>

      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
        <a href="#enquiry-form" className="btn btn-primary">
          Book appointment
        </a>
        <Link href="/contact-us#enquiry-form" className="btn btn-outline">
          Contact hospital
        </Link>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          WhatsApp us
        </a>
      </div>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.85fr)]">
        <div className="min-w-0">
          <section>
            <p className="data-label">Overview</p>
            <h2 className="mt-1 font-display text-2xl font-medium text-navy">About hospital</h2>
            <div className="mt-4">
              <AnswerBlock>{hospital.shortAnswer}</AnswerBlock>
            </div>
            <div className="mt-6">
              <MdxContent source={hospital.content} />
            </div>
          </section>

          <section className="mt-12" id="appointment">
            <p className="data-label">Plan your visit</p>
            <h2 className="mt-1 font-display text-2xl font-medium text-navy">
              Book appointment at {hospital.name}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              Share reports for a free second opinion, written package estimate, and admission
              coordination — usually within 24–48 hours. Use the form to send patient details.
            </p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
          <PatientEnquiryForm
            compact
            label="Free quote"
            title="Help us with patient details"
            description={`Treatment plan and quote within 2 days for ${hospital.name}.`}
            submitLabel="Submit details"
            sourcePage={path}
            defaultPreferredCity={hospital.city}
            messagePlaceholder={`Describe the diagnosis and reports available for treatment at ${hospital.name}.`}
          />
          <p className="mt-3 text-center text-xs text-muted">
            Patients from 70+ countries use {hospital.name} through Medical Tours India.
          </p>
        </aside>

        <div className="min-w-0 lg:col-start-1">
          <section>
            <p className="data-label">Clinical team</p>
            <h2 className="mt-1 font-display text-2xl font-medium text-navy">
              Team and specialities
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{hospital.teamNote}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {hospital.specialties.map((specialty) => (
                <Link
                  key={specialty}
                  href={specialtyHref(specialty)}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-navy transition-colors hover:border-accent hover:bg-accent-light"
                >
                  <TreatmentCategoryIcon category={specialty} className="h-4 w-4 text-accent" />
                  {specialty}
                </Link>
              ))}
            </div>
          </section>

          <section id="facilities" className="mt-12 scroll-mt-28">
            <p className="data-label">Campus</p>
            <h2 className="mt-1 font-display text-2xl font-medium text-navy">Facilities</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {hospital.facilityGroups.map((group) => (
                <div
                  key={group.id}
                  className="rounded-[var(--radius)] border border-line bg-white p-5 shadow-[var(--shadow-soft)]"
                >
                  <div className="flex items-center gap-3">
                    <IconTile>
                      {group.id === "comfort" ? (
                        <IconHotel />
                      ) : group.id === "language" ? (
                        <IconUsers />
                      ) : group.id === "transport" ? (
                        <IconMapPin />
                      ) : (
                        <IconStethoscope />
                      )}
                    </IconTile>
                    <h3 className="text-base font-semibold text-navy">{group.title}</h3>
                  </div>
                  <ul className="mt-3">
                    {group.items.map((item) => (
                      <CheckItem key={item}>{item}</CheckItem>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <p className="data-label">Campus</p>
            <h2 className="mt-1 font-display text-2xl font-medium text-navy">Infrastructure</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              {hospital.infrastructure}
            </p>
          </section>

          <section className="mt-12">
            <p className="data-label">Visit</p>
            <h2 className="mt-1 font-display text-2xl font-medium text-navy">Address</h2>
            <div className="mt-4 rounded-[var(--radius)] border border-line bg-white p-5 shadow-[var(--shadow-soft)]">
              <p className="text-base font-semibold text-navy">{hospital.address}</p>
              <p className="mt-1 text-sm text-muted">
                {hospital.city}
                {hospital.pincode ? `, ${hospital.pincode}` : ""}
                <br />
                India
              </p>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
              >
                <IconMapPin className="h-4 w-4" />
                Get directions
              </a>
            </div>
          </section>

          <section className="mt-12">
            <p className="data-label">Getting there</p>
            <h2 className="mt-1 font-display text-2xl font-medium text-navy">Location</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {hospital.locationLandmarks.map((landmark) => (
                <div
                  key={landmark.name}
                  className="rounded-[var(--radius)] border border-line bg-white p-5 shadow-[var(--shadow-soft)]"
                >
                  <p className="text-sm font-semibold text-navy">{landmark.name}</p>
                  <p className="mt-2 text-sm text-muted">
                    <span className="font-medium text-ink">Distance:</span> {landmark.distanceKm} km
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    <span className="font-medium text-ink">Time:</span> {landmark.timeMinutes} minutes
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="hospital-images" className="mt-12 scroll-mt-28">
            <p className="data-label">Gallery</p>
            <h2 className="mt-1 font-display text-2xl font-medium text-navy">
              Images of {hospital.name}
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((image) => (
                <MediaImage
                  key={`gallery-${image.src}`}
                  src={image.src}
                  alt={image.alt}
                  aspect="aspect-[4/3]"
                  className="rounded-[var(--radius)]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ))}
            </div>
          </section>

          {similarHospitals.length > 0 ? (
            <section className="mt-12">
              <p className="data-label">
                {similarHospitals.every((item) => item.citySlug === hospital.citySlug)
                  ? `Also in ${hospital.city}`
                  : "Network"}
              </p>
              <h2 className="mt-1 font-display text-2xl font-medium text-navy">Similar hospitals</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {similarHospitals.map((similar) => (
                  <Link
                    key={similar.slug}
                    href={`/hospital-network/${similar.slug}`}
                    className="lift-card overflow-hidden border border-line bg-white"
                  >
                    <MediaImage
                      src={hospitalImage(similar.slug)}
                      alt={`${similar.name} campus`}
                      aspect="aspect-[16/9]"
                      className="rounded-none"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="p-4">
                      <p className="data-label">{similar.city}</p>
                      <h3 className="mt-1 text-base font-semibold text-navy">{similar.name}</h3>
                      <p className="mt-1 text-xs font-medium text-accent">
                        {similar.accreditation.join(" · ")}
                      </p>
                      <div className="mt-2">
                        <StarRating
                          rating={similar.rating}
                          count={similar.reviewCount}
                          size="sm"
                        />
                      </div>
                      <p className="mt-2 text-sm font-semibold text-accent">View hospital →</p>
                    </div>
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted">
                See all{" "}
                <Link
                  href={`/hospital-network/${hospital.citySlug}`}
                  className="font-semibold text-accent hover:underline"
                >
                  partner hospitals in {hospital.city}
                </Link>
                .
              </p>
            </section>
          ) : null}

          <section className="mt-12">
            <p className="data-label">Treatments</p>
            <h2 className="mt-1 font-display text-2xl font-medium text-navy">
              Top hospitals by department
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {hospital.specialties.map((specialty) => (
                <li key={specialty}>
                  <Link
                    href={specialtyHref(specialty)}
                    className="flex items-center justify-between rounded-[var(--radius)] border border-line bg-white px-4 py-3 text-sm font-medium text-navy transition-colors hover:border-accent hover:bg-accent-light"
                  >
                    Best {specialty.toLowerCase()} hospitals in India
                    <span className="text-accent">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-12">
            <FAQAccordion faqs={faqs} title={`FAQs about ${hospital.name}`} />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <CTASection
          title={`Enquire about treatment at ${hospital.name}`}
          description="Share your reports on WhatsApp or the form. We coordinate a free opinion, written estimate, visa invitation letter when needed, and admission at this partner hospital."
          whatsappHref={waHref}
        />
      </div>
    </Container>
  );
}
