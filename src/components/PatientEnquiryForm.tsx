"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { SITE } from "@/lib/site";

const TREATMENT_OPTIONS = [
  "Heart surgery / Cardiology",
  "Knee or hip replacement",
  "Cancer treatment",
  "Liver or kidney transplant",
  "IVF & fertility",
  "Women's health / MTP (confidential)",
  "Women's health (confidential)",
  "Neurosurgery / Spine",
  "Cosmetic or plastic surgery",
  "Dental implants",
  "Eye surgery",
  "Bariatric / weight loss",
  "Other / not sure yet",
] as const;

const CARE_CONTEXT_OPTIONS = [
  "Self-pay / high deductible",
  "NHS or public wait-list",
  "Provincial / insurance wait-list",
  "Private quote too high",
  "Seeking second opinion only",
  "Other / not sure",
] as const;

const PREFERRED_CONTACT_OPTIONS = ["Email", "Phone", "WhatsApp"] as const;

type FormStatus =
  | { kind: "idle" }
  | { kind: "error"; message: string }
  | { kind: "success"; reference: string };

type PatientEnquiryFormProps = {
  className?: string;
  compact?: boolean;
  label?: string;
  title?: string;
  description?: string;
  submitLabel?: string;
  messagePlaceholder?: string;
  sourcePage?: string;
  /** Soft private CTA: hide WhatsApp paths; prefer form/email for sensitive care. */
  confidentialMode?: boolean;
  /** Email-first path for US/UK/Canada/Australia patients. */
  audience?: "default" | "western";
  defaultCountry?: string;
  defaultTreatment?: (typeof TREATMENT_OPTIONS)[number] | "";
  defaultPreferredCity?: string;
};

export function PatientEnquiryForm({
  className = "",
  compact = false,
  label = "Free consultation",
  title = "Tell us about your case",
  description,
  submitLabel = "Get free estimate",
  messagePlaceholder = "Briefly describe the diagnosis, reports available, and what you need help with.",
  sourcePage,
  confidentialMode = false,
  audience = "default",
  defaultCountry = "",
  defaultTreatment = "",
  defaultPreferredCity = "",
}: PatientEnquiryFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<FormStatus>({ kind: "idle" });
  const [submitting, setSubmitting] = useState(false);
  const western = audience === "western";
  const emailFirst = confidentialMode || western;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = formRef.current;
    if (!form || submitting) return;

    setSubmitting(true);
    setStatus({ kind: "idle" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; reference?: string }
        | null;

      if (!response.ok || !data?.ok) {
        setStatus({
          kind: "error",
          message:
            data?.error ||
            (emailFirst
              ? `Something went wrong. Please email ${SITE.email} instead.`
              : "Something went wrong. Please try WhatsApp instead."),
        });
        setSubmitting(false);
        return;
      }

      setStatus({ kind: "success", reference: data.reference || "" });
      form.reset();
      window.setTimeout(() => {
        router.push(western ? "/thank-you?audience=western" : "/thank-you");
      }, 1200);
    } catch {
      setStatus({
        kind: "error",
        message: emailFirst
          ? `Network error. Please try again or email ${SITE.email}.`
          : "Network error. Please try again or message us on WhatsApp.",
      });
      setSubmitting(false);
    }
  }

  return (
    <form
      id="enquiry-form"
      ref={formRef}
      onSubmit={handleSubmit}
      className={`relative scroll-mt-28 rounded-[var(--radius)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8 ${className}`}
      noValidate
    >
      <p className="data-label">{label}</p>
      <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-navy">{title}</h2>
      {(description || !compact) && (
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {description ?? (
            emailFirst ? (
              <>
                Share a few details and we will reply discreetly within 24–48 hours. Prefer email?{" "}
                <a href={`mailto:${SITE.email}`} className="font-semibold text-accent hover:underline">
                  {SITE.email}
                </a>
                .
              </>
            ) : (
              <>
                Share a few details and we will reply within 24–48 hours with hospital options and a
                cost estimate — or{" "}
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent hover:underline"
                >
                  WhatsApp us now
                </a>
                .
              </>
            )
          )}
        </p>
      )}

      {sourcePage ? <input type="hidden" name="sourcePage" value={sourcePage} /> : null}
      {western ? <input type="hidden" name="audience" value="western" /> : null}

      {/* Honeypot — clipped so it cannot cause horizontal page scroll */}
      <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-sm font-medium text-navy">Full name *</span>
          <input
            name="fullName"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            className="form-field"
            placeholder="Your full name"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-sm font-medium text-navy">
            {emailFirst ? "Phone *" : "WhatsApp / phone *"}
          </span>
          <input
            name="whatsapp"
            type="tel"
            required
            autoComplete="tel"
            className="form-field"
            placeholder="+1 / +44 / +61 or country code + number"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-sm font-medium text-navy">Email *</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="form-field"
            placeholder="you@example.com"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-sm font-medium text-navy">Country *</span>
          <input
            name="country"
            type="text"
            required
            autoComplete="country-name"
            className="form-field"
            placeholder={western ? "e.g. United States, UK, Canada, Australia" : "e.g. Nigeria, UAE, UK"}
            defaultValue={defaultCountry}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-navy">Treatment interest *</span>
          <select
            name="treatment"
            required
            className="form-field"
            defaultValue={defaultTreatment}
          >
            <option value="" disabled>
              Select a treatment
            </option>
            {TREATMENT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        {western ? (
          <>
            <label className="block sm:col-span-1">
              <span className="mb-1.5 block text-sm font-medium text-navy">
                Care context <span className="font-normal text-muted">(optional)</span>
              </span>
              <select name="careContext" className="form-field" defaultValue="">
                <option value="">Select if relevant</option>
                {CARE_CONTEXT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-1">
              <span className="mb-1.5 block text-sm font-medium text-navy">
                Preferred contact <span className="font-normal text-muted">(optional)</span>
              </span>
              <select name="preferredContact" className="form-field" defaultValue="Email">
                {PREFERRED_CONTACT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <p className="sm:col-span-2 rounded-[var(--radius-sm)] border border-line bg-neutral/40 px-4 py-3 text-xs leading-relaxed text-muted">
              Helpful to attach later by email: recent diagnosis or discharge summary, imaging
              reports (MRI/CT/X-ray), current medications, and any cash-pay or wait-list quotes from
              home. Incomplete files are fine — we will say what is missing.
            </p>
          </>
        ) : null}
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-navy">
            Medical condition / message *
          </span>
          <textarea
            name="message"
            required
            minLength={10}
            rows={4}
            className="form-field resize-y"
            placeholder={messagePlaceholder}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-navy">
            Preferred city in India{" "}
            <span className="font-normal text-muted">(optional)</span>
          </span>
          <input
            name="preferredCity"
            type="text"
            className="form-field"
            placeholder="Hyderabad, Delhi, Mumbai, Chennai, Bangalore…"
            defaultValue={defaultPreferredCity}
          />
        </label>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-ink">
        <input
          name="consent"
          type="checkbox"
          required
          value="yes"
          className="mt-1 h-4 w-4 shrink-0 rounded border-line text-accent focus:ring-accent"
        />
        <span>
          I agree to be contacted about my medical enquiry. My details stay confidential.
        </span>
      </label>

      {status.kind === "error" && (
        <p className="mt-4 rounded-[var(--radius-sm)] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {status.message}
        </p>
      )}
      {status.kind === "success" && (
        <p className="mt-4 rounded-[var(--radius-sm)] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Thanks — your enquiry was sent
          {status.reference ? ` (ref ${status.reference})` : ""}. Redirecting…
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={submitting}>
          {submitting ? "Sending…" : submitLabel}
        </button>
        {emailFirst ? (
          <a href={`mailto:${SITE.email}`} className="btn btn-outline w-full sm:w-auto">
            Email instead
          </a>
        ) : (
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline w-full sm:w-auto"
          >
            Prefer WhatsApp
          </a>
        )}
      </div>
    </form>
  );
}