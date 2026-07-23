import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { getIndiaDomesticPath } from "@/lib/india-domestic";

const DOMESTIC_NAV = [
  { href: getIndiaDomesticPath(""), label: "Hyderabad Hub" },
  { href: getIndiaDomesticPath("ayushman-bharat-hospitals"), label: "Ayushman Bharat" },
  { href: getIndiaDomesticPath("aarogyasri-empanelled-hospitals"), label: "Aarogyasri" },
  { href: getIndiaDomesticPath("emi-medical-loans"), label: "EMI & Loans" },
  { href: getIndiaDomesticPath("low-cost-knee-replacement"), label: "Procedure Costs" },
  { href: "/contact-us", label: "Contact" },
] as const;

export function IndiaHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href={getIndiaDomesticPath("")} className="min-w-0 shrink">
          <Image
            src={SITE.logo}
            alt={`${SITE.name} — Domestic`}
            width={200}
            height={40}
            className="h-6 w-auto max-w-[120px] object-contain object-left sm:h-7 sm:max-w-[140px]"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </Link>
        <p className="hidden text-xs font-medium uppercase tracking-wide text-accent sm:block">
          For Indian Patients
        </p>
        <div className="flex items-center gap-2">
          <a href={`tel:${SITE.phone}`} className="btn btn-outline hidden !px-3 !py-2 sm:inline-flex">
            Call
          </a>
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary !px-3 !py-2 text-sm"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <nav
        className="border-t border-line/60 bg-surface/50"
        aria-label="Domestic navigation"
      >
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          {DOMESTIC_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-accent-light hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
