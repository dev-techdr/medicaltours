"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";

const WhatsAppIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/** Sticky CTAs — cost estimate form + WhatsApp on every main-site page. */
export function FloatingContact() {
  const pathname = usePathname();
  const onContactForm = pathname.startsWith("/contact-us");

  const message = encodeURIComponent(
    "Hello, I am interested in medical treatment in India. Please help me with options and a cost estimate."
  );
  const whatsappHref = `${SITE.whatsappUrl}?text=${message}`;
  const estimateHref = onContactForm ? "#enquiry-form" : "/contact-us#enquiry-form";

  return (
    <div
      className="pointer-events-none fixed z-40 flex flex-col items-end gap-2.5"
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      <Link
        href={estimateHref}
        className="pointer-events-auto inline-flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(26,122,114,0.28)] transition hover:bg-accent/90 sm:gap-3 sm:px-5 sm:py-3"
        aria-label="Get a free cost estimate"
      >
        <span className="sm:hidden">Get cost</span>
        <span className="hidden sm:inline">Get cost estimate</span>
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 sm:h-7 sm:w-7"
          aria-hidden
        >
          <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 7h6m-6 4h6m-7 8h8a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </span>
      </Link>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto pulse-ring inline-flex items-center gap-3 rounded-full bg-[#25D366] text-white shadow-[0_16px_32px_rgba(37,211,102,0.28)] transition hover:bg-[#1ebe57]"
        aria-label="Chat on WhatsApp"
      >
        <span className="hidden pl-5 text-sm font-semibold sm:inline">Chat on WhatsApp</span>
        <span className="flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14">
          <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        </span>
      </a>
    </div>
  );
}
