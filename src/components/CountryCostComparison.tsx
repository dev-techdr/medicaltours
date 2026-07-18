import Link from "next/link";
import { formatLocalCurrency } from "@/data/countryMeta";
import type { Treatment } from "@/lib/types";

type CountryCostMeta = {
  currencyCode: string;
  currencySymbol: string;
  usdToLocalApprox: number;
};

type CountryCostComparisonProps = {
  demonym: string;
  treatments: Treatment[];
  meta: CountryCostMeta;
};

function formatUsd(min: number, max: number) {
  return `$${min.toLocaleString()}–$${max.toLocaleString()}`;
}

function savingsPercent(t: Treatment) {
  const indiaMid = (t.costMinUsd + t.costMaxUsd) / 2;
  const usaMid = (t.costUsaMinUsd + t.costUsaMaxUsd) / 2;
  if (usaMid <= 0 || indiaMid >= usaMid) return null;
  return Math.round(((usaMid - indiaMid) / usaMid) * 100);
}

export function CountryCostComparison({
  demonym,
  treatments,
  meta,
}: CountryCostComparisonProps) {
  if (!treatments.length) return null;

  const showLocal = meta.currencyCode !== "USD";

  return (
    <section className="mt-12" aria-labelledby="cost-heading">
      <p className="data-label">Cost comparison</p>
      <h2 id="cost-heading" className="mt-1 font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl">
        Treatment costs in India for {demonym} patients
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        Indicative package ranges compared with typical US pricing
        {showLocal
          ? `, with an approximate ${meta.currencyCode} reference (~${meta.usdToLocalApprox.toLocaleString()} ${meta.currencyCode} per USD)`
          : ""}
        . Final quotes follow medical review of your reports.
      </p>

      {/* Desktop / tablet table */}
      <div className="mt-6 hidden overflow-hidden rounded-[var(--radius)] border border-line bg-white shadow-[var(--shadow-soft)] md:block md:pr-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-neutral/70">
                <th className="px-4 py-3.5 font-semibold text-navy lg:px-5">Treatment</th>
                <th className="px-4 py-3.5 font-semibold text-navy lg:px-5">India (USD)</th>
                {showLocal && (
                  <th className="px-4 py-3.5 font-semibold text-navy lg:px-5">
                    Approx. {meta.currencyCode}
                  </th>
                )}
                <th className="px-4 py-3.5 font-semibold text-navy lg:px-5">Typical USA</th>
                <th className="px-4 py-3.5 pr-16 font-semibold text-navy lg:px-5 lg:pr-20">
                  Est. savings
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {treatments.map((t) => {
                const savings = savingsPercent(t);
                return (
                  <tr key={t.slug} className="align-top transition-colors hover:bg-accent-light/40">
                    <td className="px-4 py-4 lg:px-5">
                      <p className="font-semibold text-navy">{t.name}</p>
                      <p className="mt-0.5 text-xs text-muted">{t.category}</p>
                      <Link
                        href={`/treatments/${t.slug}`}
                        className="mt-2 inline-block text-xs font-semibold text-accent hover:underline"
                      >
                        Details →
                      </Link>
                    </td>
                    <td className="px-4 py-4 lg:px-5">
                      <p className="font-semibold tabular-nums text-accent">
                        {formatUsd(t.costMinUsd, t.costMaxUsd)}
                      </p>
                    </td>
                    {showLocal && (
                      <td className="px-4 py-4 text-muted tabular-nums lg:px-5">
                        {formatLocalCurrency(t.costMinUsd, meta)} –{" "}
                        {formatLocalCurrency(t.costMaxUsd, meta)}
                      </td>
                    )}
                    <td className="px-4 py-4 text-muted tabular-nums lg:px-5">
                      {formatUsd(t.costUsaMinUsd, t.costUsaMaxUsd)}
                    </td>
                    <td className="px-4 py-4 pr-16 lg:px-5 lg:pr-20">
                      {savings != null ? (
                        <span className="inline-flex rounded-full bg-accent-light px-2.5 py-1 text-xs font-semibold text-accent">
                          ~{savings}% less
                        </span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile stacked cards */}
      <ul className="mt-6 space-y-3 md:hidden">
        {treatments.map((t) => {
          const savings = savingsPercent(t);
          return (
            <li
              key={t.slug}
              className="rounded-[var(--radius)] border border-line bg-white p-4 shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-accent">{t.category}</p>
                  <h3 className="mt-1 text-base font-semibold text-navy">{t.name}</h3>
                </div>
                {savings != null && (
                  <span className="shrink-0 rounded-full bg-accent-light px-2.5 py-1 text-xs font-semibold text-accent">
                    ~{savings}% less
                  </span>
                )}
              </div>

              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex items-baseline justify-between gap-3 border-b border-line/80 pb-2.5">
                  <dt className="text-muted">India</dt>
                  <dd className="font-semibold tabular-nums text-accent">
                    {formatUsd(t.costMinUsd, t.costMaxUsd)}
                  </dd>
                </div>
                {showLocal && (
                  <div className="flex items-baseline justify-between gap-3 border-b border-line/80 pb-2.5">
                    <dt className="text-muted">≈ {meta.currencyCode}</dt>
                    <dd className="max-w-[65%] text-right text-xs leading-snug tabular-nums text-ink sm:text-sm">
                      {formatLocalCurrency(t.costMinUsd, meta)} –{" "}
                      {formatLocalCurrency(t.costMaxUsd, meta)}
                    </dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-muted">Typical USA</dt>
                  <dd className="tabular-nums text-muted">
                    {formatUsd(t.costUsaMinUsd, t.costUsaMaxUsd)}
                  </dd>
                </div>
              </dl>

              <Link
                href={`/treatments/${t.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
              >
                {t.name} details →
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-xs leading-relaxed text-muted sm:text-sm">
        Savings vs USA are estimates from mid-range package figures. Exchange rates change — request a
        written quote for your case.
      </p>
    </section>
  );
}
