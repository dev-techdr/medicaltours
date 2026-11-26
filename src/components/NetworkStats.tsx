import { SITE } from "@/lib/site";

type NetworkStatsProps = {
  className?: string;
  referenceId?: string;
};

/** Mid-page proof strip — calm trust metrics, not a live dashboard. */
export function NetworkStats({ className = "" }: NetworkStatsProps) {
  return (
    <div
      className={`rounded-[var(--radius)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8 ${className}`}
    >
      <div className="max-w-2xl">
        <p className="data-label">Why families trust us</p>
        <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-navy sm:text-3xl">
          Clear support from first enquiry to recovery
        </h2>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-[var(--radius-sm)] bg-accent-light/70 p-5">
          <p className="font-display text-3xl font-medium text-navy">50–80%</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Typical savings vs US / UK treatment costs
          </p>
        </div>
        <div className="rounded-[var(--radius-sm)] bg-accent-light/70 p-5">
          <p className="font-display text-3xl font-medium text-navy">24–48h</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Typical time to hospital options and an estimate
          </p>
        </div>
        <div className="rounded-[var(--radius-sm)] bg-accent-light/70 p-5">
          <p className="font-display text-3xl font-medium text-navy">{SITE.hospitalCount}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Partner hospitals across India
          </p>
        </div>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-muted">
        {SITE.teamCount} dedicated care coordinators · JCI and NABH-linked hospitals · Visa, travel,
        and interpreter support · {SITE.patientCount} patients assisted from global markets
      </p>
    </div>
  );
}
