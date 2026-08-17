type StarRatingProps = {
  rating: number;
  count?: number;
  size?: "sm" | "md";
};

const STAR_PATH =
  "M10 1.6 12.47 7l5.93.5-4.5 3.86 1.37 5.84L10 14.3l-5.27 2.9L6.1 11.36 1.6 7.5 7.53 7 10 1.6Z";

function StarIcon({ fill, className }: { fill: number; className: string }) {
  const clipped = Math.round(Math.min(1, Math.max(0, fill)) * 100);

  return (
    <span className={`relative inline-block ${className}`}>
      <svg className="block h-full w-full text-line" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path d={STAR_PATH} />
      </svg>
      {clipped > 0 ? (
        <span
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${clipped}%` }}
        >
          <svg
            className="block h-full w-[1000%] max-w-none text-gold"
            viewBox="0 0 20 20"
            fill="currentColor"
            preserveAspectRatio="xMinYMid meet"
            aria-hidden
          >
            <path d={STAR_PATH} />
          </svg>
        </span>
      ) : null}
    </span>
  );
}

export function StarRating({ rating, count, size = "md" }: StarRatingProps) {
  const clamped = Math.min(5, Math.max(0, rating));
  const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${size === "sm" ? "" : "mt-2"}`}>
      <span className="flex items-center gap-0.5" aria-label={`${clamped.toFixed(1)} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} fill={clamped - i} className={starSize} />
        ))}
      </span>
      {count != null ? (
        <p className={size === "sm" ? "text-xs text-muted" : "text-sm text-muted"}>
          <span className="font-semibold text-navy">{clamped.toFixed(1)}</span> (
          {count.toLocaleString()}
          {count >= 1000 ? "+" : ""} reviews)
        </p>
      ) : (
        <p className={size === "sm" ? "text-xs font-semibold text-navy" : "text-sm font-semibold text-navy"}>
          {clamped.toFixed(1)}
        </p>
      )}
    </div>
  );
}
