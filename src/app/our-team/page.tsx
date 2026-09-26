import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { MediaImage } from "@/components/MediaImage";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { MEDIA } from "@/lib/media";
import { buildMetadata, webPageSchema } from "@/lib/seo";
import { FOUNDERS, SITE } from "@/lib/site";

const pagePath = "/our-team";
const pageTitle = "Our Team — Medical Tourism Coordinators in Hyderabad";
const pageDescription =
  "Meet the Medical Tours India team in Hyderabad — co-founders and care coordinators who support international patients from enquiry through recovery.";

const coordinatorRoles = [
  "Hospital matching and second-opinion coordination",
  "Medical visa invitation letters and document checklists",
  "Airport pickup, hotel near hospital, and interpreter support",
  "Admission, billing clarity, and discharge planning",
  "Follow-up coordination after patients return home",
] as const;

export const metadata: Metadata = buildMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "medical tourism coordinators india",
    "medical tourism company team hyderabad",
    "who runs medical tours india",
  ],
});

export default function OurTeamPage() {
  return (
    <Container className="py-10 sm:py-14">
      <JsonLd data={webPageSchema({ name: pageTitle, description: pageDescription, url: pagePath })} />
      <Breadcrumb items={[{ name: "Our Team", href: pagePath }]} />

      <Reveal>
        <p className="data-label">People behind your care</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight text-navy sm:text-5xl">
          The team coordinating your treatment in India
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Medical tourism works when real people answer your calls, read your reports, and stay with
          your family on the ground — not when you are handed off to a generic contact form.
        </p>
      </Reveal>

      <Reveal className="mt-8">
        <AnswerBlock label="Quick answer">
          Medical Tours India is headquartered in Hyderabad with {SITE.teamCount} care coordinators
          and healthcare management leadership. The team supports international patients from report
          review and hospital matching through visa, travel, treatment, and follow-up.
        </AnswerBlock>
      </Reveal>

      <Reveal className="mt-12">
        <p className="data-label">Leadership</p>
        <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-navy">Co-founders</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {FOUNDERS.map((founder) => (
            <article
              key={founder.name}
              className="flex min-w-0 gap-4 rounded-[var(--radius)] border border-line bg-white p-5 shadow-[var(--shadow-soft)] sm:gap-6 sm:p-6"
            >
              <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-neutral sm:h-44 sm:w-36">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 112px, 144px"
                />
              </div>
              <div className="min-w-0 py-1">
                <h3 className="font-display text-xl font-medium tracking-tight text-navy">
                  {founder.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-accent">{founder.role}</p>
                <p className="mt-3 text-sm text-ink">{founder.credentials}</p>
                <p className="mt-1 text-sm text-muted">{founder.experience}</p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-12 grid gap-8 overflow-hidden rounded-[var(--radius)] border border-line bg-white shadow-[var(--shadow-soft)] lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative min-h-[260px] lg:min-h-[320px]">
          <MediaImage
            src={MEDIA.team}
            alt="Medical Tours India care coordination team"
            fillParent
            zoomOnHover={false}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="!rounded-none lg:!rounded-l-[var(--radius)]"
          />
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <p className="data-label">Care coordinators</p>
          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-navy">
            {SITE.teamCount} people on your side
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Our Hyderabad coordinators have supported {SITE.patientCount} international patients across
            oncology, cardiac, orthopedics, fertility, transplant, and more.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-ink">
            {coordinatorRoles.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-0.5 text-accent" aria-hidden>
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className="mt-10 text-sm text-muted">
        <Link href="/about-us" className="font-semibold text-accent hover:underline">
          Read our full story →
        </Link>
      </Reveal>

      <Reveal className="mt-12">
        <CTASection title="Speak with our care team" />
      </Reveal>
    </Container>
  );
}
