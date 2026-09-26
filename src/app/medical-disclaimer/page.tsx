import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { buildMetadata } from "@/lib/seo";
import { MEDICAL_FACILITATOR_NOTICE, SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Medical Disclaimer",
  description: `Medical facilitator role, clinical responsibility, and emergency-care disclaimer for ${SITE.name}.`,
  path: "/medical-disclaimer",
});

export default function MedicalDisclaimerPage() {
  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumb items={[{ name: "Medical Disclaimer", href: "/medical-disclaimer" }]} />
      <h1 className="font-display text-4xl font-medium tracking-tight text-navy">
        Medical Disclaimer
      </h1>
      <div className="mt-8 max-w-3xl space-y-6 text-ink leading-relaxed">
        <p>Last updated: September 26, 2026</p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-navy">Our role</h2>
          <p>{MEDICAL_FACILITATOR_NOTICE}</p>
          <p>
            Our role is limited to case coordination, hospital matching, sharing patient-provided
            records with selected providers, travel logistics, and patient support services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-navy">Independent healthcare providers</h2>
          <p>
            We connect international patients with independent third-party hospitals in India,
            including hospitals holding NABH or JCI accreditation. Accreditation and provider
            information should be confirmed directly with the relevant hospital because status,
            facilities, clinicians, and services can change.
          </p>
          <p>
            Hospitals and physicians are responsible for reviewing medical records, assessing
            suitability, diagnosing conditions, recommending treatment, obtaining informed consent,
            prescribing medicines, and delivering clinical care. They are not employees or agents
            of {SITE.name} unless expressly stated otherwise.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-navy">Information and estimates</h2>
          <p>
            Website content, coordinator communications, cost ranges, and travel guidance are
            general information and are not medical advice, diagnosis, or a guarantee of outcome.
            Final treatment plans, eligibility, timing, and prices are determined by the selected
            hospital after clinical evaluation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-navy">Emergencies</h2>
          <p>
            This website and our coordination channels are not emergency services. If you have
            severe or rapidly worsening symptoms, contact local emergency services or a qualified
            healthcare provider immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-navy">Operator and contact</h2>
          <p>
            {SITE.name} is operated by {SITE.legalName} in Hyderabad, Telangana, India. Questions
            about this disclaimer may be sent to{" "}
            <a href={`mailto:${SITE.email}`} className="font-semibold text-accent hover:underline">
              {SITE.email}
            </a>
            .
          </p>
        </section>
      </div>
    </Container>
  );
}
