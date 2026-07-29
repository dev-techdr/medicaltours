import Link from "next/link";
import { SITE } from "@/lib/site";

type CTASectionProps = {
  title?: string;
  description?: string;
  compact?: boolean;
  /** Optional pre-filled WhatsApp deep link (defaults to SITE.whatsappUrl). */
  whatsappHref?: string;
  /** Email / second-opinion first CTAs for US·UK·CA·AU pages. */
  audience?: "default" | "western";
};

export function CTASection({
  title = "Ready to plan your treatment in India?",
  description = "Share your reports and we’ll help you compare hospital options, clarify costs, and organize visa, travel, and recovery support — usually within 24–48 hours.",
  compact = false,
  whatsappHref,
  audience = "default",
}: CTASectionProps) {
  const waHref = whatsappHref ?? SITE.whatsappUrl;
  const western = audience === "western";

  return (
    <section
      className={`relative overflow-hidden rounded-[var(--radius)] bg-navy text-white ${
        compact ? "px-6 py-8" : "px-6 py-11 sm:px-10 sm:py-14"
      }`}
      aria-label="Contact call to action"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-12 h-48 w-48 rounded-full bg-white/5 blur-2xl"
        aria-hidden
      />
      <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="max-w-xl text-left">
          <p className="text-sm font-semibold text-accent-light/90">We’re here to help</p>
          <h2
            className={`mt-2 font-display font-medium tracking-tight text-white ${
              compact ? "text-xl" : "text-2xl sm:text-3xl"
            }`}
          >
            {title}
          </h2>
          <p className={`mt-3 text-white/72 ${compact ? "text-sm" : "text-base leading-relaxed"}`}>
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:justify-end">
          {western ? (
            <>
              <Link href="/free-second-opinion" className="btn btn-light w-full sm:w-auto">
                Free second opinion
              </Link>
              <Link href="/cost-calculator" className="btn btn-secondary w-full sm:w-auto">
                Compare costs
              </Link>
              <a
                href={`mailto:${SITE.email}`}
                className="btn btn-outline-light w-full sm:w-auto"
              >
                Email us
              </a>
            </>
          ) : (
            <>
              <Link href="/get-free-quote" className="btn btn-light w-full sm:w-auto">
                Get free quote
              </Link>
              <Link href="/contact-us#enquiry-form" className="btn btn-secondary w-full sm:w-auto">
                Contact us
              </Link>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light w-full sm:w-auto"
              >
                WhatsApp us
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
