import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { MediaImage } from "@/components/MediaImage";
import { MdxContent } from "@/components/MdxContent";
import { Reveal } from "@/components/Reveal";
import { SocialLinks } from "@/components/SocialLinks";
import { TrustBadges } from "@/components/TrustBadges";
import { getContentPage } from "@/data/pages";
import { MEDIA } from "@/lib/media";
import { buildMetadata } from "@/lib/seo";
import { FOUNDERS, SITE } from "@/lib/site";

const page = getContentPage("about-us");

export const metadata: Metadata = buildMetadata({
  title: page?.title ?? `About Us — ${SITE.name}`,
  description:
    page?.description ??
    `${SITE.name} is a Hyderabad-based medical tourism facilitator with MOUs with 200+ hospitals across India.`,
  path: "/about-us",
  keywords: ["best medical tourism company in india", "reliable medical tourism company india"],
});

export default function AboutUsPage() {
  if (!page) notFound();

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumb items={[{ name: "About Us", href: "/about-us" }]} />

      <Reveal>
        <p className="data-label">Our mission</p>
        <h1 className="mt-2 max-w-3xl font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Helping international families find clear, coordinated care in India — with honesty on
          costs and a team that stays present from enquiry to recovery.
        </p>
      </Reveal>

      <Reveal className="mt-12">
        <p className="data-label">Leadership</p>
        <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl">
          Co-founders
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Healthcare management leaders building transparent medical travel for international
          patients — hospital matching, visas, and care coordination from Hyderabad.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {FOUNDERS.map((founder) => (
            <article key={founder.name} className="flex min-w-0 gap-4 sm:gap-6">
              <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-neutral sm:h-44 sm:w-36">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 96px, 144px"
                />
              </div>
              <div className="flex min-w-0 flex-col justify-center py-1">
                <h3 className="font-display text-lg font-medium tracking-tight text-navy sm:text-xl">
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

      <Reveal className="mt-12">
        <figure className="grid max-w-3xl gap-5 sm:grid-cols-[minmax(0,22rem)_1fr] sm:items-start sm:gap-8">
          <div className="overflow-hidden rounded-[var(--radius-sm)] border border-line bg-white shadow-[var(--shadow-soft)]">
            <MediaImage
              src={MEDIA.team}
              alt={`${SITE.name} team — care coordinators dedicated to international patients`}
              aspect="aspect-[16/9]"
              zoomOnHover={false}
              sizes="(max-width: 640px) 100vw, 352px"
              className="!rounded-none"
            />
          </div>
          <figcaption className="min-w-0 pt-0.5">
            <p className="data-label">Our team</p>
            <p className="mt-2 font-display text-xl font-medium tracking-tight text-navy sm:text-2xl">
              {SITE.teamCount} team members dedicated to your care
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              Our Hyderabad-based coordinators have helped {SITE.patientCount} international
              patients navigate treatment in India — hospital matching, visas, travel, and recovery
              support.
            </p>
          </figcaption>
        </figure>
      </Reveal>

      <Reveal className="mt-10">
        <AnswerBlock>
          Medical Tours India is a Hyderabad-based facilitator helping international patients
          access treatment at {SITE.hospitalCount} partner hospitals across India. Our{" "}
          {SITE.teamCount} care team arranges hospital selection, medical visas, travel,
          interpreters, and transparent packages — with local support you can call or WhatsApp
          anytime.
        </AnswerBlock>
      </Reveal>

      <Reveal className="mt-10">
        <MdxContent source={page.content} />
        <div className="mt-8">
          <TrustBadges variant="grid" />
        </div>
        <h2 className="mt-10 font-display text-2xl font-medium text-navy">Contact</h2>
        <p className="mt-2 text-ink">
          <a href={`tel:${SITE.phone}`} className="font-semibold text-accent hover:underline">
            Call {SITE.phoneDisplay}
          </a>
          {" · "}
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent hover:underline"
          >
            WhatsApp {SITE.phoneDisplay}
          </a>
          . Headquarters: Hyderabad, Telangana, India.
        </p>
        <div className="mt-4">
          <SocialLinks variant="light" />
        </div>
      </Reveal>

      <Reveal className="mt-12">
        <CTASection />
      </Reveal>
    </Container>
  );
}
