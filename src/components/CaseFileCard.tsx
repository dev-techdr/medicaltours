import { CostHighlight } from "@/components/CostHighlight";

type CaseFileRow = {
  label: string;
  value: string;
  accent?: boolean;
};

type CaseFileCardProps = {
  label?: string;
  referenceId: string;
  verified?: boolean;
  rows?: CaseFileRow[];
  children?: React.ReactNode;
  className?: string;
};

function looksLikeMoney(value: string) {
  return /\$[\d,]/.test(value) || /\d[\d,]*(?:\.\d+)?\s*[A-Z]{3}\b/.test(value) || /~\d+%/.test(value);
}

function formatCaseValue(value: string) {
  if (looksLikeMoney(value)) {
    return <CostHighlight>{value}</CostHighlight>;
  }
  return value;
}

export function CaseFileCard({
  label = "Care summary",
  referenceId,
  verified = true,
  rows,
  children,
  className = "",
}: CaseFileCardProps) {
  return (
    <div className={`case-file ${className}`}>
      <div className="case-file-tab">{label}</div>
      <div className="case-file-body">
        <div className="case-file-meta">
          <span className="case-file-ref">{referenceId}</span>
          {verified && (
            <span className="case-file-verified">
              <VerifiedIcon />
              Verified
            </span>
          )}
        </div>
        {rows?.map((row) => (
          <div key={row.label} className="case-file-row">
            <span className="case-file-label">{row.label}</span>
            <span
              className={`case-file-value ${row.accent && !looksLikeMoney(row.value) ? "case-file-value-accent" : ""}`}
            >
              {formatCaseValue(row.value)}
            </span>
          </div>
        ))}
        {children}
      </div>
    </div>
  );
}

function VerifiedIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none" aria-hidden>
      <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M3.5 6.1L5.2 7.8L8.5 4.2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
