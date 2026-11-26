"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { SITE } from "@/lib/site";

const ACCREDITATION_OPTIONS = [
  "JCI",
  "NABH",
  "NABL",
  "JCI + NABH",
  "NABH + NABL",
  "Other / in progress",
] as const;

type FormStatus =
  | { kind: "idle" }
  | { kind: "error"; message: string }
  | { kind: "success"; reference: string };

type HospitalEmpanelmentFormProps = {
  className?: string;
};

export function HospitalEmpanelmentForm({ className = "" }: HospitalEmpanelmentFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<FormStatus>({ kind: "idle" });
  const [submitting, setSubmitting] = useState(false);

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
          message: data?.error || `Something went wrong. Please email ${SITE.email} instead.`,
        });
        setSubmitting(false);
        return;
      }

      setStatus({ kind: "success", reference: data.reference || "" });
      form.reset();
      window.setTimeout(() => {
        router.push("/thank-you");
      }, 1200);
    } catch {
      setStatus({
        kind: "error",
        message: `Network error. Please try again or email ${SITE.email}.`,
      });
      setSubmitting(false);
    }
  }

  return (
    <form
      id="empanelment-form"
      ref={formRef}
      onSubmit={handleSubmit}
      className={`relative scroll-mt-28 rounded-[var(--radius)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8 ${className}`}
      noValidate
    >
      <p className="data-label">Hospital partnership</p>
      <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-navy">
        Apply for empanelment
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Share your hospital details and a partnerships lead will follow up within 2–3 business days —
        or email{" "}
        <a href={`mailto:${SITE.email}`} className="font-semibold text-accent hover:underline">
          {SITE.email}
        </a>
        .
      </p>

      <input type="hidden" name="sourcePage" value="hospital-empanelment" />
      <input type="hidden" name="enquiryType" value="hospital" />
      <input type="hidden" name="treatment" value="Hospital Empanelment / MOU Partnership" />
      <input type="hidden" name="country" value="India" />

      <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-navy">Hospital name *</span>
          <input
            name="hospitalName"
            type="text"
            required
            minLength={2}
            className="form-field"
            placeholder="Legal / brand name of the hospital"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-sm font-medium text-navy">City *</span>
          <input
            name="preferredCity"
            type="text"
            required
            minLength={2}
            className="form-field"
            placeholder="Hyderabad, Delhi, Mumbai…"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-sm font-medium text-navy">Accreditation *</span>
          <select name="accreditation" required className="form-field" defaultValue="">
            <option value="" disabled>
              Select accreditation
            </option>
            {ACCREDITATION_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-navy">
            Key specialties *
          </span>
          <input
            name="specialties"
            type="text"
            required
            minLength={3}
            className="form-field"
            placeholder="e.g. Cardiac, Oncology, Orthopedics, Transplant"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-sm font-medium text-navy">Contact person *</span>
          <input
            name="fullName"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            className="form-field"
            placeholder="Full name"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-sm font-medium text-navy">Designation *</span>
          <input
            name="designation"
            type="text"
            required
            minLength={2}
            className="form-field"
            placeholder="e.g. Medical Director, BD Head"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-sm font-medium text-navy">Phone / WhatsApp *</span>
          <input
            name="whatsapp"
            type="tel"
            required
            autoComplete="tel"
            className="form-field"
            placeholder="+91…"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-sm font-medium text-navy">Work email *</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="form-field"
            placeholder="you@hospital.com"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-navy">
            Why partner with us? *
          </span>
          <textarea
            name="message"
            required
            minLength={10}
            rows={4}
            className="form-field resize-y"
            placeholder="Bed strength, international patient desk, languages supported, or specific partnership goals."
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
          I confirm I am authorised to discuss a partnership on behalf of this hospital, and agree to
          be contacted about this application.
        </span>
      </label>

      {status.kind === "error" && (
        <p className="mt-4 rounded-[var(--radius-sm)] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {status.message}
        </p>
      )}
      {status.kind === "success" && (
        <p className="mt-4 rounded-[var(--radius-sm)] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Thanks — your application was sent
          {status.reference ? ` (ref ${status.reference})` : ""}. Redirecting…
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={submitting}>
          {submitting ? "Sending…" : "Submit empanelment request"}
        </button>
        <a href={`mailto:${SITE.email}`} className="btn btn-outline w-full sm:w-auto">
          Email instead
        </a>
      </div>
    </form>
  );
}
