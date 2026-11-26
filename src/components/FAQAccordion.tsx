"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { FAQItem } from "@/lib/types";
import { faqSchema } from "@/lib/seo";

type FAQAccordionProps = {
  faqs: FAQItem[];
  title?: string;
  /** When false, parent page should inject FAQPage JSON-LD instead */
  includeSchema?: boolean;
};

function toPlainText(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\s+/g, " ").trim();
}

function InlineMarkdown({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;

  for (const match of text.matchAll(re)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }
    const label = match[1];
    const href = match[2];
    const className = "font-medium text-accent underline-offset-2 hover:underline";
    nodes.push(
      href.startsWith("/") || href.startsWith("#") ? (
        <Link key={`${href}-${index}`} href={href} className={className}>
          {label}
        </Link>
      ) : (
        <a
          key={`${href}-${index}`}
          href={href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      ),
    );
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <>{nodes}</>;
}

export function FAQAccordion({
  faqs,
  title = "Frequently Asked Questions",
  includeSchema = true,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs.length) return null;

  const schemaFaqs = faqs.map((faq) => ({
    question: faq.question,
    answer: toPlainText(faq.answer),
  }));

  return (
    <section className="w-full" aria-labelledby="faq-heading">
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(schemaFaqs)) }}
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
                  <InlineMarkdown text={faq.answer} />
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
