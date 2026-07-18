"use client";

import { useState } from "react";
import type { FAQItem } from "@/lib/types";
import { faqSchema } from "@/lib/seo";

type FAQAccordionProps = {
  faqs: FAQItem[];
  title?: string;
  /** When false, parent page should inject FAQPage JSON-LD instead */
  includeSchema?: boolean;
};

export function FAQAccordion({
  faqs,
  title = "Frequently Asked Questions",
  includeSchema = true,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs.length) return null;

  return (
    <section className="w-full" aria-labelledby="faq-heading">
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
        />
      )}
      <h2 id="faq-heading" className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6 divide-y divide-line overflow-hidden rounded-[var(--radius)] border border-line bg-white shadow-[var(--shadow-soft)]">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="px-5 py-1">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className="text-base font-medium text-navy">{faq.question}</span>
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-sm text-muted"
                  aria-hidden
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <p className="pb-4 text-sm leading-relaxed text-muted sm:text-base">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
