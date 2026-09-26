/** Compact partner badge. */
export function VerifiedPartnerBadge({ mouYear }: { mouYear?: number }) {
  return (
    <span className="case-file-verified inline-flex shrink-0 rounded-full bg-accent-light px-2.5 py-1">
      <VerifiedIcon />
      Verified partner{mouYear ? ` · since ${mouYear}` : ""}
    </span>
  );
}

function VerifiedIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
      <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M3.5 6.1L5.2 7.8L8.5 4.2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}
