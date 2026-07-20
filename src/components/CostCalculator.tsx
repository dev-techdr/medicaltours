"use client";

import { useMemo, useState } from "react";
import { CaseFileCard } from "@/components/CaseFileCard";
import { CostHighlight } from "@/components/CostHighlight";
import {
  getAllTreatmentCostOptions,
  getTreatmentCostConfig,
} from "@/data/treatmentCosts";
import { SITE } from "@/lib/site";

const treatments = getAllTreatmentCostOptions();

function whatsappQuoteUrl(treatmentName: string) {
  const text = `Hello Medical Tours India — I would like an exact quote for ${treatmentName} in India.`;
  return `${SITE.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

export function CostCalculator() {
  const [treatmentSlug, setTreatmentSlug] = useState(treatments[0]?.slug ?? "");

  const config = useMemo(
    () => getTreatmentCostConfig(treatmentSlug),
    [treatmentSlug]
  );

  const savingsPercent = useMemo(() => {
    if (!config) return 0;
    const usaMid = (config.usaMinUsd + config.usaMaxUsd) / 2;
    const indiaMid = (config.packageMinUsd + config.packageMaxUsd) / 2;
    return Math.max(0, Math.round(((usaMid - indiaMid) / usaMid) * 100));
  }, [config]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <div className="rounded-[var(--radius)] border border-line bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6">
        <p className="data-label">Choose a treatment</p>
        <label htmlFor="treatment" className="mt-4 block text-sm font-medium text-navy">
          Treatment
        </label>
        <select
          id="treatment"
          value={treatmentSlug}
          onChange={(e) => setTreatmentSlug(e.target.value)}
          className="form-field mt-2"
        >
          {treatments.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name}
            </option>
          ))}
        </select>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Estimates are indicative package ranges. Final quotes follow medical review at a partner
          hospital. Flights are not included.
        </p>
      </div>

      {config ? (
        <CaseFileCard
          label="Your estimate"
          referenceId={`${config.treatmentName} · planning range`}
          rows={[
            { label: "Treatment", value: config.treatmentName },
            {
              label: "India package range",
              value: `$${config.packageMinUsd.toLocaleString()}–$${config.packageMaxUsd.toLocaleString()}`,
              accent: true,
            },
            {
              label: "Typical US range",
              value: `$${config.usaMinUsd.toLocaleString()}–$${config.usaMaxUsd.toLocaleString()}`,
            },
            {
              label: "Indicative savings",
              value: `~${savingsPercent}%`,
              accent: true,
            },
            { label: "Category", value: config.category },
            { label: "Typical quote window", value: "24–48 hrs" },
          ]}
        >
          <div className="mt-4 border-t border-line pt-4">
            <p className="data-label">What’s usually in the range</p>
            <ul className="mt-2 space-y-2">
              {config.lineItems.map((item) => (
                <li
                  key={item.label}
                  className="flex justify-between gap-3 text-sm text-muted"
                >
                  <span>{item.label}</span>
                  <CostHighlight>
                    ${item.minUsd.toLocaleString()}–${item.maxUsd.toLocaleString()}
                  </CostHighlight>
                </li>
              ))}
            </ul>
            <a
              href={whatsappQuoteUrl(config.treatmentName)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-block mt-5"
            >
              Get an exact quote for your case
            </a>
            <p className="mt-2 text-center text-xs text-muted">
              Opens WhatsApp with {config.treatmentName} pre-filled
            </p>
          </div>
        </CaseFileCard>
      ) : (
        <p className="text-muted">Select a treatment to see an estimate.</p>
      )}
    </div>
  );
}
