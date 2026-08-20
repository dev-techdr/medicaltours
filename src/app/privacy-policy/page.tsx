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
        <p>Last updated: August 20, 2026</p>
        <h2 className="text-xl font-semibold text-navy">Authorization / ownership</h2>
        <p>{SITE.ownershipDeclaration}</p>
        <p>
          {SITE.name} (“we”, “us”), operated by {SITE.legalName}, respects your privacy and treats
          patient personal information and medical records as confidential. This policy explains what
          we collect, how we use it, who we may share it with, how we protect it, and how long we
          keep it when you contact us or use medicaltoursindia.com.
        </p>

        <h2 className="text-xl font-semibold text-navy">Patient personal information</h2>
        <p>
          We may collect personal details such as your name, age or date of birth, gender, contact
          details (phone, WhatsApp, email), nationality, passport or travel-related details needed for
          medical visa support, preferred language, attendant/family contact details you provide, and
          communications related to your care inquiry.
        </p>

        <h2 className="text-xl font-semibold text-navy">Medical reports and records</h2>
        <p>
          You may voluntarily share medical information with us to coordinate care. This can include
          medical history summaries, diagnosis notes, lab reports, imaging (for example CT, MRI, X-ray),
          prescriptions, discharge summaries, and other clinical documents. We use these only to obtain
          hospital or doctor opinions, prepare treatment and cost guidance, and support coordination of
          your medical travel. We are a medical tourism facilitator and do not replace your treating
          hospital’s medical record system.
        </p>

        <h2 className="text-xl font-semibold text-navy">How information is collected</h2>
        <p>
          Information is collected when you contact us by phone, WhatsApp, email, website forms, or
          other channels you choose; when you upload or send medical documents; and when your
          authorised family member or attendant contacts us on your behalf. When you visit our website
          or interact with our ads, we may also collect device and usage data (such as IP address,
          browser type, pages viewed, and referral source) through cookies, pixels, and similar
          technologies.
        </p>

        <h2 className="text-xl font-semibold text-navy">How information is used</h2>
        <p>
          We use information to respond to inquiries, arrange hospital or doctor opinions, prepare
          cost estimates, support medical visa and travel documentation, coordinate admission and
          logistics with partner facilities, communicate with you and your nominated contacts, improve
          our services, and measure and improve our advertising. We do not sell personal data.
        </p>

        <h2 className="text-xl font-semibold text-navy">Who information may be shared with</h2>
        <p>
          We share information only as needed for facilitation, legal compliance, or with your
          consent. Recipients may include:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Partner hospitals, doctors, and clinical teams for treatment coordination</li>
          <li>
            Interpreters, travel, or logistics partners when required to deliver services you request
          </li>
          <li>
            Meta, Google, and similar advertising or analytics providers for limited technical or
            campaign measurement data, subject to their privacy policies
          </li>
          <li>Authorities or service providers when required by applicable law</li>
        </ul>

        <h2 className="text-xl font-semibold text-navy">Hospital and doctor sharing</h2>
        <p>
          With your consent (or the consent of an authorised representative), we may share relevant
          medical and contact details with partner hospitals and doctors solely for treatment
          evaluation and coordination. We share only what is reasonably necessary for the opinion or
          care pathway being requested. Clinical decisions remain with licensed doctors and hospitals.
        </p>

        <h2 className="text-xl font-semibold text-navy">Confidentiality</h2>
        <p>
          Patient personal information and medical reports are treated as confidential. Access is
          limited to authorised {SITE.name} team members who need the information to coordinate your
          inquiry or care journey. We do not disclose medical details to unrelated third parties for
          marketing of your case, and we expect partner hospitals and doctors to handle shared
          information under their own professional and institutional confidentiality obligations.
        </p>

        <h2 className="text-xl font-semibold text-navy">Patient consent</h2>
        <p>
          By contacting us and submitting personal or medical information, you consent to our
          collecting and using that information as described in this policy. Sharing with hospitals or
          doctors for treatment coordination is done with your consent or at your request. You may
          withdraw consent for further facilitation by contacting us; withdrawal does not affect
          processing already completed or information already shared with a hospital at your request.
        </p>

        <h2 className="text-xl font-semibold text-navy">Data security</h2>
        <p>
          We take reasonable technical and organisational measures to protect personal and medical
          information against unauthorised access, loss, misuse, or disclosure. These measures include
          restricting access to authorised staff, using password-protected accounts and devices where
          applicable, careful handling of documents shared by email or messaging apps, and avoiding
          unnecessary copying or forwarding of medical files. No method of transmission or storage is
          completely secure; if you believe your information has been compromised through our
          channels, contact us promptly.
        </p>

        <h2 className="text-xl font-semibold text-navy">Data retention and deletion</h2>
        <p>
          We retain patient inquiry and coordination records for as long as reasonably needed to
          provide services, maintain continuity of support, meet operational or legal requirements, and
          resolve disputes. As a general practice, inactive inquiry files may be reviewed for deletion
          or anonymisation after a retention period of up to seven (7) years, unless a longer period is
          required by law, ongoing treatment coordination, or a legitimate business need. You may
          request access to, correction of, or deletion of personal information we hold about you by
          contacting us. We will respond within a reasonable time, subject to legal and operational
          limits (for example, where records have already been shared with a hospital for care).
        </p>

        <h2 className="text-xl font-semibold text-navy">Advertising and analytics</h2>
        <p>
          We use advertising and analytics tools — including Meta Ads (Facebook and Instagram), Google
          Ads, and similar advertising platforms — to show relevant ads, measure campaign
          performance, and reach people who may be interested in our services. These platforms may
          collect or receive information about your visits to our site and interactions with our ads
          (for example via the Meta Pixel or similar tracking tags) so that we can deliver, personalize,
          and report on advertising. We do not intentionally upload medical reports to advertising
          platforms. You can manage ad preferences through your Meta, Google, or device settings, and
          you may control cookies in your browser.
        </p>

        <h2 className="text-xl font-semibold text-navy">Contact</h2>
        <p>
          Questions about privacy, confidentiality, access, correction, or deletion:{" "}
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
        <p>
          {SITE.name} (a brand of {SITE.legalName}), Hyderabad, India.
        </p>
      </div>
    </Container>
  );
}
