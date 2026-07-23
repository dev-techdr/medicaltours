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
        <p>Last updated: July 23, 2026</p>
        <p>
          {SITE.name} (“we”, “us”) respects your privacy. This policy explains how we collect and use
          information when you contact us or use medicaltoursindia.com.
        </p>
        <h2 className="text-xl font-semibold text-navy">Information we collect</h2>
        <p>
          We may collect your name, contact details, nationality, medical reports you voluntarily
          share, and communications via phone, WhatsApp, email, or forms — solely to coordinate your
          care inquiry. When you visit our website or interact with our ads, we may also collect
          device and usage data (such as IP address, browser type, pages viewed, and referral source)
          through cookies, pixels, and similar technologies.
        </p>
        <h2 className="text-xl font-semibold text-navy">How we use information</h2>
        <p>
          Information is used to respond to inquiries, arrange hospital opinions, prepare cost
          estimates, support visa documentation, improve our services, and measure and improve our
          advertising. We do not sell personal data.
        </p>
        <h2 className="text-xl font-semibold text-navy">Advertising and analytics</h2>
        <p>
          We use advertising and analytics tools — including Meta Ads (Facebook and Instagram), Google
          Ads, and similar advertising platforms — to show relevant ads, measure campaign
          performance, and reach people who may be interested in our services. These platforms may
          collect or receive information about your visits to our site and interactions with our ads
          (for example via the Meta Pixel or similar tracking tags) so that we can deliver, personalize,
          and report on advertising. You can manage ad preferences through your Meta, Google, or
          device settings, and you may control cookies in your browser.
        </p>
        <h2 className="text-xl font-semibold text-navy">Sharing</h2>
        <p>
          With your consent, we may share relevant medical and contact details with partner hospitals
          and doctors solely for treatment coordination. We may also share limited technical or
          advertising-related data with Meta, Google, and other ad or analytics providers as needed
          to run and measure our campaigns, subject to their privacy policies.
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
