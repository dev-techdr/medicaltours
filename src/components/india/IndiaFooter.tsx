import Link from "next/link";
import { SITE } from "@/lib/site";
import {
  getIndiaDomesticPath,
  getPagesByTier,
  TIER_LABELS,
  type IndiaDomesticTier,
} from "@/lib/india-domestic";

const FOOTER_TIERS: IndiaDomesticTier[] = [
  "tier1",
  "tier3",
  "budget",
  "logistics",
];

export function IndiaFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {FOOTER_TIERS.map((tier) => {
            const pages = getPagesByTier(tier);
            if (!pages.length) return null;
            return (
              <div key={tier}>
                <p className="data-label">{TIER_LABELS[tier]}</p>
                <ul className="mt-3 space-y-2">
                  {pages.slice(0, 6).map((page) => (
                    <li key={page.slug}>
                      <Link
                        href={getIndiaDomesticPath(page.slug)}
                        className="text-sm text-ink transition-colors hover:text-accent"
                      >
                        {page.title.replace(" in Hyderabad", "").replace("Hyderabad ", "")}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div>
            <p className="data-label">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-ink">
              <li>
                <a href={`tel:${SITE.phone}`} className="hover:text-accent">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={SITE.whatsappUrl} className="hover:text-accent">
                  WhatsApp
                </a>
              </li>
              <li>Hyderabad, Telangana</li>
            </ul>
            <p className="mt-4 text-xs text-muted">
              International patients:{" "}
              <Link href="/" className="text-accent hover:underline">
                medicaltoursindia.com
              </Link>
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-line pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} {SITE.legalName}. Domestic patient services — Hyderabad.
        </p>
      </div>
    </footer>
  );
}
