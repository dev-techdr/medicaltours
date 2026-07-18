import type { VisaStep } from "@/lib/types";

type VisaProcessProps = {
  countryName: string;
  demonym: string;
  steps: VisaStep[];
};

/** Country-specific medical visa steps — data-driven, placeholder-safe. */
export function VisaProcess({ countryName, demonym, steps }: VisaProcessProps) {
  return (
    <section>
      <p className="data-label">Visa guidance</p>
      <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-navy">
        Medical visa process for {demonym} patients
      </h2>
      <p className="mt-2 max-w-2xl text-muted">
        Practical steps for patients travelling from {countryName}. Requirements can vary by mission —
        we confirm the current checklist with your hospital invitation letter.
      </p>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="rounded-[var(--radius)] border border-line bg-white p-5 shadow-[var(--shadow-soft)]"
          >
            <p className="font-display text-3xl font-medium text-accent/30">{i + 1}</p>
            <h3 className="-mt-1 text-base font-semibold text-navy">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
