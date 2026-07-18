import type { Metadata } from "next";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { MediaImage } from "@/components/MediaImage";
import { PatientEnquiryForm } from "@/components/PatientEnquiryForm";
import { Reveal } from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";
import { MEDIA } from "@/lib/media";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us | Free Medical Tourism Consultation",
  description:
    "Contact Techdr Medical Tourism in Hyderabad for a free consultation. Call or WhatsApp +91 6303225006 for hospital options and cost estimates.",
  path: "/contact-us",
  keywords: [
    "free consultation medical tourism india",
    "how to book medical treatment in india from abroad",
  ],
});

export default function ContactUsPage() {
  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumb items={[{ name: "Contact Us", href: "/contact-us" }]} />
      <Reveal>
        <h1 className="font-display text-4xl font-medium tracking-tight text-navy">
          We’re here when you’re ready
        </h1>
        <div className="mt-6">
          <AnswerBlock>
            Reach Techdr Medical Tourism on{" "}
            <a href={`tel:${SITE.phone}`} className="font-semibold text-accent hover:underline">
              Call {SITE.phoneDisplay}
            </a>{" "}
            or{" "}
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent hover:underline"
            >
              WhatsApp {SITE.phoneDisplay}
            </a>{" "}
            for a free consultation. Or submit the form below — share your medical reports and
            receive hospital options and a cost estimate within 24–48 hours from our Hyderabad team.
          </AnswerBlock>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <Reveal>
          <PatientEnquiryForm />
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={60} className="overflow-hidden rounded-[var(--radius)] border border-line bg-white shadow-[var(--shadow-soft)]">
            <div className="relative h-52 sm:h-56">
              <MediaImage
                src={MEDIA.team}
                alt="Medical Tours India care team in Hyderabad"
                fillParent
                zoomOnHover={false}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="!rounded-none"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="data-label">Talk to our Hyderabad care team</p>
              <h2 className="mt-2 font-display text-2xl font-medium text-navy">
                {SITE.teamCount} coordinators ready to help
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Call, WhatsApp, or email — whichever is easiest. Our team has supported{" "}
                {SITE.patientCount} international patients through treatment in India.
              </p>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex flex-col gap-0.5 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
                  <dt className="text-muted">Phone / WhatsApp</dt>
                  <dd className="flex flex-wrap gap-x-3 gap-y-1 font-semibold">
                    <a href={`tel:${SITE.phone}`} className="text-accent hover:underline">
                      Call {SITE.phoneDisplay}
                    </a>
                    <a
                      href={SITE.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      WhatsApp
                    </a>
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5 border-b border-line pb-4 sm:flex-row sm:justify-between">
                  <dt className="text-muted">Email</dt>
                  <dd className="font-semibold text-navy">
                    <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
                      {SITE.email}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
                  <dt className="text-muted">Headquarters</dt>
                  <dd className="font-semibold text-navy">Hyderabad, Telangana, India</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal delay={100} className="rounded-[var(--radius)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <p className="data-label">What to share</p>
            <h2 className="mt-2 text-xl font-semibold text-navy">
              A few details help us help you faster
            </h2>
            <ul className="mt-5 space-y-3.5">
              {[
                "Recent medical reports and imaging summaries",
                "Current diagnosis or doctor’s recommendation",
                "Preferred city in India (optional)",
                "Your nationality (for visa guidance)",
                "Best contact number and WhatsApp",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-ink">
                  <span className="mt-0.5 text-accent" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              WhatsApp is usually the fastest way to hear back from our care team.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-12">
        <CTASection title="Prefer to message us now?" compact />
      </Reveal>
    </Container>
  );
}
