import Link from "next/link";
import { AnswerBlock } from "@/components/AnswerBlock";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PatientEnquiryForm } from "@/components/PatientEnquiryForm";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getCategoryBySlug,
  getDoctorBySlug,
  getFaqsForProcedure,
  getRelatedProcedures,
  procedurePath,
  type Procedure,
} from "@/lib/data";
import { SITE } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

type MtpTreatmentTemplateProps = {
  procedure: Procedure;
};

const LEGAL_REVIEW_NOTE =
  "This summary reflects the Medical Termination of Pregnancy Act, 1971 as amended by the Medical Termination of Pregnancy (Amendment) Act, 2021, and the Medical Termination of Pregnancy (Amendment) Rules, 2021 (including Rule 3B). Laws and hospital protocols can change. Confirm current requirements with the treating registered medical practitioner, hospital legal desk, and independent legal counsel before travel.";

export function MtpTreatmentTemplate({ procedure }: MtpTreatmentTemplateProps) {
  const category = getCategoryBySlug(procedure.categorySlug);
  const path = procedurePath(procedure);
  const faqs = getFaqsForProcedure(procedure.faqSlugKey);
  const related = getRelatedProcedures(procedure);
  const reviewer = procedure.doctorSlugs
    .map((slug) => getDoctorBySlug(slug))
    .find(Boolean);

  const crumbs = [
    { name: "Treatments", href: "/treatments" },
    ...(category
      ? [{ name: category.name, href: `/treatments/${category.slug}` }]
      : []),
    { name: procedure.name, href: path },
  ];

  return (
    <Container className="py-10 sm:py-14">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      {faqs.length > 0 ? <JsonLd data={faqSchema(faqs)} /> : null}

      <Breadcrumb items={crumbs} />

      <Reveal>
        <p className="data-label">Women&apos;s health · Confidential care</p>
        <h1 className="mt-3 max-w-4xl font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
          {procedure.h1}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
          {procedure.shortAnswer ?? procedure.overview}
        </p>
      </Reveal>

      <Reveal className="mt-8">
        <AnswerBlock label="Quick answer">
          Medical termination of pregnancy (MTP) in India is lawful only when performed by a
          registered medical practitioner under the MTP Act and Rules. Care is confidential,
          clinically supervised, and offered within gestational and eligibility limits set by law.
          TechdrHealth coordinates discreet hospital matching and logistics — not the medical
          decision itself.
        </AnswerBlock>
      </Reveal>

      <section className="mt-14 max-w-3xl" aria-labelledby="mtp-overview">
        <Reveal>
          <h2 id="mtp-overview" className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl">
            Overview
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink">{procedure.overview}</p>
          <p className="mt-4 text-base leading-relaxed text-ink">
            Enquiries are handled with discretion. Your personal details are shared only with the
            care team involved in coordinating your case. Clinical decisions — including whether
            MTP is appropriate and which method is used — rest with the treating OB-GYN after
            examination, ultrasound dating, and counselling. See the{" "}
            <a href="#legal-framework" className="font-semibold text-accent hover:underline">
              legal framework
            </a>{" "}
            section for how Indian law frames eligibility and consent.
          </p>
        </Reveal>
      </section>

      <section
        id="legal-framework"
        className="mt-14 scroll-mt-28 max-w-3xl"
        aria-labelledby="mtp-legal"
      >
        <Reveal>
          <h2 id="mtp-legal" className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl">
            Legal framework in India
          </h2>
          <p className="mt-3 rounded-[var(--radius-sm)] border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950">
            Critical: verify with legal counsel and the treating hospital. {LEGAL_REVIEW_NOTE}
          </p>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink">
            <p>
              Under the MTP Act as amended in 2021, a pregnancy may be terminated by a registered
              medical practitioner (RMP) when the RMP(s), forming an opinion in good faith, conclude
              that continuing the pregnancy would involve risk to the woman&apos;s life or grave
              injury to her physical or mental health, or that there is a substantial risk the child,
              if born, would suffer from such physical or mental abnormalities as to be seriously
              handicapped. Failure of contraception may be presumed to constitute grave injury to
              mental health for this purpose. The Act applies to married and unmarried women.
            </p>
            <ul className="list-disc space-y-3 pl-5">
              <li>
                <strong className="font-semibold text-navy">Up to 20 weeks:</strong> opinion of one
                RMP is required.
              </li>
              <li>
                <strong className="font-semibold text-navy">Above 20 weeks and up to 24 weeks:</strong>{" "}
                opinion of not less than two RMPs, and only for categories of women prescribed in
                Rule 3B of the MTP Rules 2021 — including survivors of sexual assault, rape or
                incest; minors; change of marital status during the pregnancy (widowhood or divorce);
                women with major physical disabilities under the Rights of Persons with Disabilities
                Act, 2016; women with mental illness including mental retardation; fetal
                malformation with substantial risk of incompatibility with life or serious handicap
                if born; and women with pregnancy in humanitarian, disaster, or emergency settings as
                declared by the government. In 2022, the Supreme Court of India held that unmarried
                women facing a change in material circumstances may also access termination in this
                window on the same footing as married women (X v. Principal Secretary, Health &amp;
                Family Welfare, NCT of Delhi).
              </li>
              <li>
                <strong className="font-semibold text-navy">Beyond 24 weeks:</strong> the gestational
                length limits in section 3(2) do not apply where termination is necessitated by
                substantial fetal abnormalities diagnosed by a State/UT Medical Board (gynaecologist,
                paediatrician, radiologist/sonologist, and other members as notified). There is no
                statutory upper gestational limit in that Medical Board pathway; safety for the woman
                at that gestation remains a clinical judgment.
              </li>
            </ul>
            <p>
              <strong className="font-semibold text-navy">Consent:</strong> for an adult woman with
              capacity, termination requires her own consent — not a spouse or partner. For a minor
              or a woman with mental illness as defined under the Act, written consent of a guardian
              is required. The Act also protects confidentiality of the woman&apos;s name and
              particulars except as authorised by law.
            </p>
            <p>
              <strong className="font-semibold text-navy">International patients:</strong> expect
              passport identification, gestational dating ultrasound, relevant medical reports, and
              hospital MTP documentation (opinion and consent forms as applicable). Visa and travel
              timing must allow for counselling, investigations, the procedure, and medically advised
              recovery before flying. Eligibility under Indian law does not replace any obligations
              under your home-country law — discuss cross-border considerations with independent
              counsel.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="mtp-who">
        <Reveal>
          <h2 id="mtp-who" className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl">
            Who this service is for
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink">
            We coordinate MTP care for women whose clinical situation falls within India&apos;s legal
            framework — including maternal health risk, diagnosed fetal abnormality pathways, and
            personal circumstances recognised under the Act and Rules. Care is framed around patient
            choice and clinical need after specialist assessment.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink">
            We do not advise anyone to travel in order to avoid or circumvent the laws of another
            country. If you are considering care abroad, obtain independent medical and legal advice
            about your own jurisdiction as well as Indian requirements.
          </p>
        </Reveal>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="mtp-options">
        <Reveal>
          <h2 id="mtp-options" className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl">
            Procedure options
          </h2>
          <div className="mt-6 space-y-6">
            <div className="rounded-[var(--radius)] border border-line bg-white p-5 sm:p-6">
              <h3 className="font-display text-xl font-medium text-navy">Medical (pill-based) method</h3>
              <p className="mt-3 text-base leading-relaxed text-ink">
                Medication abortion uses prescribed medicines under clinical supervision within the
                gestational window your OB-GYN confirms as appropriate (commonly earlier pregnancy,
                subject to protocol and legality). You can expect counselling, baseline assessment,
                clear instructions on dosing and bleeding, and planned follow-up to confirm
                completion. Seek urgent care for heavy bleeding, fever, severe pain, or incomplete
                abortion symptoms.
              </p>
            </div>
            <div className="rounded-[var(--radius)] border border-line bg-white p-5 sm:p-6">
              <h3 className="font-display text-xl font-medium text-navy">Surgical method</h3>
              <p className="mt-3 text-base leading-relaxed text-ink">
                Surgical MTP (for example vacuum aspiration or dilatation and evacuation, depending
                on gestation) is performed in an appropriate clinical facility by a qualified RMP.
                Anaesthesia or analgesia, sterile technique, and post-procedure observation are part
                of standard care. Your doctor will explain expected bleeding, activity limits, and
                warning signs before discharge.
              </p>
            </div>
            <p className="text-base leading-relaxed text-ink">
              Method selection is clinical: ultrasound dating of gestation, medical history,
              examination, and counselling determine whether medical or surgical care is safer and
              appropriate. No online self-assessment replaces an in-person (or hospital-supervised)
              evaluation.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="mtp-safety">
        <Reveal>
          <h2 id="mtp-safety" className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl">
            Safety &amp; medical standards
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-relaxed text-ink">
            <li>
              Partner hospitals are selected with attention to recognised accreditation such as{" "}
              <Link href="/accreditations-certifications" className="font-semibold text-accent hover:underline">
                JCI and/or NABH
              </Link>{" "}
              where available for the centre.
            </li>
            <li>Care is delivered by qualified obstetrician-gynaecologists registered to provide MTP.</li>
            <li>
              Pre-procedure counselling and screening include confirmation of pregnancy location and
              gestation, relevant blood work, and discussion of alternatives and risks as clinically
              indicated.
            </li>
            <li>
              Pain management and aftercare follow the treating hospital&apos;s protocol, including
              contraception counselling when appropriate and a clear escalation path for complications.
            </li>
          </ul>
        </Reveal>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="mtp-privacy">
        <Reveal>
          <h2 id="mtp-privacy" className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl">
            Confidentiality &amp; patient support
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-relaxed text-ink">
            <li>
              Enquiry details are treated as confidential patient information and used only to
              coordinate care. See our{" "}
              <Link href="/privacy-policy" className="font-semibold text-accent hover:underline">
                privacy policy
              </Link>
              .
            </li>
            <li>Counselling support can be arranged before and after the procedure through the hospital team.</li>
            <li>
              Private video consultation with a specialist may be available before travel when
              clinically appropriate, so questions can be addressed discreetly.
            </li>
          </ul>
        </Reveal>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="mtp-journey">
        <Reveal>
          <h2 id="mtp-journey" className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl">
            What to expect: patient journey
          </h2>
          <ol className="mt-6 space-y-4">
            {procedure.procedureSteps.map((step, index) => (
              <li
                key={step}
                className="grid gap-3 rounded-[var(--radius)] border border-line bg-white p-5 sm:grid-cols-[auto_1fr] sm:gap-5"
              >
                <span className="font-display text-3xl font-medium text-accent/30">{index + 1}</span>
                <p className="text-base leading-relaxed text-ink">{step}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Travel and lodging stay brief on this page — see{" "}
            <Link
              href="/travel-accommodation-assistance"
              className="font-semibold text-accent hover:underline"
            >
              travel &amp; accommodation support
            </Link>{" "}
            for logistics. Typical recovery guidance after early MTP is short;{" "}
            <strong className="font-medium text-navy">{procedure.recoveryTime}</strong> Fit-to-fly
            clearance always comes from your treating doctor.
          </p>
        </Reveal>
      </section>

      {faqs.length > 0 ? (
        <section className="mt-14 max-w-3xl" aria-labelledby="mtp-faq">
          <Reveal>
            <h2 id="mtp-faq" className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl">
              Frequently asked questions
            </h2>
            <div className="mt-6">
              <FAQAccordion faqs={faqs} />
            </div>
          </Reveal>
        </section>
      ) : null}

      {reviewer ? (
        <section className="mt-14 max-w-3xl" aria-labelledby="mtp-reviewer">
          <Reveal>
            <div className="rounded-[var(--radius)] border border-line bg-white p-5 sm:p-6">
              <p className="data-label">Clinical review</p>
              <h2 id="mtp-reviewer" className="mt-2 font-display text-xl font-medium text-navy">
                Medically reviewed by {reviewer.name}, MS Obstetrics &amp; Gynecology
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {reviewer.shortAnswer} Based in {reviewer.city} ({reviewer.experienceYears}+ years).
                Page content last reviewed July 2026 for clinical framing and patient-safety
                language. Legal citations should still be confirmed with counsel and the treating
                hospital before reliance.
              </p>
            </div>
          </Reveal>
        </section>
      ) : null}

      <section id="confidential-contact" className="mt-14 scroll-mt-28" aria-labelledby="mtp-cta">
        <Reveal>
          <h2 id="mtp-cta" className="sr-only">
            Confidential contact
          </h2>
          <PatientEnquiryForm
            sourcePage={path}
            confidentialMode
            label="Private enquiry"
            title="Speak confidentially with our patient care team"
            description="Use this private form or email. We respond discreetly — usually within 24–48 hours — and only share your details with the care team coordinating your case."
            submitLabel="Send confidential enquiry"
            messagePlaceholder="Share gestational dating (if known), relevant reports or scans available, and any questions for the care team. You do not need to include identifying details beyond contact fields."
            defaultTreatment="Women's health / MTP (confidential)"
          />
          <p className="mt-4 text-sm text-muted">
            Prefer email? Write to{" "}
            <a href={`mailto:${SITE.email}`} className="font-semibold text-accent hover:underline">
              {SITE.email}
            </a>{" "}
            with subject line &ldquo;Confidential women&apos;s health enquiry.&rdquo;
          </p>
        </Reveal>
      </section>

      {related.length > 0 ? (
        <section className="mt-14" aria-labelledby="mtp-related">
          <Reveal>
            <h2 id="mtp-related" className="font-display text-2xl font-medium tracking-tight text-navy">
              Related women&apos;s health care
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={procedurePath(item)}
                    className="block rounded-[var(--radius)] border border-line bg-white p-4 text-sm font-semibold text-navy transition-colors hover:border-accent"
                  >
                    {item.name} →
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      ) : null}

      <aside className="mt-14 max-w-3xl rounded-[var(--radius)] border border-line bg-white px-5 py-5 text-sm leading-relaxed text-muted sm:px-6">
        <p className="font-semibold text-navy">Legal &amp; medical disclaimer</p>
        <p className="mt-2">
          This page is for general information only. It is not medical advice, not legal advice, and
          not a substitute for consultation with a qualified registered medical practitioner or
          licensed attorney. TechdrHealth facilitates coordination with partner hospitals and does
          not itself provide MTP services or practice medicine. Patients should consult local law
          regarding cross-border reproductive healthcare and confirm all clinical and legal
          requirements with the treating hospital before travelling.
        </p>
      </aside>
    </Container>
  );
}
