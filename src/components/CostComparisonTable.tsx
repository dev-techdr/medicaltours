import Link from "next/link";
import type { CostComparisonRow, CostRange } from "@/lib/data";

type CostComparisonTableProps = {
  india: CostRange;
  comparisons: CostComparisonRow[];
  procedureName: string;
  comparisonHref?: string;
};

function formatUsd(min: number, max: number) {
  return `$${min.toLocaleString()}–$${max.toLocaleString()}`;
}

export function CostComparisonTable({
  india,
  comparisons,
  procedureName,
  comparisonHref,
}: CostComparisonTableProps) {
  const rows = [
    { country: "India", min: india.min, max: india.max, highlight: true },
    ...comparisons.map((c) => ({ ...c, highlight: false })),
  ];

  return (
    <section aria-labelledby="cost-comparison-heading">
      <h2
        id="cost-comparison-heading"
        className="font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl"
      >
        {procedureName} cost: India vs other countries
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
        Typical package ranges in USD for international patients. Final quotes follow medical review.
      </p>
      <div className="mt-6 overflow-x-auto rounded-[var(--radius)] border border-line bg-white shadow-[var(--shadow-soft)]">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="border-b border-line bg-neutral/60">
            <tr>
              <th className="px-4 py-3 font-semibold text-navy">Country</th>
              <th className="px-4 py-3 font-semibold text-navy">Typical cost (USD)</th>
              <th className="px-4 py-3 font-semibold text-navy">vs India</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row) => {
              const midOther = (row.min + row.max) / 2;
              const midIndia = (india.min + india.max) / 2;
              const multiple =
                row.country === "India" ? null : Math.round((midOther / midIndia) * 10) / 10;
              return (
                <tr
                  key={row.country}
                  className={row.highlight ? "bg-accent-light/40" : undefined}
                >
                  <td className="px-4 py-3 font-medium text-navy">{row.country}</td>
                  <td className="px-4 py-3 text-muted">{formatUsd(row.min, row.max)}</td>
                  <td className="px-4 py-3 text-muted">
                    {multiple == null ? "Baseline" : `~${multiple}× higher`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {comparisonHref ? (
        <p className="mt-4">
          <Link href={comparisonHref} className="text-sm font-semibold text-accent hover:underline">
            Full {procedureName} cost comparison →
          </Link>
        </p>
      ) : null}
    </section>
  );
}
