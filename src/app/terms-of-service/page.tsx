import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: `Terms of service for ${SITE.name} and medicaltoursindia.com.`,
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumb items={[{ name: "Terms of Service", href: "/terms-of-service" }]} />
      <h1 className="font-display text-4xl font-medium tracking-tight text-navy">Terms of Service</h1>
      <div className="mt-8 max-w-3xl space-y-4 text-ink leading-relaxed">
        <p>Last updated: July 24, 2026</p>
        <h2 className="text-xl font-semibold text-navy">Authorization / ownership</h2>
        <p>{SITE.ownershipDeclaration}</p>
        <p>
          By using medicaltoursindia.com and engaging {SITE.name}, you agree to these terms.
        </p>
        <h2 className="text-xl font-semibold text-navy">Our role</h2>
        <p>
          We are a medical tourism facilitator. We coordinate access to partner hospitals and support
          services. We do not practice medicine. Clinical decisions are made by licensed doctors and
          hospitals.
        </p>
        <h2 className="text-xl font-semibold text-navy">Estimates</h2>
        <p>
          Cost estimates on this website and in communications are indicative. Final hospital quotes
          depend on medical evaluation, length of stay, implants, and consumables.
        </p>
        <h2 className="text-xl font-semibold text-navy">Patient responsibilities</h2>
        <p>
          Patients are responsible for providing accurate medical information, complying with visa
          and travel requirements, and following clinical advice from treating physicians.
        </p>
        <h2 className="text-xl font-semibold text-navy">Contact</h2>
        <p>
          {SITE.name} (a brand of {SITE.legalName}), Hyderabad, India ·{" "}
          <a href={`tel:${SITE.phone}`} className="text-accent hover:underline">
            Call {SITE.phoneDisplay}
          </a>
          {" · "}
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            WhatsApp
          </a>
          {" · "}
          <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
            {SITE.email}
          </a>
        </p>
      </div>
    </Container>
  );
}
