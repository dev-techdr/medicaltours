"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5 lg:px-8">
        <Link href="/" className="min-w-0 shrink">
          <Image
            src={SITE.logo}
            alt={SITE.name}
            width={200}
            height={40}
            className="h-8 w-auto max-w-[148px] object-contain object-left sm:h-9 sm:max-w-[180px] md:h-10 md:max-w-none"
            style={{ width: "auto" }}
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink transition-[background-color,color] duration-150 hover:bg-accent-light hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher className="hidden sm:block" />
          <a
            href={`tel:${SITE.phone}`}
            className="btn btn-outline hidden !px-4 !py-2 sm:inline-flex"
          >
            Call
          </a>
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary !hidden !px-4 !py-2 text-sm lg:!inline-flex"
            aria-label="Chat on WhatsApp"
          >
            WhatsApp
          </a>
          <LanguageSwitcher className="sm:hidden" />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-line p-2 text-navy lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="max-h-[min(70vh,28rem)] overflow-y-auto border-t border-line bg-white px-4 py-3 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-0.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-accent-light"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="sm:hidden">
              <div className="px-1 py-1.5">
                <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-wide text-muted">
                  Language
                </p>
                <LanguageSwitcher fullWidth />
              </div>
            </li>
            <li>
              <Link
                href="/contact-us#enquiry-form"
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-accent hover:bg-accent-light"
                onClick={() => setOpen(false)}
              >
                Get cost estimate
              </Link>
            </li>
            <li>
              <a
                href={`tel:${SITE.phone}`}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-accent hover:bg-accent-light"
              >
                Call {SITE.phoneDisplay}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
