import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE.name} and medicaltoursindia.com.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumb items={[{ name: "Privacy Policy", href: "/privacy-policy" }]} />
      <h1 className="font-display text-4xl font-medium tracking-tight text-navy">Privacy Policy</h1>
      <div className="mt-8 max-w-3xl space-y-4 text-ink leading-relaxed">
        <p>Last updated: July 4, 2026</p>
        <p>
          {SITE.name} (“we”, “us”) respects your privacy. This policy explains how we collect and use
          information when you contact us or use medicaltoursindia.com.
        </p>
        <h2 className="text-xl font-semibold text-navy">Information we collect</h2>
        <p>
          We may collect your name, contact details, nationality, medical reports you voluntarily
          share, and communications via phone, WhatsApp, email, or forms — solely to coordinate your
          care inquiry.
        </p>
        <h2 className="text-xl font-semibold text-navy">How we use information</h2>
        <p>
          Information is used to respond to inquiries, arrange hospital opinions, prepare cost
          estimates, support visa documentation, and improve our services. We do not sell personal
          data.
        </p>
        <h2 className="text-xl font-semibold text-navy">Sharing</h2>
        <p>
          With your consent, we may share relevant medical and contact details with partner hospitals
          and doctors solely for treatment coordination.
        </p>
        <h2 className="text-xl font-semibold text-navy">Contact</h2>
        <p>
          Questions about privacy:{" "}
          <a href={`mailto:${SITE.email}`} className="text-accent">
            {SITE.email}
          </a>{" "}
          or{" "}
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
          .
        </p>
      </div>
    </Container>
  );
}
