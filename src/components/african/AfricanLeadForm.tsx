"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AFRICAN_CONTACT,
  AFRICAN_COUNTRY_GROUPS,
  SPECIALTIES,
  TRAVEL_TIMELINES,
  URGENCY_OPTIONS,
} from "@/lib/african-content";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type FormStatus =
  | { kind: "idle" }
  | { kind: "error"; message: string }
  | { kind: "success"; reference: string };

const HIDDEN_UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;
const GADS_LABEL = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;

const fieldClass =
  "form-field w-full rounded-[14px] border border-[#DDE5E3] bg-[#FBFCFC] px-4 py-3.5 text-[#111B1A]";

export function AfricanLeadForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<FormStatus>({ kind: "idle" });
  const [submitting, setSubmitting] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [utmFields, setUtmFields] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmFields(
      Object.fromEntries(HIDDEN_UTM_FIELDS.map((field) => [field, params.get(field) ?? ""]))
    );
  }, []);

  const heardAbout = useMemo(() => {
    if (utmFields.gclid || utmFields.utm_medium?.toLowerCase().includes("cpc")) {
      return "Google ad";
    }
    if (utmFields.utm_source) {
      return utmFields.utm_source;
    }
    return "Google ad";
  }, [utmFields]);

  const totalFileSize = useMemo(
    () => files.reduce((sum, file) => sum + file.size, 0),
    [files]
  );

  useEffect(() => {
    if (status.kind !== "success") return;

    const timer = window.setTimeout(() => {
      router.push("/thank-you");
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [router, status]);

  function normalizeFiles(nextFiles: FileList | File[]) {
    const incoming = Array.from(nextFiles).slice(0, 5);
    const tooLarge = incoming.find((file) => file.size > 5 * 1024 * 1024);

    if (tooLarge) {
      setStatus({
        kind: "error",
        message: `${tooLarge.name} is larger than 5MB. Please upload a smaller file.`,
      });
      return;
    }

    setStatus({ kind: "idle" });
    setFiles(incoming);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = formRef.current;
    if (!form) return;

    setSubmitting(true);
    setStatus({ kind: "idle" });

    const formData = new FormData(form);
    formData.delete("reports");

    files.forEach((file) => {
      formData.append("reports", file);
    });

    try {
      const response = await fetch("/api/african-contact", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string; reference?: string };

      if (!response.ok || !payload.ok) {
        setStatus({
          kind: "error",
          message: payload.error || "We could not send your request. Please try again.",
        });
        return;
      }

      if (GADS_ID && GADS_LABEL && window.gtag) {
        window.gtag("event", "conversion", {
          send_to: `${GADS_ID}/${GADS_LABEL}`,
          value: 1,
          currency: "USD",
        });
      }

      setStatus({
        kind: "success",
        reference: payload.reference || "AFR-LEAD",
      });
      form.reset();
      setFiles([]);
      setShowMore(false);
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Please try again or message us on WhatsApp.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (status.kind === "success") {
    return (
      <div className="rounded-[18px] bg-white p-7 shadow-[0_28px_70px_rgba(7,30,27,0.24)] sm:p-8">
        <div className="inline-flex rounded-full bg-[#E8F5F1] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#0A3D35]">
          Request received
        </div>
        <h3 className="mt-5 font-[var(--font-african-display)] text-3xl tracking-[-0.03em] text-[#111B1A]">
          Your estimate request is in.
        </h3>
        <p className="mt-3 text-sm leading-7 text-[#4A5E5C]">
          Our coordination team will review your details and reply within 24 hours. Reference:{" "}
          <span className="font-[var(--font-african-mono)] text-[#0A3D35]">{status.reference}</span>
        </p>
        <a
          href={AFRICAN_CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-[14px] bg-[#0A3D35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#072b25]"
        >
          Continue on WhatsApp
        </a>
        <p className="mt-4 text-xs text-[#728280]">Redirecting you to the confirmation page now.</p>
      </div>
    );
  }

  return (
    <div className="rounded-[20px] border border-white/10 bg-white p-5 shadow-[0_28px_70px_rgba(7,30,27,0.24)] sm:p-7">
      <div className="mb-5 border-b border-[#E4EBE9] pb-5">
        <p className="font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-[#728280]">
          Free estimate · 60 seconds
        </p>
        <p className="mt-2 text-sm leading-7 text-[#4A5E5C]">
          Tell us the basics. We follow up with hospital options, cost range and next steps.
        </p>
      </div>

      <form
        ref={formRef}
        id="lead-form"
        action="/api/african-contact"
        method="post"
        encType="multipart/form-data"
        className="grid gap-4"
        onSubmit={handleSubmit}
      >
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />
        {HIDDEN_UTM_FIELDS.map((field) => (
          <input key={field} type="hidden" name={field} value={utmFields[field] ?? ""} readOnly />
        ))}
        <input type="hidden" name="outsideIndia" value="Yes" readOnly />
        <input type="hidden" name="visaAssistance" value="Not sure" readOnly />
        <input type="hidden" name="homeEstimate" value="Not provided" readOnly />
        <input type="hidden" name="heardAbout" value={heardAbout} readOnly />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name">
            <input
              name="fullName"
              required
              minLength={3}
              className={fieldClass}
              placeholder="Patient or attendant name"
            />
          </Field>

          <Field label="Country">
            <select name="country" required className={fieldClass}>
              <option value="">Select country</option>
              {AFRICAN_COUNTRY_GROUPS.map((group) => (
                <optgroup key={group.region} label={group.region}>
                  {group.countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </Field>

          <Field label="WhatsApp">
            <input name="whatsapp" required className={fieldClass} placeholder="+234..." />
          </Field>

          <Field label="Email">
            <input
              name="email"
              type="email"
              required
              className={fieldClass}
              placeholder="name@example.com"
            />
          </Field>
        </div>

        <Field label="Treatment needed">
          <select name="treatmentType" required className={fieldClass}>
            <option value="">Choose treatment</option>
            {SPECIALTIES.map((specialty) => (
              <option key={specialty.name} value={specialty.name}>
                {specialty.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="What do you need help with?">
          <textarea
            name="medicalCondition"
            required
            minLength={10}
            rows={3}
            className={`${fieldClass} min-h-24 resize-y`}
            placeholder="e.g. knee replacement advised, need cost and doctor options in India"
          />
        </Field>

        <button
          type="button"
          onClick={() => setShowMore((open) => !open)}
          className="flex w-full items-center justify-between rounded-[14px] border border-[#DDE5E3] bg-[#F9FBFA] px-4 py-3 text-left text-sm font-medium text-[#0A3D35]"
        >
          <span>Add urgency, travel date or reports (optional)</span>
          <span className="text-[#C8841A]">{showMore ? "−" : "+"}</span>
        </button>

        {showMore ? (
          <div className="grid gap-4 rounded-[16px] border border-[#DDE5E3] bg-[#F9FBFA] p-4 sm:grid-cols-2">
            <Field label="Urgency">
              <select name="urgency" defaultValue="Routine" className={fieldClass}>
                {URGENCY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="When to travel">
              <select name="travelTimeline" defaultValue="Just researching" className={fieldClass}>
                {TRAVEL_TIMELINES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Patient age (optional)" className="sm:col-span-2">
              <input
                name="patientAge"
                type="number"
                min={0}
                max={120}
                className={fieldClass}
                placeholder="52"
              />
            </Field>

            <Field label="Upload reports (optional)" className="sm:col-span-2">
              <div className="rounded-[14px] border border-dashed border-[#DDE5E3] bg-white px-4 py-5 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  name="reports"
                  multiple
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(event) => normalizeFiles(event.target.files ?? [])}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-full border border-[#DDE5E3] px-4 py-2 text-sm font-medium text-[#0A3D35]"
                >
                  Choose files
                </button>
                <p className="mt-2 text-xs text-[#728280]">Up to 5 files · JPG, PNG or PDF · 5MB each</p>
                {files.length > 0 ? (
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {files.map((file) => (
                      <span
                        key={`${file.name}-${file.size}`}
                        className="rounded-full bg-[#F9FBFA] px-3 py-1 text-xs text-[#111B1A]"
                      >
                        {file.name}
                      </span>
                    ))}
                  </div>
                ) : null}
                {totalFileSize > 0 ? (
                  <p className="mt-2 font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.14em] text-[#728280]">
                    {(totalFileSize / (1024 * 1024)).toFixed(2)} MB selected
                  </p>
                ) : null}
              </div>
            </Field>
          </div>
        ) : (
          <>
            <input type="hidden" name="urgency" value="Routine" readOnly />
            <input type="hidden" name="travelTimeline" value="Just researching" readOnly />
          </>
        )}

        <label className="flex items-start gap-3 rounded-[14px] border border-[#DDE5E3] bg-[#F9FBFA] px-4 py-3.5 text-sm leading-6 text-[#4A5E5C]">
          <input type="checkbox" name="consent" required className="mt-1" />
          <span>I agree to be contacted about my medical enquiry. My details stay confidential.</span>
        </label>

        {status.kind === "error" ? (
          <div className="rounded-[14px] border border-[#f4c0b0] bg-[#fff5f2] px-4 py-3 text-sm text-[#9b3f25]">
            {status.message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center rounded-[14px] bg-[#D95F3B] px-5 py-4 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(217,95,59,0.22)] transition hover:bg-[#c85431] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Sending..." : "Request My Free Estimate →"}
        </button>

        <p className="text-center text-xs text-[#728280]">
          🔒 Confidential · Reply within 24 hours · Or{" "}
          <a href={AFRICAN_CONTACT.whatsappUrl} className="text-[#0A3D35] underline">
            WhatsApp us
          </a>
        </p>
      </form>
    </div>
  );
}

type FieldProps = {
  label: string;
  className?: string;
  children: React.ReactNode;
};

function Field({ label, className = "", children }: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block font-[var(--font-african-mono)] text-[10px] uppercase tracking-[0.18em] text-[#4A5E5C]">
        {label}
      </span>
      {children}
    </label>
  );
}
