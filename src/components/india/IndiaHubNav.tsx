import Link from "next/link";
import {
  getIndiaDomesticPath,
  getPagesByTier,
  TIER_LABELS,
  type IndiaDomesticTier,
} from "@/lib/india-domestic";

const HUB_TIERS: IndiaDomesticTier[] = [
  "tier1",
  "tier2",
  "tier3",
  "budget",
  "logistics",
];

type IndiaHubNavProps = {
  locale?: "en" | "te";
};

export function IndiaHubNav({ locale = "en" }: IndiaHubNavProps) {
  return (
    <nav className="mt-10 space-y-8" aria-label="Hyderabad domestic pages">
      {HUB_TIERS.map((tier) => {
        const pages = getPagesByTier(tier);
        if (!pages.length) return null;
        return (
          <section key={tier}>
            <p className="data-label">{TIER_LABELS[tier]}</p>
            <ul className="divider-grid mt-3 sm:grid-cols-2 lg:grid-cols-3">
              {pages.map((page) => {
                const hasTelugu = page.telugu && locale === "en";
                const href = getIndiaDomesticPath(page.slug, locale);
                return (
                  <li key={page.slug}>
                    <Link
                      href={href}
                      className="divider-grid-item block transition-colors hover:border-accent/30"
                    >
                      <p className="font-medium text-navy">{page.title}</p>
                      {hasTelugu ? (
                        <p className="mt-1 text-xs text-accent">
                          తెలుగు →{" "}
                          <span className="underline">
                            {getIndiaDomesticPath(page.slug, "te")}
                          </span>
                        </p>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </nav>
  );
}
