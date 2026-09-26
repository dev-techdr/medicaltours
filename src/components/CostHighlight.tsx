import type { ReactNode } from "react";

type CostHighlightProps = {
  children: ReactNode;
  className?: string;
  /** Soft tint for dark surfaces */
  tone?: "default" | "light";
};

export function CostHighlight({
  children,
  className = "",
  tone = "default",
}: CostHighlightProps) {
  const toneClass = tone === "light" ? "cost-highlight-light" : "cost-highlight";

  return <span className={`${toneClass} ${className}`.trim()}>{children}</span>;
}

/** `$4,000–$8,000` or `$4,000–$8,000 USD` */
export function UsdRange({
  min,
  max,
  suffix,
  tone,
  className,
}: {
  min: number;
  max: number;
  suffix?: string;
  tone?: CostHighlightProps["tone"];
  className?: string;
}) {
  return (
    <CostHighlight tone={tone} className={className}>
      ${min.toLocaleString()}–${max.toLocaleString()}
      {suffix ? ` ${suffix}` : ""}
    </CostHighlight>
  );
}

/** Single amount like `$1,200` */
export function UsdAmount({
  amount,
  tone,
  className,
}: {
  amount: number;
  tone?: CostHighlightProps["tone"];
  className?: string;
}) {
  return (
    <CostHighlight tone={tone} className={className}>
      ${amount.toLocaleString()}
    </CostHighlight>
  );
}
